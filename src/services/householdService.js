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
          h.household_number,
          fp.fee_id,
          f.period,
          f.amount * (SELECT COUNT(*) FROM Users WHERE household_number = h.household_number) AS total_amount_due,
          SUM(fp.paid_amount) AS total_amount_paid
        FROM
          Households h
          RIGHT JOIN FeePayments fp ON h.household_number = fp.household_number
          LEFT JOIN Fees f ON fp.fee_id = f.fee_id
        WHERE
            fp.period = f.period
        GROUP BY
          h.household_number,
          fp.fee_id,
          f.period,
          fp.household_number;
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