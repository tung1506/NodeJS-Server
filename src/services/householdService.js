import db from '../models/index';

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

module.exports = {
    getAllHousehold: getAllHousehold,
}