const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllProjects = async (req, res) => {
    try {
      const db = getDb();
        const projects = await db
        .collection("project")
        .find({})
        .toArray();
  
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };