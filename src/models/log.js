'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        static associate(models) {

        }
    };

    Log.init({
        name: DataTypes.STRING,
        date: DataTypes.DATE,
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Log',
        timestamps: false,
    });

    return Log;
};
