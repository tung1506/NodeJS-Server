import managerService from '../services/managerService';

let createFee = async (req, res) => {
    try {
        let fee = await managerService.createFee(req.body);

        if (fee.errCode === 1) {
            return res.status(500).json(fee);
        }

        return res.status(201).json(fee);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

let getFee = async (req, res) => {
    try {
        const fees = await managerService.getFee();
        res.json(fees);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

let editFee = async (req, res) => {
    try {
        const edited_fee = await managerService.editFee(req.body);
        res.json(edited_fee);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

let getAllFeePayment = async (req, res) => {
    try {
        let data = await managerService.getAllFeePayment();
        res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let createFeePayment = async (req, res) => {
    try {
        const payment = await managerService.createFeePayment(req.body);
        if (payment.errCode) {
            return res.status(500).json({ error: "missing parameters or can't find fee" });
        }
        res.json(payment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error or type of paramenters are incorrect' });
    }
};

let createContribution = async (req, res) => {
    try {
        let contribution = await managerService.createContribution(req.body);

        if (contribution.errCode === 1) {
            return res.status(500).json(contribution);
        }

        return res.status(201).json(contribution);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

let getFeePeriod = async (req, res) => {
    try {
        const data = await managerService.getFeePeriod();
        res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

let getPayMents = async (req, res) => {
    try {
        const data = await managerService.getPayMents(req.body.period);
        res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
}