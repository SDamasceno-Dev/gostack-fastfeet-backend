module.exports = {
  username: 'postgres',
  password: 'sddb28',
  database: 'fastfeet',
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    useUTC: false // For reading from database
  },
  timezone: '-03:00', // For writing to database
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
