import express from 'express';
import { getUsers, getUser } from '../controller/user.js';
import { getAllMessages, addMessage, getLatestMessage } from '../controller/messages.js';

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:wa_id", getUser);
router.get("/messages/:wa_id", getAllMessages);
router.get("/messages/latest/:wa_id", getLatestMessage);
router.post("/addmessage", addMessage);

export default router;
