/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Model file of File entity.
 */

// Import of the dependencies used in this Model
import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // path used locally for file storage
            return `http://localhost:3028/files/${this.path}`;
          }
        }
      },
      {
        sequelize
      }
    );

    return this; // Return the model that has just been initialized.
  }
}

export default File;
