'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Fees', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            fee_id: Sequelize.INTEGER,
            amount: Sequelize.STRING,
            frequency: Sequelize.STRING,
            period: Sequelize.INTEGER,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Fees');
    }
};