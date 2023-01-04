const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllPackages = async (req, res) => {
  try {
    const db = getDb();
    const packages = await db.collection("package").find({}).toArray();

    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.getSinglePackage = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const package = await db.collection("package").findOne(query);

    res.status(200).json({ success: true, data: package });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.postSinglePackage = async (req, res) => {
  try {
    const db = getDb();
    const package = req.body;
    const result = await db.collection("package").insertOne(package);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.updateSinglePackage = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const package = req.body;
    const updatedpackage = {
      $set: package,
    };
    const result = await db
      .collection("package")
      .updateOne(filter, updatedpackage, options);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.deleteSinglePackage = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await db.collection("package").deleteOne(query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
