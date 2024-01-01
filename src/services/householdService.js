import db from '../models/index';
const Sequelize = require('sequelize');
import { QueryTypes } from '@sequelize/core';

let getAllHousehold = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Households.findAll({
                raw: true,
            })
            resolve(data);

        } catch (e) {
            reject(e)
        }
    })
};

let getFee = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `
        SELECT DISTINCT household_number, period
        FROM Fees, Households
      `;
  
      const results = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
      
      for(const result of results) {
        const household_number = result.household_number;
        const period = result.period;

        let member = await db.User.count({
            where:{
                household_number: household_number,
            }
        })

        let data = await db.Fee.findAll({
            attributes: ['amount'],
            where:{
                period: period,
            }
        })

        let amount = 0;
        for (const x of data){
            amount += parseInt(x.amount);
        }

        console.log('Debug:', household_number, period, member, amount);
        
        let totalAmountDue = 0;
        totalAmountDue = amount * member;

        let data1 = await db.FeePayment.findAll({
            attributes: ['paid_amount'],
            where:{
                period: period,
                household_number: household_number,
            }
        })

        let totalPaidAmount = 0;
        for (const x of data1){
            totalPaidAmount += x.paid_amount;
        }
        result.totalAmountDue = totalAmountDue;
        result.totalPaidAmount = totalPaidAmount;

      }

      resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  };
  

  
module.exports = {
    getAllHousehold: getAllHousehold,
    getFee: getFee,
}