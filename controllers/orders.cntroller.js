const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllOrders = async (req, res) => {
  try {
    const db = getDb();
    const orders = await db.collection("order").find({}).toArray();

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.getSingleOrder = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const order = await db.collection("order").findOne(query);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.postSingleOrder = async (req, res) => {
  try {
    const db = getDb();
    const order = req.body;
    const result = await db.collection("order").insertOne(order);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.updateSingleOrder = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const order = req.body;
    const updatedOrder = {
      $set: order,
    };
    const result = await db
      .collection("order")
      .updateOne(filter, updatedorder, options);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports.deleteSingleOrder = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await db.collection("order").deleteOne(query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
