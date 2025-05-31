const express = require("express");
const app = express();
const PORT = 3000;

app.get("/users", (req, res) => {
  res.setHeader("X-Service-Name", "user-service-2");
  res.json([
    { id: 1, name: "User A" },
    { id: 2, name: "User B" },
  ]);
});

app.listen(PORT, () => {
  console.log("user-service running on port " + PORT);
});
