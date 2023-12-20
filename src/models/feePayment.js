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
            FeePayment.belongsTo(models.Households, {
                foreignKey: "household_number",
            });
        }
    };

    FeePayment.init({
        fee_id: DataTypes.INTEGER,
        paid_amount: DataTypes.INTEGER,
        household_number: DataTypes.STRING,
        submitter_name: DataTypes.STRING,
        note: DataTypes.STRING,
        period: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'FeePayment',
        timestamps: false,
    });

    return FeePayment;
};
