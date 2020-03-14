/**
 * @description: Controller that allows the creation, update of Recipients
 *  records in the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipController {
  /**
   * Store a Recipient
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .required()
        .max(2),
      zipcode: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Recipient does not created! Check the information and try again.'
      });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  /**
   * List all Recipients (Index)
   */
  async index(req, res) {
    // Query params search
    const { page = 1 } = req.query;
    const { q = null } = req.query;

    if (q !== null) {
      const deliveryListQuery = await Recipient.findAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`
          }
        }
      });
      return res.json(deliveryListQuery);
    }

    const recipients = await Recipient.findAll({
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(recipients);
  }

  /**
   * Update a Recipient
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string().max(2),
      zipcode: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Recipient not updated! Check the information provided.'
      });
    }

    /**
     * As the middleware is on the route defined before the update method,
     * have the guarantee that it is an authenticated user and necessarily
     * an Admin.
     */
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

  /**
   * Delete a Recipient
   */
  async delete(req, res) {
    const { id } = req.body;
    const recipient = await Recipient.findByPk(id);

    // Verify if recipient exists.
    if (!recipient) {
      return res.status(401).json({ error: 'This recipient does not exists!' });
    }

    await recipient.destroy();
    return res.json({ message: `${recipient.name} was deleted!` });
  }
}

export default new RecipController();
