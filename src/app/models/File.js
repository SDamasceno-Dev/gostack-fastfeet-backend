/**
 * @description: Model file of Admin entity
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    /**
     * Code snippets that are executed automatically based on actions that
     * occur in the model
     */

    return this;
  }
}

export default File;
