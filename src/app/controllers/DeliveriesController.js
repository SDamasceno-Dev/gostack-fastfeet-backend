import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveriesListController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1, delivered } = req.query;

    const deliveryActive = await Delivery.findAll({
      where: {
        courier_id: id,
        end_date: {
          [Op[delivered === 'true' ? 'ne' : 'eq']]: null
        }
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      order: [['id', 'ASC']],
      limit: 20,
      offset: (page - 1) * 20,
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
