import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'This email already exists in database.' });
    }
    const { id, name, email, administrator } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      administrator
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email }
      });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'This email already exists in database.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old Password is incorrect!' });
    }

    const { id, name, administrator } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      administrator
    });
  }
}

export default new UserController();
