module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('couriers', {
      // Id Courier.
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // NAME Courier.
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // EMAIL Courier
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      // AVATAR Courier.
      avatar_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      // Records the creation time
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      // Records the update time
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('couriers');
  }
};
