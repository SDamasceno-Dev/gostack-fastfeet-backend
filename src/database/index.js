/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: File that loads all models of the App and realize all
 * associations between tables.
 */

// Import of the dependencies used in this database configuration
import Sequelize from 'sequelize';

// Import of the models used
import Admin from '../app/models/Admin';
import Recipient from '../app/models/Recipient';
import Courier from '../app/models/Courier';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';
import DeliveryProblem from '../app/models/DeliveryProblem';

// Import the DB Config
import databaseConfig from '../config/database';

const models = [Admin, Recipient, Courier, File, Delivery, DeliveryProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
