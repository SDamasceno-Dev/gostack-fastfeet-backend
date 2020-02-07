/**
 * @description: File that connects to the Postgres database and loads all
 * models of the App
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Admin from '../app/models/Admin';
import Recipe from '../app/models/Recipient';
import File from '../app/models/File';

const models = [Admin, Recipe, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
