const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  name: String,
  descripcion: String,
  gender: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  subtemas_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "subtemas"
    }
  ]
});

var estudiante = mongoose.model("estudiante", estudianteSchema);
module.exports = estudiante;
