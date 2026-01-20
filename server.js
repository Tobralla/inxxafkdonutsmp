const express = require("express");
const app = express();

const API_KEY = "9cb9dce940e04b84a07ab0a94669f2ff";

app.use(express.static(__dirname));

const PLAYERS = [
  { username: "inxx", avatar: "https://api.mineatar.io/body/full/30a6fd05dde9470c8463841f6ad892d9?scale=16" },
  { username: "inxxafk1", avatar: "https://api.mineatar.io/body/full/28a5bf86b7cf4e459bebdc31c6f61b4f?scale=16" },
  { username: "inxxafk2", avatar: "https://api.mineatar.io/body/full/c4f712235a10449da9def4458182994e?scale=16" },
  { username: "inxxafk3", avatar: "https://api.mineatar.io/body/full/17d8978300134b5d928c697c24ba56b5?scale=16" }
];

app.get("/api/stats", async (req, res) => {
  const results = [];

  for (const player of PLAYERS) {
    try {
      const response = await fetch(`https://api.donutsmp.net/v1/stats/${player.username}`, {
        headers: { Authorization: API_KEY }
      });

      const data = await response.json();

      let money = "N/A";
      if (response.status === 200 && data.result?.money) {
        money = data.result.money;
      }

      results.push({
        username: player.username,
        avatar: player.avatar,
        money
      });

    } catch (err) {
      results.push({
        username: player.username,
        avatar: player.avatar,
        money: "Error"
      });
    }
  }

  res.json(results);
});

app.listen(3000, () => {
  console.log("Server running → http://localhost:3000");
});
