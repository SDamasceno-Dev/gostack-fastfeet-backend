/**
 * @description: Controller that allows the creation of valid conections
 * (sessions) with database.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Admin from '../models/Admin';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Session failed!' });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    // Check if email is in database
    if (!admin) {
      return res.status(401).json({ error: 'User not found in database!' });
    }
    // Check if password is correct
    if (!(await admin.checkPassword(password))) {
      return res.status(401).json({ error: 'The password is incorrect!' });
    }
    // Return the admin authenticated
    const { id, name } = admin;
    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
