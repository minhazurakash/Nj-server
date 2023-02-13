const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllsServices = async (req, res) => {
  try {
    const db = getDb();
    const services = await db.collection("service").find({}).toArray();

    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.getSingleService = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const service = await db.collection("service").findOne(query);

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.postSingleService = async (req, res) => {
  try {
    const db = getDb();
    const service = req.body;
    const result = await db.collection("service").insertOne(service);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.updateSingleService = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const service = req.body;
    const updatedservice = {
      $set: service,
    };
    const result = await db
      .collection("service")
      .updateOne(filter, updatedservice, options);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.deleteSingleService = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await db.collection("service").deleteOne(query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
