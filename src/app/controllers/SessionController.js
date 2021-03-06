/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Controller that allows the creation of valid conections
 * (sessions) with database.
 */

// Import of the dependencies used in this controller
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

// Import models used in this controller
import Admin from '../models/Admin';
import authConfig from '../../config/auth';

class SessionController {
  // Create an Admin Session
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });
    // Validate the data informed to this action
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Session failed! Please enter your email and/or your password.'
      });
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
