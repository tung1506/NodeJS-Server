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
        fee_id: DataTypes.STRING,
        amount: DataTypes.STRING,
        period: DataTypes.DATEONLY,
    }, {
        sequelize,
        modelName: 'Fee',
        timestamps: false,
    });

    return Fee;
};

