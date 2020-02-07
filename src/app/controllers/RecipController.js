import * as Yup from 'yup';
import Recip from '../models/Recipient';
import Admin from '../models/Admin';

class RecipController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .required()
        .max(2),
      zipcode: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Recipient does not created!' });
    }

    const recipient = await Recip.create(req.body);

    return res.json(recipient);
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

    // Checks whether the logged in user is Admin
    const admin = await Admin.findByPk(req.adminId);
    if (!admin) {
      return res.json({
        message: 'You must be an Admin to update a Recipient data!'
      });
    }

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

export default new RecipController();
