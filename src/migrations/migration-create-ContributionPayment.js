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
            household_id: Sequelize.INTEGER,
            date: Sequelize.DATE,
            submitter_name: Sequelize.STRING,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ContributionPayments');
    }
};