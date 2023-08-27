const HMS = require("@100mslive/server-sdk");

const hms = new HMS.SDK(process.env.accessKey, process.env.secret);

let roomWithOptions;
const roomCreateOptions = {
  name: "Your Room Name",
  description: "Your Room Description",
  template_id: "your-template-id",
  recording_info: "your-recording-info",
  region: "your-region",
};

(async () => {
  try {
    roomWithOptions = await hms.rooms.create(roomCreateOptions);
    console.log("Room created:", roomWithOptions);
  } catch (error) {
    console.error("Error creating room:", error);
  }
})();
