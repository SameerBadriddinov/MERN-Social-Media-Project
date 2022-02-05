const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require("./config/key");
require("./models/user");
require("./models/post");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", index))
  );
}

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
