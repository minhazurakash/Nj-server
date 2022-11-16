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

  module.exports.getSingleSlider= async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
        const slider = await db
        .collection("slider")
        .findOne(query);
  
      res.status(200).json({ success: true, data: slider });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.postSingleSlider= async (req, res) => {
    try {
      const db = getDb();
            const { title, dec } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')
            const newSlider = { title, dec, img: imgBuffer }
            const result = await db.collection("slider").insertOne(newSlider);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };


  module.exports.updateSingleSlider= async (req, res) => {
    try {
      const db = getDb();
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }
            const { title, dec } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')
            const newSlider = { title, dec, img: imgBuffer }
            const updatedSlider = {
                $set: newSlider
            };
            const result = await db.collection("slider").updateOne(filter, updatedSlider, options);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };



  module.exports.deleteSingleSlider = async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await db.collection("slider").deleteOne(query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message:error });
    }
  };