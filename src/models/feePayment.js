'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FeePayment extends Model {
        static associate(models) {
            FeePayment.belongsTo(models.Fee, {
                foreignKey: "fee_id",
            });
        }
    };

    FeePayment.init({
        fee_id: DataTypes.INTEGER,
        paid_amount: DataTypes.INTEGER,
        date: DataTypes.DATE,
        submitter_name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FeePayment',
        timestamps: false,
    });

    return FeePayment;
};
