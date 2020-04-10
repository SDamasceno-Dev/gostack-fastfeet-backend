/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Controller of the end of delivery of the order to the recipient
 */

// Import of the dependencies used in this controller
import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

// Import models used in this controller
import File from '../models/File';
import Delivery from '../models/Delivery';

class DeliveryEndController {
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      end_date: Yup.date().required(),
      courier_id: Yup.number().required()
    });
    // Validate the data informed to this action
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Delivery not ended!' });
    }

    const { id, end_date, courier_id } = req.body;
    const { originalname: name, filename: path } = req.file;
    const delivery = await Delivery.findByPk(id);

    // Verify Courier
    if (!(delivery.courier_id === Number(courier_id))) {
      return res
        .status(401)
        .json({ error: `You're not alowed to finish this delivery!` });
    }

    // Verifies if Delivery already ended
    if (!(delivery.end_date === null)) {
      return res.status(401).json({ error: 'This delivery already finished!' });
    }

    // Send signature image to server
    const { id: signature_id } = await File.create({
      name,
      path
    });

    // Verify if end_date is after start_date
    if (isBefore(parseISO(end_date), delivery.start_date)) {
      return res.status(401).json({
        error:
          'The delivery time is before the pick-up time for delivery. Please check the time provided.'
      });
    }

    // Finish the delivery
    await delivery.update({ end_date, signature_id });

    return res.json('Delivery successful!!!');
  }
}

export default new DeliveryEndController();
