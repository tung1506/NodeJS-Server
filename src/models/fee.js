'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Fee extends Model {
        static associate(models) {
            Fee.hasMany(models.FeePayment, {
                foreignKey: 'fee_id',
            });

        }
    };

    Fee.init({
        fee_id: DataTypes.INTEGER,
        amount: DataTypes.STRING,
        period: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Fee',
        timestamps: false,
    });

    return Fee;
};

