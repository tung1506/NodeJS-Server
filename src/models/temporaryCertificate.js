'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TemporaryCertificate extends Model {
        static associate(models) {

        }
    };

    TemporaryCertificate.init({
        user_id: DataTypes.INTEGER,
        certificate_type: DataTypes.STRING,
        issue_date: DataTypes.DATE,
        expiry_date: DataTypes.DATE,
        note: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TemporaryCertificate',
        timestamps: false,
    });

    return TemporaryCertificate;
};
