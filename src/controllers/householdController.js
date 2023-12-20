import householdService from '../services/householdService';

let getAllHousehold = async (req, res) => {
    let data = await householdService.getAllHousehold();

    return res.status(200).json(data);
}

let getFee = async (req, res) => {
    let data = await householdService.getFee();

    return res.status(200).json(data);
}

module.exports = {
    getAllHousehold: getAllHousehold,
    getFee: getFee,
}