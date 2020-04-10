/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Controller of the start of Delivery to the Recipient
 */

// Import of the dependencies used in this controller
import * as Yup from 'yup';
import { Op } from 'sequelize';
import { getHours, parseISO, startOfDay, endOfDay } from 'date-fns';

// Import models used in this controller
import Delivery from '../models/Delivery';

class DeliveryStartController {
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      courier_id: Yup.number(),
      withdrawal: Yup.boolean().required(),
      start_date: Yup.date()
    });
    // Validate the data informed to this action
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Delivery was not updated! Check the information provided.'
      });
    }

    const { id, courier_id, withdrawal, start_date } = req.body;
    const delivery = await Delivery.findByPk(id);

    // Check that the courier is responsible for delivery
    if (!(delivery.courier_id === courier_id)) {
      return res
        .status(401)
        .json({ error: 'You are not allowed to execute this delivery!' });
    }

    /** * Record the time of product withdrawal for delivery. ** */

    // Setting the time allowed for picking up orders for delivery.
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

      // Check the limit of 5 deliveries for each courier per day.
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

    await delivery.update(req.body, { start_date });

    return res.json({ message: `The delivery nº ${id} was updated` });
  }
}

export default new DeliveryStartController();
