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

  module.exports.getSingleBlog = async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
        const blog = await db
        .collection("blog")
        .findOne(query);
  
      res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };

  module.exports.postSingleBlog = async (req, res) => {
    try {
      const db = getDb();
            const blog = req.body;
            console.log(blog);
            const result = await db.collection("blog").insertOne(blog);  
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.updateSingleBlog = async (req, res) => {
    try {
      const db = getDb();
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }
            const blog = req.body;
            console.log(blog);
            const updatedBlog = {
                $set: blog
            };
            const result = await db.collection("blog").updateOne(filter, updatedBlog, options);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };



  module.exports.deleteSingleBlog = async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await db.collection("blog").deleteOne(query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };