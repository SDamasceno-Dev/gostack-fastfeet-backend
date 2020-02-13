/**
 * @description: Controller of the Delivery Problem.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';
import DeliveryProblem from '../models/DeliveryProblem';

import CanceledMail from '../jobs/CanceledMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  /**
   * Distributor List all Deliveries with a Problem
   */
  async show(req, res) {
    const deliveriesProblems = await Delivery.findAll({
      where: {
        signature_id: null
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: DeliveryProblem,
          as: 'deliveryproblem',
          required: true,
          attributes: []
        }
      ]
    });
    return res.json(deliveriesProblems);
  }

  /**
   * Distributor list all Problems of a Delivery.
   */
  async index(req, res) {
    const delivery_id = req.params.deliveryid;
    const delivery = await DeliveryProblem.findAll({
      where: {
        delivery_id
      },
      attributes: ['description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'start_date'],
          include: [
            {
              model: Courier,
              as: 'courier',
              attributes: ['name', 'email']
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'name',
                'street',
                'number',
                'city',
                'state',
                'zipcode'
              ]
            }
          ]
        }
      ]
    });
    return res.json({ delivery });
  }

  /**
   * Register a delivery Problem
   */
  async store(req, res) {
    const { courier_id, description } = req.body;
    const delivery_id = req.params.deliveryid;

    const schema = Yup.object().shape({
      description: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'To inform a problem, you must enter the description.'
      });
    }

    // Verify delivery existence
    const delivery = await Delivery.findByPk(delivery_id);
    if (delivery === null) {
      return res.status(401).json({
        error:
          'This delivery does not exists. Please, select a valid delivery to inform the problem!'
      });
    }

    // Verify if delivery already done.
    if (!(delivery.end_date === null)) {
      return res.status(400).json({
        error: `This delivery already done. It's not possible to inform a problem!`
      });
    }

    // Check whether the delivery belongs to the courier.
    if (!(courier_id === delivery.courier_id)) {
      return res.status(401).json({
        error: `You don't have authorization to update this delivery. Please verify if you informed your id.`
      });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description
    });
    return res.json(deliveryProblem);
  }

  /**
   * Cancellation of delivery due to problem.
   */
  async delete(req, res) {
    const id = req.params.deliveryproblemid;
    const { recipient_id, courier_id, delivery_id, canceled_at } = req.body;
    const courier = await Courier.findByPk(courier_id);
    const recipient = await Recipient.findByPk(recipient_id);
    const delivery = await Delivery.findByPk(delivery_id);
    const deliveryproblem = await DeliveryProblem.findByPk(id);

    // Check if the delivery exists
    if (delivery === null) {
      return res.status(401).json({
        error: 'This delivery does not exists. Please check and search again!'
      });
    }

    // Check if the deliveryproblem exists
    if (deliveryproblem === null) {
      return res.status(401).json({
        error: 'This problem does not exists. Please check and search again!'
      });
    }

    // Checks whether the reported problem belongs to the delivery.
    if (!(delivery_id === deliveryproblem.delivery_id)) {
      return res.status(401).json({
        error: 'The selected problem does not belong to this delivery.'
      });
    }

    // Check if delivery was already ended
    if (!((delivery.end_date || delivery.signature_id) === null)) {
      return res
        .status(401)
        .json({ error: 'This delivery has already ended.' });
    }

    // Check if delivery was already canceled
    if (!(delivery.canceled_at === null)) {
      return res
        .status(401)
        .json({ error: 'This delivery has already canceled.' });
    }

    // Checks if the delivery has the registered cancellation problem.
    if (deliveryproblem.description === null) {
      return res.status(401).json({
        error:
          'This delivery theres no problem registered. Please, inform before cancel it.'
      });
    }

    // Cancel delivery due to problems.
    await delivery.update({ canceled_at });

    await Queue.add(CanceledMail.key, {
      courier,
      delivery,
      recipient,
      deliveryproblem
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
