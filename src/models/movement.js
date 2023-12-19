'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Movement extends Model {
        static associate(models) {

        }
    };

    Movement.init({
        user_id: DataTypes.INTEGER,
        movement_type: DataTypes.STRING,
        date: DataTypes.DATE,
        note: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Movement',
        timestamps: false,
    });

    return Movement;
};
