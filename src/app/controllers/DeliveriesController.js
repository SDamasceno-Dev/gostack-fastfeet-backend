import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveriesListController {
  async index(req, res) {
    const { page = 1, delivered } = req.query;
    const { id } = req.params;

    const deliveryActive = await Delivery.findAll({
      where: {
        courier_id: id,
        end_date: {
          // Based on delivered value, list a different results.
          [Op[delivered === 'true' ? 'ne' : 'eq']]: null
        }
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      order: [['id', 'ASC']],
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
      ],
      limit: 20,
      offset: (page - 1) * 20
    });

    return res.json(deliveryActive);
  }
}

export default new DeliveriesListController();
