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
}

export default new UserController();
