/**
 * @description: Controller that allows CRUD (Creation, Read, Update and
 * Delete) of the records of the DELIVERY entity in the database.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import File from '../models/File';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  /**
   * Register a Delivery on the database
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Delivery was not created! Check if PRODUCT, RECIPIENT and COURIER information was entered.'
      });
    }

    const { recipient_id, courier_id } = req.body;
    const courier = await Courier.findByPk(courier_id);
    const recipient = await Recipient.findByPk(recipient_id);

    // Verify existence of the recipient to be registered in the delivery
    if (recipient_id) {
      if (!recipient) {
        return res.status(401).json({
          erro:
            'This Recipient is not registered to be inserted in the delivery!'
        });
      }
    }

    // Verify existence of the courier to be updated in the delivery
    if (courier_id) {
      if (!courier) {
        return res.status(401).json({
          erro: 'This Courier is not registered to be inserted in the delivery!'
        });
      }
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(DeliveryMail.key, {
      courier,
      delivery,
      recipient
    });

    return res.json(delivery);
  }

  /**
   * List deliveries according to the parameters informed.
   */
  async index(req, res) {
    // Query params search
    const { page = 1 } = req.query;
    const { q = null } = req.query;

    // Request body params
    const { id } = req.body;

    // Search a specific delivery
    if (id) {
      const deliveryOne = await Delivery.findByPk(id);
      if (!deliveryOne) {
        return res.json({ message: 'This delivery does not exist!' });
      }

      return res.json(deliveryOne);
    }

    // Search with query parameter defined
    const deliveryList = await Delivery.findAll({
      where: {
        product: {
          [Op.iLike]: `%${q || ''}%`
        }
      },
      order: [['id', 'ASC']],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zipcode'
          ]
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url']
        },
        {
          model: Courier,
          as: 'courier',
          attributes: ['name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url']
            }
          ]
        }
      ],
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(deliveryList);
  }

  /**
   * Delete a Delivery from the database
   */
  async delete(req, res) {
    const { idItem } = req.query;
    const delivery = await Delivery.findByPk(idItem);

    if (!delivery) {
      return res.status(401).json({ error: 'This delivery does not exist!' });
    }

    await delivery.destroy();
    return res.json({ message: `Delivery Nº ${delivery.id} was deleted!` });
  }

  /**
   * Update a delivery and all this dependencies on the database
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      product: Yup.string(),
      recipient_id: Yup.number(),
      courier_id: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Delivery was not updated! Check the information provided.'
      });
    }

    const { id, recipient_id, courier_id } = req.body;

    // Verify existence of the delivery to update
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(401).json({ erro: 'This delivery does not exists!' });
    }

    // Verify existence of the recipient to be updated in the delivery
    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);

      if (recipient === null) {
        return res.status(401).json({
          erro:
            'This Recipient is not registered to be inserted in the delivery!'
        });
      }
    }

    // Verify existence of the courier to be updated in the delivery
    if (courier_id) {
      const courier = await Courier.findByPk(courier_id);

      if (courier === null) {
        return res.status(401).json({
          erro: 'This Courier is not registered to be inserted in the delivery!'
        });
      }
    }

    /**
     * As the middleware is on the route defined before the update method,
     * have the guarantee that it is an authenticated user and necessarily
     * an Admin.
     */

    await delivery.update(req.body);

    return res.json({ message: `The delivery nº ${id} was updated` });
  }
}

export default new DeliveryController();
