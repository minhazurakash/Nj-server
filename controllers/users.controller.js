const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find({}).toArray();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.postSingleUser = async (req, res) => {
  try {
    const db = getDb();
    const user = req.body;
    const result = await db.collection("users").insertOne(user);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.updateSingleUser = async (req, res) => {
  try {
    const db = getDb();
    const user = req.body;
    const id = user.id;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateUser = { $set: user };
    const result = await db
      .collection("users")
      .updateOne(filter, updateUser, options);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.updateAdmin = async (req, res) => {
  try {
    const db = getDb();
    const user = req.body;
    const filter = { email: user.email };
    const updateUser = { $set: { role: "admin" } };
    const result = await db.collection("users").updateOne(filter, updateUser);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
