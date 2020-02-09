/**
 * @description: Controller that allows the CRUD (Creation, Read, Update and
 *  Delete) of Deliveries records in the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import File from '../models/File';

class DeliveryController {
  // Register a Delivery onde the database
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      signature_id: Yup.number(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Delivery was not created! Check if PRODUCT, RECIPIENT and COURIER information was entered.'
      });
    }

    const delivery = await Delivery.create(req.body);

    return res.json(delivery);
  }

  // List 1 or all deliveries according to the parameters informed.
  async index(req, res) {
    const { id } = req.body;
    if (id) {
      const deliveryOne = await Delivery.findByPk(id);
      if (!deliveryOne) {
        return res.json({ message: 'This delivery does not exist!' });
      }

      return res.json(deliveryOne);
    }

    const deliveryAll = await Delivery.findAll();
    return res.json(deliveryAll);
  }

  // Delete a Delivery from the database
  async delete(req, res) {
    const { id } = req.body;
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(401).json({ error: 'This delivery does not exist!' });
    }

    await delivery.destroy();
    return res.json({ message: `Delivery Nº ${delivery.id} was deleted!` });
  }

  // Update a delivery and all this dependencies on the database
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      product: Yup.string(),
      recipient_id: Yup.number(),
      courier_id: Yup.number(),
      signature_id: Yup.number(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Delivery was not updated! Check the information provided.'
      });
    }

    const { id, recipient_id, courier_id, signature_id } = req.body;

    // Verify existence of the delivery to update
    const deliveryExist = await Delivery.findByPk(id);

    if (!deliveryExist) {
      return res.status(401).json({ erro: 'This delivery does not exists!' });
    }

    // Verify existence of the recipient to be updated in the delivery
    if (recipient_id) {
      const recipientExist = await Recipient.findByPk(recipient_id);

      if (!recipientExist) {
        return res.status(401).json({
          erro:
            'This Recipient is not registered to be inserted in the delivery!'
        });
      }
    }

    // Verify existence of the courier to be updated in the delivery
    if (courier_id) {
      const courierExist = await Courier.findByPk(courier_id);

      if (!courierExist) {
        return res.status(401).json({
          erro: 'This Courier is not registered to be inserted in the delivery!'
        });
      }
    }

    // Verify existence of the signature to be updated in the delivery
    if (signature_id) {
      const signatureExist = await File.findByPk(signature_id);

      if (!signatureExist) {
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
    await Delivery.update(req.body);
    return res.json({ message: `The delivery nº ${id} was updated` });
  }
}

export default new DeliveryController();