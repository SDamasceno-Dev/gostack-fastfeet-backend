/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Delivery problems controller
 */

// Import of the dependencies used in this controller
import * as Yup from 'yup';

// Import models used in this controller
import Delivery from '../models/Delivery';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';
import DeliveryProblem from '../models/DeliveryProblem';

// Import dependencies for sending email
import CanceledMail from '../jobs/CanceledMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  // Distributor List all Deliveries with a Problem
  async show(req, res) {
    const { page = 1 } = req.query;
    const response = await DeliveryProblem.findAndCountAll({
      // Config search
      where: {},
      order: [['id', 'DESC']],
      limit: 7,
      offset: (page - 1) * 7
    });
    return res.json({
      deliveriesProbList: response.rows,
      deliveriesProbCount: response.count
    });
  }

  // Distributor list all Problems of a Delivery
  async index(req, res) {
    const { page = 1 } = req.query;
    const delivery_id = req.params.deliveryid;

    const response = await DeliveryProblem.findAndCountAll({
      // Config search
      where: {
        delivery_id
      },
      order: [['id', 'DESC']],
      limit: 7,
      offset: (page - 1) * 7,
      attributes: ['id', 'description', 'created_at'],
      // Include Delivery data in the search result
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'start_date'],
          // Include Courier data in the search result
          include: [
            {
              model: Courier,
              as: 'courier',
              attributes: ['name', 'email']
            },
            // Include Recipient data in the search result
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
    return res.json({
      deliveryProblemsList: response.rows,
      deliveryProblemsCount: response.count
    });
  }

  // Register a delivery Problem
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required()
    });
    // Validate the data informed to this action
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'To inform a problem, you must enter the description.'
      });
    }
    const { courier_id, description } = req.body;
    const delivery_id = req.params.deliveryid;

    // Verify delivery existence
    const delivery = await Delivery.findByPk(delivery_id);
    if (delivery === null) {
      return res.status(401).json({
        error:
          'This delivery does not exists. Please, select a valid delivery to inform the problem!'
      });
    }

    // Verify if delivery already done
    if (!(delivery.end_date === null)) {
      return res.status(400).json({
        error: `This delivery already done. It's not possible to inform a problem!`
      });
    }

    // Check whether the delivery belongs to the Courier
    if (!(courier_id === String(delivery.courier_id))) {
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

  // Cancellation of delivery due to problem
  async delete(req, res) {
    const id = req.params.deliveryproblemid;
    const canceled_at = new Date();
    const deliveryproblem = await DeliveryProblem.findOne({
      // Config search
      where: {
        id
      },
      attributes: ['id', 'description'],
      // Include Delivery data in the search result
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'start_date',
            'courier_id',
            'recipient_id',
            'end_date',
            'canceled_at'
          ]
        }
      ]
    });

    // Check if the deliveryproblem exists
    if (deliveryproblem === null) {
      return res.status(401).json({
        error: 'This problem does not exists. Please check and search again!'
      });
    }

    // Check if delivery was already ended
    if (!(deliveryproblem.delivery.end_date === null)) {
      return res
        .status(401)
        .json({ error: 'This delivery has already ended.' });
    }

    // Check if delivery was already canceled
    if (!(deliveryproblem.delivery.canceled_at === null)) {
      return res
        .status(401)
        .json({ error: 'This delivery has already canceled.' });
    }

    // Inform by email the cancel delivery due to problems.
    await deliveryproblem.delivery.update({ canceled_at });

    const delivery = await Delivery.findByPk(deliveryproblem.delivery.id);
    const courier = await Courier.findByPk(deliveryproblem.delivery.courier_id);
    const recipient = await Recipient.findByPk(
      deliveryproblem.delivery.recipient_id
    );

    await Queue.add(CanceledMail.key, {
      courier,
      delivery,
      recipient,
      deliveryproblem
    });

    return res.json({ message: 'This delivery was canceled due a problem!' });
  }
}

export default new DeliveryProblemController();
