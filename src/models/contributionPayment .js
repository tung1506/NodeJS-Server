'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ContributionPayment extends Model {
        static associate(models) {

        }
    };

    ContributionPayment.init({
        contribution_id: DataTypes.INTEGER,
        paid_amount: DataTypes.INTEGER,
        household_number: DataTypes.INTEGER,
        date: DataTypes.DATE,
        submitter_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'ContributionPayment',
        timestamps: false,
    });

    return ContributionPayment;
};
