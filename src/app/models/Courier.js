/**
 * @description: Model file of Courier entity.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import Sequelize, { Model } from 'sequelize';

class Courier extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this; // Return the model that has just been initialized.
  }

  // Associate the table Courier with table File (sequelize)
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Courier;
