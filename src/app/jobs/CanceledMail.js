/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Background work for sending delivery cancellation emails
 */

// Import of the Lib used in this in this job
import Mail from '../../lib/Mail';

class CanceledMail {
  get key() {
    return 'CanceledMail';
  }

  async handle({ data }) {
    const { courier, delivery, recipient, deliveryproblem } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Entrega cancelada!', // Subject email
      template: 'canceledNotification', // Template used in this email
      // Email's body with all data of cancellation
      context: {
        courierName: courier.name,
        deliveryProduct: delivery.product,
        recipientName: recipient.name,
        recipientAddress: `${recipient.street}, ${recipient.number} ${recipient.complement}`,
        recipientCity: recipient.city,
        recipientState: recipient.state,
        recipientZip: recipient.zipcode,
        deliveryProblemDescription: deliveryproblem.description
      }
    });
  }
}

export default new CanceledMail();
