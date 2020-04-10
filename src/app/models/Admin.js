/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Model file of Admin entity
 */

// Import of the dependencies used in this Model
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    // Code snippets that are executed automatically based on actions that
    // occur in the model
    this.addHook('beforeSave', async admin => {
      if (admin.password) {
        admin.password_hash = await bcrypt.hash(admin.password, 8);
      }
    });
    return this; // Return the model that has just been initialized.
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Admin;
