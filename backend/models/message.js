const mongoose=require("mongoose");

const messageSchema = new mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
    trim: true
  },
  from: {
    type: String, // the sender's phone number or ID from payload
    required: true,
    trim: true
  },
  text: {
    type: String,
    trim: true,
    default: ""  // optional text, defaults to empty string
  },
  timestamp: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent"
  },
  id: {
  type: String,
  trim:true,
  default:null, // this allows multiple docs with no id (null) but unique for non-null values
},

  meta_msg_id: {
    type: String, // optional, useful if you want to map statuses
    trim: true,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", messageSchema);
