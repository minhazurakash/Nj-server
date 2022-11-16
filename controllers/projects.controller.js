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
      const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')
            const newProject = { title, link, img: imgBuffer }
            const result = await db.collection("project").insertOne(newProject);

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

            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newProject = { title, link, img: imgBuffer }
            const updatedProject = {
                $set: newProject
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