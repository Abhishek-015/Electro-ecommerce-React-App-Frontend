const SubCategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const subcategory = await new SubCategory({ name, slug: slugify(name) }).save();
    res.json(subcategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};
exports.list = async (req, res) =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) =>
  res.json(await SubCategory.findOne({ slug: req.params.slug }).exec());

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }  // {new : true} is to send the currently updated item in res.json() other wise it will send the old  one
    );
    res.json(updated)
  } catch (err) {
    res.status(400).send("subcategory updation failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Failed to delete");
  }
};
