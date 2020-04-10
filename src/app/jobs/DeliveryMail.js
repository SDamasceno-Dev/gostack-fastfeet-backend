/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Background work for sending new delivery record email
 */

// Import of the Lib used in this in this job
import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { courier, delivery, recipient } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Nova entrega cadastrada!', // Subject email
      template: 'deliveryNotification', // Template used in this email
      // Email's body with all data of cancellation
      context: {
        courierName: courier.name,
        deliveryProduct: delivery.product,
        recipientName: recipient.name,
        recipientAddress: `${recipient.street}, ${recipient.number} ${recipient.complement}`,
        recipientCity: recipient.city,
        recipientState: recipient.state,
        recipientZip: recipient.zipcode
      }
    });
  }
}

export default new DeliveryMail();
