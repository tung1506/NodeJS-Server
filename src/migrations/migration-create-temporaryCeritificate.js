'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TemporaryCertificates', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: Sequelize.INTEGER,
            certificate_type: Sequelize.STRING,
            issue_date: Sequelize.DATE,
            expiry_date: Sequelize.DATE,
            note: Sequelize.STRING,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TemporaryCertificates');
    }
};