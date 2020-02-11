/**
 * @description: Controller that controls the status of Deliveries records in
 * the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';
import { Op } from 'sequelize';
import { getHours, parseISO, startOfDay, endOfDay } from 'date-fns';

import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryStatusController {
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      product: Yup.string(),
      recipient_id: Yup.number(),
      courier_id: Yup.number(),
      signature_id: Yup.number(),
      canceled_at: Yup.date(),
      withdrawal: Yup.boolean(),
      withdrawalTime: Yup.string(),
      start_date: Yup.date(),
      delivered: Yup.boolean(),
      end_date: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Delivery was not updated! Check the information provided.'
      });
    }

    const {
      id,
      courier_id,
      signature_id,
      withdrawal,
      start_date,
      end_date
    } = req.body;
    const delivery = await Delivery.findByPk(id);

    // Record the time of product withdrawal for delivery.

    /**
     * Setting the time allowed for picking up orders for delivery.
     */
    const parsedStart_Date = parseISO(start_date);
    if (withdrawal === true) {
      if (
        !(getHours(parsedStart_Date) >= 8 && getHours(parsedStart_Date) < 18)
      ) {
        return res.status(401).json({
          error:
            'It is not allowed to withdraw the product for delivery at that time!'
        });
      }

      /**
       * Check the limit of 5 deliveries for each courier per day.
       */
      const withdrawalCount = await Delivery.findAndCountAll({
        where: {
          courier_id,
          canceled_at: null,
          start_date: {
            [Op.between]: [
              startOfDay(parsedStart_Date),
              endOfDay(parsedStart_Date)
            ]
          }
        }
      });
      if (withdrawalCount.count >= 5) {
        return res.status(401).json({
          error: `The courier ${courier_id} already reached the limit of 05 deliveries today.`
        });
      }
    }

    // Verify existence of the signature to be updated in the delivery
    if (signature_id) {
      const signatureExist = await File.findByPk(signature_id);

      if (signatureExist === null) {
        return res.status(401).json({
          erro:
            'This Signature was not captured. Please verify your information and try again!'
        });
      }
    }

    /**
     * As the middleware is on the route defined before the update method,
     * have the guarantee that it is an authenticated user and necessarily
     * an Admin.
     */

    await delivery.update(req.body, { start_date, end_date });

    return res.json({ message: `The delivery nº ${id} was updated` });
  }
}

export default new DeliveryStatusController();
