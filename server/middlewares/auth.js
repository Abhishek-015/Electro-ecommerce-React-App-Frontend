const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers)
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASEUSER IN AUTH CHECK", firebaseUser);
    req.user = firebaseUser;
  } catch (error) {
    res.status(401).json({
      err: "Invalid or Expired token",
    });
  }
  next()
};
