const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllInstagrams= async (req, res) => {
    try {
      const db = getDb();
        const instagrams = await db
        .collection("instagram")
        .find({})
        .toArray();
  
      res.status(200).json({ success: true, data: instagrams });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };