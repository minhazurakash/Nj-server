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

  module.exports.getSingleInstagram = async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
        const instagram = await db
        .collection("instagram")
        .findOne(query);
  
      res.status(200).json({ success: true, data: instagram });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.postSingleInstagram = async (req, res) => {
    try {
      const db = getDb();
            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')
            const newInstagramCard = { title, link, img: imgBuffer }
            const result = await db.collection("instagram").insertOne(newInstagramCard);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.updateSingleInstagram = async (req, res) => {
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

            const newInstagramCard = { title, link, img: imgBuffer }
            const updatedInstagram = {
                $set: newInstagramCard
            };
            const result = await db.collection("instagram").updateOne(filter, updatedInstagram, options);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.deleteSingleInstagram = async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await db.collection("instagram").deleteOne(query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };