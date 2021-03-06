/**
 * @description: Controller that allows the creation, update of Recipients
 *  records in the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

// Import of the dependencies used in this controller
import * as Yup from 'yup';
import { Op } from 'sequelize';

// Import models used in this controller
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

class RecipController {
  // Store a Recipient
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().required()
    });
    // Validate the data informed to this action
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Recipient does not created! Check the information and try again.'
      });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  // List all Recipients (Index)
  async index(req, res) {
    // Query params search
    const { page = 1 } = req.query;
    const { q = null } = req.query;

    const response = await Recipient.findAndCountAll({
      // Config search
      limit: 7,
      offset: (page - 1) * 7,
      order: [['id', 'DESC']],
      where: {
        name: {
          [Op.iLike]: `%${q || ''}%`
        }
      }
    });
    return res.json({
      recipientList: response.rows,
      recipientCount: response.count
    });
  }

  // Update a Recipient
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipcode: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Recipient not updated! Check the information provided.'
      });
    }

    // Since the middleware is on the route defined before the update method,
    // it is guaranteed to be an authenticated user and necessarily an
    // administrator.
    const { id } = req.body;
    const recipient = await Recipient.findByPk(id);
    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      zipcode
    } = await recipient.update(req.body);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zipcode
    });
  }

  // Delete a Recipient
  async delete(req, res) {
    const { idItem } = req.query;
    const recipient = await Recipient.findByPk(idItem);

    // Verify if recipient exists.
    if (!recipient) {
      return res.status(401).json({ error: 'This recipient does not exists!' });
    }

    if (
      await Delivery.findOne({
        where: {
          recipient_id: {
            [Op.eq]: idItem
          }
        }
      })
    ) {
      return res.status(400).json({
        error: `Existe uma entrega associada a este registro. Primeiro retire todas as entregas associadas para poder deletar este registro.`
      });
    }

    await recipient.destroy();
    return res.json({ message: `${recipient.name} was deleted!` });
  }
}

export default new RecipController();
