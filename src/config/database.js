module.exports = {
  username: 'postgres',
  password: 'sddb28',
  database: 'fastfeet',
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    useUTC: false // for reading from database
  },
  timezone: '-03:00', // for writing to database
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
