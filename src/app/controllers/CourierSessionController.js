/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Controller that allows the creation of valid Courier sessions
 * with database.
 */

// Import of the dependencies used in this controller
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Courier from '../models/Courier';

// Import models used in this controller
import File from '../models/File';
import authConfig from '../../config/auth';

// Create an Courier Session
class CourierSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required()
    });
    // Validate the data informed to this action
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Session failed! Please enter your register ID.'
      });
    }

    const { id } = req.body;
    const courier = await Courier.findOne({
      // Config search
      where: { id },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url']
        }
      ]
    });
    // Check if Courier is in DB
    if (!courier) {
      return res.status(401).json({ error: 'Courier not found in database!' });
    }
    // Return the Courier authenticated
    const { name, email, avatar, created_at } = courier;
    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      }),
      avatar,
      created_at
    });
  }
}

export default new CourierSessionController();
