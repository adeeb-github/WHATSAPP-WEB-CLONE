import fs from "fs";
import path from "path";
import User from "../models/user.js";
import Message from "../models/message.js";

export const processWebhookData = async () => {
  const dataFolder = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataFolder);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const rawData = fs.readFileSync(path.join(dataFolder, file), "utf-8");
    const payload = JSON.parse(rawData);

    if (
      payload.payload_type === "whatsapp_webhook" &&
      payload.metaData?.entry
    ) {
      for (const entry of payload.metaData.entry) {
        for (const change of entry.changes) {
          const value = change.value;

          // Handle new messages
          if (value.messages) {
            const contact = value.contacts[0];
            const metadata = value.metadata;

            // Upsert user (if not present)
            let user = await User.findOne({ wa_id: contact.wa_id });
            if (!user) {
              user = await User.create({
                name: contact.profile.name,
                phoneNumber: metadata.display_phone_number,
                wa_id: contact.wa_id,
              });
            }

            for (const message of value.messages) {
              await Message.updateOne(
                { id: message.id },
                {
                  wa_id: contact.wa_id,
                  from: message.from,
                  id: message.id,
                  timestamp: new Date(parseInt(message.timestamp) * 1000),
                  text: message.text?.body || "",
                  type: message.type,
                  status: "sent", // default on message creation
                },
                { upsert: true }
              );
            }
          }

          // Handle status updates
          if (value.statuses) {
            for (const status of value.statuses) {
              // Update status for message identified by id or meta_msg_id
              const msgId = status.id || status.meta_msg_id;
              await Message.updateOne(
                { id: msgId },
                {
                  status: status.status,
                  timestamp: new Date(parseInt(status.timestamp) * 1000),
                }
              );
            }
          }
        }
      }
    }
  }
};
