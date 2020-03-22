/**
 * @description: Controller that allows the CRUD of Admin records
 * in the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup'; // Schema validator
import Admin from '../models/Admin';

class AdminController {
  /**
   * Create a Admin record
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Admin does not created!' });
    }

    // Check for an administrator login with this email.
    const adminExists = await Admin.findOne({
      where: { email: req.body.email }
    });

    if (adminExists) {
      return res
        .status(400)
        .json({ error: 'This email already exists in database.' });
    }
    const { id, name, email } = await Admin.create(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  /**
   * List all Admin profiles
   */
  async index(req, res) {
    const { page = 1 } = req.query;
    const admin = await Admin.findAll({
      limit: 7,
      offset: (page - 1) * 7,
      order: [['id', 'DESC']]
    });
    return res.json(admin);
  }

  /**
   * Update Admin profile.
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Password does not match!' });
    }

    const { email, oldPassword } = req.body;
    const admin = await Admin.findByPk(req.adminId);

    // Verify another admin with this email
    if (email && email !== admin.email) {
      const adminExists = await Admin.findOne({
        where: { email }
      });

      if (adminExists) {
        return res
          .status(400)
          .json({ error: 'This email already exists in database.' });
      }
    }

    if (oldPassword && !(await admin.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old Password is incorrect!' });
    }

    const { id, name } = await admin.update(req.body);

    return res.json({
      id,
      name,
      email
    });
  }
}

export default new AdminController();
