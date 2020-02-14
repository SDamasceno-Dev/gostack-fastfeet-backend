/**
 * @description: Controller of the end of Delivery to the Recipient.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import { isBefore, parseISO } from 'date-fns';

import File from '../models/File';
import Delivery from '../models/Delivery';

class DeliveryEndController {
  async update(req, res) {
    const { id, end_date, courier_id } = req.body;
    const { originalname: name, filename: path } = req.file;
    const delivery = await Delivery.findByPk(id);

    // Verify Courier
    if (!(delivery.courier_id === Number(courier_id))) {
      return res
        .status(401)
        .json({ error: `You're not alowed to finish this delivery!` });
    }

    // Verify Delivery ended
    if (!(delivery.end_date === null)) {
      return res.status(401).json({ error: 'This delivery already finished!' });
    }

    // Send signature imagem to server
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
