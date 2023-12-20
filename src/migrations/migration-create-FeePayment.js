'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('FeePayments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            fee_id: Sequelize.INTEGER,
            paid_amount: Sequelize.INTEGER,
            household_number: Sequelize.STRING,
            submitter_name: Sequelize.STRING,
            note: Sequelize.STRING,
            period: Sequelize.INTEGER,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('FeePayments');
    }
};