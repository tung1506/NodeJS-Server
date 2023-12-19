'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Households', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            household_number: Sequelize.STRING,
            street: Sequelize.STRING,
            district: Sequelize.STRING,
            city: Sequelize.STRING,
            head_of_household_id: Sequelize.INTEGER,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Households');
    }
};