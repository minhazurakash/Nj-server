const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllUsers= async (req, res) => {
    try {
      const db = getDb();
        const users = await db
        .collection("users")
        .find({})
        .toArray();
  
      res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };