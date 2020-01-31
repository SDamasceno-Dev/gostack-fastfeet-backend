import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    // Check if email is in database
    if (!user) {
      return res.status(401).json({ error: 'User not found in database!' });
    }
    // Check if password is correct
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'The password is incorrect!' });
    }
    // Return the user authenticated
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
