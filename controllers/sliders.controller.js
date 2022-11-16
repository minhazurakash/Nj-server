const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllSliders = async (req, res) => {
    try {
      const db = getDb();
        const sliders = await db
        .collection("slider")
        .find({})
        .toArray();
  
      res.status(200).json({ success: true, data: sliders });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };