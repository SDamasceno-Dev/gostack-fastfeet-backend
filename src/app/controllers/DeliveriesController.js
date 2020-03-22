/**
 * @description: Controller that lsit all deliveries with or no params
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveriesListController {
  async index(req, res) {
    const { page = 1, delivered } = req.query;
    const { id } = req.params;

    const deliveryActive = await Delivery.findAll({
      limit: 7,
      offset: (page - 1) * 7,
      order: [['id', 'DESC']],
      where: {
        courier_id: id,
        end_date: {
          // Based on delivered value, list a different results.
          [Op[delivered === 'true' ? 'ne' : 'eq']]: null
        }
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
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
        }
      ]
    });

    return res.json(deliveryActive);
  }
}

export default new DeliveriesListController();
