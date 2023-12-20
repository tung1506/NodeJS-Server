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
        SELECT
        household_number,
        period,
        SUM(total_amount_due) AS total_amount_due,
        SUM(total_amount_paid) AS total_amount_paid
    FROM
        (
            SELECT
                h.household_number,
                f.period,
                f.amount * (SELECT COUNT(*) FROM Users WHERE household_number = h.household_number) AS total_amount_due,
                COALESCE(SUM(fp.paid_amount), 0) AS total_amount_paid
            FROM
            Households h
            JOIN FeePayments fp ON h.household_number = fp.household_number
            JOIN Fees f ON fp.fee_id = f.fee_id
            GROUP BY
                h.household_number,
                f.period,
                f.amount
        ) AS subquery
    GROUP BY
        household_number,
        period;
      `;
  
      const results = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
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