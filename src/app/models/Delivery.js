/**
 * @description: Model file of a Delivery entity.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        withdrawal: Sequelize.VIRTUAL,
        delivered: Sequelize.VIRTUAL,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.canceled_at) return 'CANCELADA';
            if (this.end_date) return 'ENTREGUE';
            if (this.start_date) return 'RETIRADA';
            return 'PENDENTE';
          }
        }
      },
      {
        sequelize
      }
    );
    return this; // Return the model that has just been initialized.
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient'
    });
    this.belongsTo(models.Courier, {
      foreignKey: 'courier_id',
      as: 'courier'
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature'
    });
    this.hasMany(models.DeliveryProblem, {
      foreignKey: 'delivery_id',
      as: 'deliveryproblem'
    });
  }
}

export default Delivery;
