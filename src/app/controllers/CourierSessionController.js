/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Controller that allows the creation of valid sessions with
 * database.
 */

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Courier from '../models/Courier';
import File from '../models/File';
import authConfig from '../../config/auth';

class CourierSessionController {
  /**
   * Create an Admin Session
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Session failed! Please enter your register ID.'
      });
    }

    const { id } = req.body;
    const courier = await Courier.findOne({
      where: { id },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url']
        }
      ]
    });
    // Check if email is in database
    if (!courier) {
      return res.status(401).json({ error: 'Courier not found in database!' });
    }
    // Return the admin authenticated
    const { name, email, avatar } = courier;
    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      }),
      avatar
    });
  }
}

export default new CourierSessionController();
