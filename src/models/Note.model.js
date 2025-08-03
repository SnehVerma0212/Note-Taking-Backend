const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteModel = new Schema({
    user: { type: ObjectId, required: true },
    title: { type: String, required: true },
    notes: { type: String, required: true },
    importance: { type: String, enum : ["low","medium","high"] , default: "low" }
}, {
    timestamps : true
}, { collection: "Notes" });


// This stores the notes in a sorted order on the basis of userId and in that with title. This helps in easier searching in mongodb.
noteModel.index({ user: 1, title: 1 }, { unique: true });


module.exports = mongoose.model("Notes",noteModel);