/**
 * @description: Controller that allows the CRUD (Creation, Read, Update and
 *  Delete) of Couriers records in the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';
import Courier from '../models/Courier';

class CourierController {
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

    const courierExists = await Courier.findOne({
      where: { email: req.body.email }
    });
    if (courierExists) {
      return res.status(400).json({ erro: 'Courier email already exists!' });
    }

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

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
}

export default new CourierController();
