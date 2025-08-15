const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create({
            userId: req.user.id,
            totalAmount: req.body.totalAmount
        });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { userId: req.user.id } });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
