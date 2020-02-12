/**
 * @description: Controller of the Delivery Problem.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  /**
   * Register a delivery Problem
   */
  async store(req, res) {
    const { courier_id } = req.body;
    const delivery_id = req.params;

    const schema = Yup.object().shape({
      description: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'To inform a problem, you must enter the description.'
      });
    }

    // Verify delivery existence
    const delivery = Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(401).json({
        error:
          'This delivery does not exists. Please, select a valid delivery to inform the problem!'
      });
    }

    // Check whether the delivery belongs to the courier.
    if (!(courier_id === delivery.courier_id)) {
      return res.status(401).json({
        error: `You don't have authorization to update this delivery.`
      });
    }

    const deliveryProblem = await Delivery.create(req.body);

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new DeliveryProblemController();
