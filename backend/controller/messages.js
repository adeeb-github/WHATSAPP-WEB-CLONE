const Message=require('../models/message');
const { v4: uuidv4 } = require('uuid');
exports.getAllMessages=async(req,res)=>{
    try {
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }

}

exports.addMessage = async (req, res) => {
  try {
    const { wa_id, text, from, timestamp } = req.body;

    // Basic validation
    if (!wa_id || !text || !from || !timestamp) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const date = new Date(timestamp);
    if (isNaN(date)) {
      return res.status(400).json({ success: false, message: "Invalid timestamp format" });
    }

    // Create new message
    const newMessage = new Message({
      wa_id,
      text,
      from,
      timestamp: date,
      id: uuidv4(),
    });

    // Save to database
    await newMessage.save();

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding message"
    });
  }
};
exports.getlatestMessage=async(req,res)=>{
  try {
    const message = await Message.findOne({ wa_id: req.params.wa_id }).sort({ timestamp: -1 });
    res.json({ success: true, data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}