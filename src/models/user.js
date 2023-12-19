'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    }
  };

  User.init({
    household_number: DataTypes.STRING,
    full_name: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    alias: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    place_of_birth: DataTypes.STRING,
    ethnicity: DataTypes.STRING,
    occupation: DataTypes.STRING,
    workplace: DataTypes.STRING,
    id_card_number: DataTypes.STRING,
    date_of_issue: DataTypes.DATE,
    place_of_issue: DataTypes.STRING,
    date_of_registration: DataTypes.DATE,
    previous_residence: DataTypes.STRING,
    relationship_with_head_of_household: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });

  return User;
};
