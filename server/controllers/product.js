const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    // .populate('category')
    // .populate('subCategory')
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Product deletion failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subCategory")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR---->", err);
    return res.status(400).json({
      err: err.message,
    });
  }
};

//without pagination
// exports.list = async (req, res) => {
//   try {
//     //sort-->createdAt/updatedAt, order-->asc,desc
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subCategory")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

//with pagination
exports.list = async (req, res) => {
  try {
    //sort-->createdAt/updatedAt, order-->asc,desc
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPageProducts = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPageProducts)
      .populate("category")
      .populate("subCategory")
      .sort([[sort, order]])
      .limit(perPageProducts)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  //who is updating
  //check if currently logged in user have already added rating to this product
  let existingRatingObject = product.ratings.find((ele) => {
    return ele.postedBy.toString() == user._id.toString();
  });

  //if user have not left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    //if user have already left rating , update it
    if (existingRatingObject) {
      existingRatingObject.star = star;
      const updatedRating = await product.save();
      console.log("updatedRating------>", updatedRating);
      res.json(updatedRating);
    }
    // const updateRating = await Product.updateOne(
    //   {
    //     ratings: { $elemMatch: existingRatingObject },
    //   },
    //   { $set: { "ratings.$.star": star } },
    //   { new: true }
    // ).exec();
    // console.log("updateRating", updateRating);
    // res.json(updateRating);
  }
};
