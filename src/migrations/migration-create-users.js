'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            household_number: Sequelize.STRING,
            full_name: Sequelize.STRING,
            gender: Sequelize.BOOLEAN,
            alias: Sequelize.STRING,
            date_of_birth: Sequelize.DATE,
            place_of_birth: Sequelize.STRING,
            ethnicity: Sequelize.STRING,
            occupation: Sequelize.STRING,
            workplace: Sequelize.STRING,
            id_card_number: Sequelize.STRING,
            date_of_issue: Sequelize.DATE,
            place_of_issue: Sequelize.STRING,
            date_of_registration: Sequelize.DATE,
            previous_residence: Sequelize.STRING,
            relationship_with_head_of_household: Sequelize.STRING,
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            role: Sequelize.STRING,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};