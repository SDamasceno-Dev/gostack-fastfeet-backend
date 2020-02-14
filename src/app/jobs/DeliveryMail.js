/**
 * @description: Background job for new registered delivery.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { courier, delivery, recipient } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Nova entrega cadastrada!',
      template: 'deliveryNotification',
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
