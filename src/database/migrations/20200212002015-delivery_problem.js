module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('delivery_problems', {
      // DELIVERY PROBLEM Id
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // DELIVERY Id
      delivery_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        references: { model: 'deliveries', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      // DESCRIPTION Problem
      description: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('delivery_problems');
  }
};
