'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Contribution extends Model {
        static associate(models) {

        }
    };

    Contribution.init({
        contribution_id: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Contribution',
        timestamps: false,
    });

    return Contribution;
};
