const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllBlogs = async (req, res) => {
    try {
      const db = getDb();
        const blogs = await db
        .collection("blog")
        .find({})
        .toArray();
  
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };