'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Households extends Model {
        static associate(models) {

        }
    };

    Households.init({
        household_number: DataTypes.STRING,
        street: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        head_of_household_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Households',
        timestamps: false,
    });

    return Households;
};
