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

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

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
    const recipient = await Recip.findByPk(id);
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
}

export default new CourierController();
