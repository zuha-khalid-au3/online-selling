const Sub = require("../models/sub");
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const {name, parent} = req.body
        const sub = await new Sub({name, parent, slug:slugify(name)}).save();
        res.json(sub);
    } catch (err) {
        res.status(400).send("Create Subsub failed")
    }

};

exports.list = async (req, res) => 
    res.json(await Sub.find({}).sort({createdAt: -1}).exec());


exports.read = async (req, res) => {
    let sub = await (await Sub.findOne({ slug: req.params.slug}).exec());
    res.json(sub)

};

exports.update = async (req, res) => {
    const { name,parent } = req.body;
    //console.log(req.body);
    try {
        const update = await Sub.findOneAndUpdate(
            {slug: req.params.slug},
            {name,parent,slug:slugify(name)},
            {new: true}
            );
            res.json(update)

    } catch (err) {
        res.status(400).send("updation failed")
    }


};

exports.remove =async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);

    } catch (err) {
        res.status(400).send("Deletion failed");
    }

};

