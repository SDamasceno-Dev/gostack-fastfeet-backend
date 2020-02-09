module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveries', {
      // FILE Id
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // RECIPIENT Id
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        references: { model: 'recipients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      // COURIER Id
      courier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        references: { model: 'couriers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      // SIGNATURE Id
      signature_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: false,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      // PRODUCT name
      product: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Cancellation date, when cancelled
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      // Pick-up date for product delivery
      start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      // Final product delivery date
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
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
    return queryInterface.dropTable('deliveries');
  }
};
