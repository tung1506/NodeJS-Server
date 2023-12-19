import householdService from '../services/householdService';

let getAllHousehold = async (req, res) => {
    let data = await householdService.getAllHousehold();

    return res.status(200).json(data);
}

module.exports = {
    getAllHousehold: getAllHousehold,
}