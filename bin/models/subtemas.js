const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subtemasSchema = new Schema({
  name: String,
  duraction: String,
  temass: [
    {
      type: Schema.Types.ObjectId,
      ref: "temas"
    }
  ],
  estudiante_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "estudiante"
    }
  ]
});

var subtemas = mongoose.model("subtemas", subtemasSchema);
module.exports = subtemas;
