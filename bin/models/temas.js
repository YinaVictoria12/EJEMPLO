const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const temasSchema = new Schema({
  name1: String,
  name2: String,
  last_name1: String,
  last_name2: String,
  subtemass: [
    {
      type: Schema.Types.ObjectId,
      ref: "subtemas"
    }
  ]
});

var temas = mongoose.model("temas", temasSchema);
module.exports = temas;
