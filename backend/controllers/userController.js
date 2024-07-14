const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.followCompany = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.following.includes(req.params.id)) {
            user.following.push(req.params.id);
            await user.save();
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.uploadCompanyLink = async (req, res) => {
    const { companyLink } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.companyLinks.push(companyLink);
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
