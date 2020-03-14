/**
 * @description: Controller that allows the CRUD (Creation, Read, Update and
 *  Delete) of Couriers records in the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';
import { Op } from 'sequelize';

import Courier from '../models/Courier';
import File from '../models/File';
import Delivery from '../models/Delivery';

class CourierController {
  /**
   * Record a Courier (Store)
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Courier was not created! Check the information entered.'
      });
    }

    // Check if courier already exists.
    const courierExists = await Courier.findOne({
      where: { email: req.body.email }
    });
    if (courierExists) {
      return res.status(400).json({ erro: 'Courier email already exists!' });
    }

    // Confirms if the avatar file is on the server and the id is correct.
    const avatar = await File.findByPk(req.body.avatar_id);
    if (avatar === null) {
      return res
        .status(401)
        .json({ error: 'Please, upload your avatar first!' });
    }

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

  /**
   * Update a Courier (Update)
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Courier not updated! Check the information provided.'
      });
    }

    const { id, email } = req.body;
    const courier = await Courier.findByPk(id);

    // Verify if courier exists
    if (courier === null) {
      return res.status(401).json({ error: 'This courier does not exists!' });
    }

    // Verify if already exists a courier with this email registered.
    if (email && email !== courier.email) {
      const courierExists = await Courier.findOne({ where: { email } });

      if (courierExists) {
        return res
          .status(400)
          .json({ erro: 'This email is already registered!' });
      }
    }

    /**
     * As the middleware is on the route defined before the update method,
     * have the guarantee that it is an authenticated user and necessarily
     * an Admin.
     */
    const { name } = await courier.update(req.body);
    return res.json({
      name,
      email
    });
  }

  /**
   * List all Recipients (Index)
   */
  async index(req, res) {
    const { page = 1 } = req.query;
    const { q = null } = req.query;

    if (q !== null) {
      const courierListQuery = await Courier.findAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`
          }
        }
      });
      return res.json(courierListQuery);
    }

    const courier = await Courier.findAll({
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(courier);
  }

  /**
   * Delete a Courier (Delete)
   */
  async delete(req, res) {
    const { id } = req.body;
    const courier = await Courier.findByPk(id);
    const file = await File.findByPk(courier.avatar_id);
    const delivery = await Delivery.findOne({
      where: {
        courier_id: courier.id
      }
    });

    // Check if courier exists
    if (!courier) {
      return res.status(401).json({ error: 'This courier does not exists!' });
    }

    // Check if courier has delivery assigned
    if (delivery) {
      return res.status(400).json({
        error: 'This courier has an assigned delivery, then cannot be deleted.'
      });
    }

    await courier.destroy();
    await file.destroy();
    return res.json({ message: `${courier.name} was deleted!` });
  }
}

export default new CourierController();
