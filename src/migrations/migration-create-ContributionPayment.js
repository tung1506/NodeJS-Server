'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ContributionPayments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            contribution_id: Sequelize.STRING,
            paid_amount: Sequelize.INTEGER,
            household_number: Sequelize.INTEGER,
            submitter_name: Sequelize.STRING,
            note: Sequelize.STRING,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ContributionPayments');
    }
};