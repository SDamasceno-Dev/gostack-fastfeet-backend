/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Controller that lists all deliveries based on parameters passed
 */

// Import of the dependencies used in this controller
import { Op } from 'sequelize';

// Import models used in this controller
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveriesListController {
  async index(req, res) {
    const { page = 1, delivered } = req.query;
    const { id } = req.params;

    const deliveryActive = await Delivery.findAll({
      // Config search
      limit: 7,
      offset: (page - 1) * 7,
      order: [['id', 'DESC']],
      where: {
        courier_id: id,
        end_date: {
          // Based on params, list a different results.
          [Op[delivered === 'true' ? 'ne' : 'eq']]: null
        },
        canceled_at: {
          [Op.eq]: null
        }
      },
      attributes: ['id', 'product', 'created_at', 'start_date', 'end_date'],
      // Include recipient data in the search result
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
