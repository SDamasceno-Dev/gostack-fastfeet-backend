/**
 * @description: Model file of Delivery_Problem entity.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this; // Return the model that has just been initialized.
  }

  static associate(models) {
    this.belongsTo(models.Delivery, {
      foreignKey: 'delivery_id',
      as: 'delivery'
    });
  }
}

export default DeliveryProblem;
