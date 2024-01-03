import db from '../models/index';
const { Sequelize } = require('sequelize');

let createFee = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.period || !data.fee_id || !data.amount || !data.frequency) {
                resolve({
                    errCode: 1,
                    message: "missing parameters, requires fee_id, period, amount, frequency",
                });
            }

            let fee = await db.Fee.create({
                fee_id: data.fee_id,
                amount: data.amount,
                frequency: data.frequency,
                period: data.period,
            });

            if (fee) {
                resolve({
                    errCode: 0,
                    message: "created fee successfully",
                });
            } else {
                reject("Can't create fee. Server error");
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getFee = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let feeData = db.Fee.findAll({
                raw: true
            })
            resolve(feeData)

        } catch (error) {
            reject(error);
        }
    });
};

let editFee = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let feeData = db.Fee.findOne({
                where: {
                    fee_id: data.fee_id,
                }
            })

            if(!feeData){
                resolve({message: `can't find the fee`})
            }

            feeData.amount = data.amount,
            feeData.period = data.period,

            await feeData.save();

            resolve({
                message: 'fee updated successfully',
            })

        } catch (error) {
            reject(error);
        }
    });
};

let getAllFeePayment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.FeePayment.findAll({

                include: [{
                    model: db.Fee,
                    required: true,
                }],
                nested: true,
            })
            resolve(data)

        } catch (e) {
            reject(e)
        }
    });
}

let createFeePayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                fee_id,
                paid_amount,
                household_number,
                submitter_name,
                period,
            } = data;

            await db.FeePayment.create({
                fee_id: fee_id,
                paid_amount: paid_amount,
                household_number: household_number,
                period: period,
                submitter_name: submitter_name,
            });

            resolve({
                errCode: 0,
                message: "fee_payment created successfully",
            })

        } catch (error) {
            reject(error);
        }
    });
};

let createContribution = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.contribution_id || !data.start_date || !data.end_date || !data.content) {
                resolve({
                    errCode: 1,
                    message: "missing parameters",
                });
            }

            let contribution = await db.Contribution.create({
                contribution_id: data.contribution_id,
                start_date: data.start_date,
                end_date: data.end_date,
                content: data.content,
            });

            if (contribution) {
                resolve({
                    errCode: 0,
                    message: "created contribution successfully",
                });
            } else {
                reject("Can't create contribution. Server error");
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getFeePeriod = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = db.Fee.findAll({
                attributes: [
                    [Sequelize.literal('DISTINCT period'), 'period'], // Specify the distinct column
                  ],
            })
            resolve(data)

        } catch (error) {
            reject(error);
        }
    });
};

let getPayMents = (period) => {
    return new Promise(async (resolve, reject) => {
        try {
            let member = await db.User.count({
                where:{}
            })

            //console.log(member + ' ' + period);

            let data1 = await db.Fee.findAll({
                where:{
                    period: period,
                }
            })

            
            let data2 = await db.FeePayment.findAll({
                where:{
                    period: period,
                }
            })

            let amount = 0;
            let paid_amount = 0;

            for(const x of data1){
                amount += parseInt(x.amount);
            }

            for(const x of data2){
                paid_amount += parseInt(x.paid_amount);
            }

            resolve({
                dot: period,
                tongThu: amount * member,
                daThu: paid_amount * member,
            })

        } catch (error) {
            reject(error);
        }
    });
};

let getDetailFee = async () => {
    try {
        let member = await db.User.count({
            where: {}
        });

        let feeData = await db.Fee.findAll({
            attributes: ['fee_id','amount']
        });

        for (let i = 0; i < feeData.length; i++) {
            let x = feeData[i];

            let tongCanThu = parseInt(x.amount) * member;

            let fee_id = x.fee_id;

            let paymentData = await db.FeePayment.findAll({
                where: {
                    fee_id: fee_id,
                }
            });

            let daDong = 0;
            for (const y of paymentData) {
                daDong += parseInt(y.paid_amount);
            }

            // Directly modify the Sequelize instance
            feeData[i].dataValues.tongCanThu = tongCanThu;
            feeData[i].dataValues.daDong = daDong;
        }

        return feeData;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createFee: createFee,
    getFee: getFee,
    createFeePayment: createFeePayment,
    getAllFeePayment: getAllFeePayment,
    createContribution: createContribution,
    getFeePeriod: getFeePeriod,
    editFee: editFee,
    getPayMents: getPayMents,
    getDetailFee: getDetailFee,
}
