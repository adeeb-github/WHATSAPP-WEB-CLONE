const express = require('express'); 
const router = express.Router();
const { getUsers,getUser }=require("../controller/user");

const { getAllMessages, addMessage,getlatestMessage }=require("../controller/messages");

router.get("/users", getUsers);
router.get("/messages/:wa_id", getAllMessages);
router.get("/users/:wa_id", getUser);
router.post("/addmessage", addMessage);
router.get("/messages/latest/:wa_id", getlatestMessage);
module.exports = router;