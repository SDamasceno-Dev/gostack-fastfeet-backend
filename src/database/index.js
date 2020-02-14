/**
 * @description: File that loads all models of the App and realize all
 * associations between tables.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Recipient from '../app/models/Recipient';
import Courier from '../app/models/Courier';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';
import DeliveryProblem from '../app/models/DeliveryProblem';

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
