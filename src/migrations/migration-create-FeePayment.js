'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('FeePayment', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            fee_id: Sequelize.INTEGER,
            paid_amount: Sequelize.INTEGER,
            date: Sequelize.DATE,
            submitter_name: Sequelize.STRING,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('FeePayment');
    }
};