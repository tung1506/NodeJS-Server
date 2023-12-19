import db from '../models/index';

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

let getAllFeePayment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.FeePayment.findAll({

                include: [{
                    model: db.Fee,
                    required: true,
                }],
                raw: true,
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
                date,
                submitter_name,
            } = data;

            if (!fee_id || !paid_amount || !date || !submitter_name) {
                resolve({
                    errCode: 1,
                })
            }

            const fee = await db.Fee.findOne({
                where: {
                    fee_id: fee_id,
                }
            })

            if (!fee) {
                resolve({
                    errCode: 2,
                });
            }

            await db.FeePayment.create({
                fee_id: fee_id,
                paid_amount: paid_amount,
                date: date,
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
            if (!data.contribution_id || !data.start_date || !data.end_date || !data.note) {
                resolve({
                    errCode: 1,
                    message: "missing parameters",
                });
            }

            let contribution = await db.Contribution.create({
                contribution_id: data.contribution_id,
                start_date: data.start_date,
                end_date: data.end_date,
                note: data.note,
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


module.exports = {
    createFee: createFee,
    getFee: getFee,
    createFeePayment: createFeePayment,
    getAllFeePayment: getAllFeePayment,
    createContribution: createContribution,
}