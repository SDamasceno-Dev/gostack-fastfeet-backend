/**
 * @description: Postgres Database configuration with access credentials.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

module.exports = {
  dialect: 'postgres',
  username: 'postgres',
  password: 'sddb28',
  database: 'fastfeet',
  host: 'localhost',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
