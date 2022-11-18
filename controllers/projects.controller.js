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

  module.exports.getSingleProject= async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
        const project = await db
        .collection("project")
        .findOne(query);
  
      res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.postSingleProject= async (req, res) => {
    try {
      const db = getDb();
        const project= req.body;
        const result = await db.collection("project").insertOne(project);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.updateSingleProject= async (req, res) => {
    try {
      const db = getDb();
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }

            const project = req.body;
            const updatedProject = {
                $set: project
            };
            const result = await db.collection("project").updateOne(filter, updatedProject, options);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };



  module.exports.deleteSingleProject= async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await db.collection("project").deleteOne(query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };