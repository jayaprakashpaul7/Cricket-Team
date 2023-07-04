const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());

module.exports = app;

const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/players/", async (req, res) => {
  const getPlayerQuery = `
    SELECT * FROM cricket_team ORDER BY player_iD;`;

  const players = await db.all(getPlayerQuery);
  res.send(players);
});

// Add
app.post("/players/", async (request, response) => {
  const playerDetails = request.body;

  const { player_name, jersey_number, role } = playerDetails;
  const addPlayerQuery = `
    INSERT INTO cricket_team (
  player_name,
  jersey_number,
  role
)

VALUES ('${player_name}', ${jersey_number}, '${role}');`;

  const dbResponse = await db.run(addPlayerQuery);
  const playerId = dbResponse.lastID;
  response.send("Player Added to Team");
});
// get
app.get("/players/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const getPlayerQuery = `
    SELECT * FROM cricket_team WHERE player_id= ${playerId};`;

  const players = await db.get(getPlayerQuery);
  res.send(players);
});

//update
app.put("/players/:playerId", async (req, res) => {
  try {
    const { playerId } = req.params;
    const playerDetails = req.body;

    const { player_name, jersey_number, role } = playerDetails;
    const getPlayerQuery = `
        UPDATE cricket_team ( player_name, jersey_number, role)

        SET 
        player_name='${player_name}',
        jersey_number= ${jersey_number},
        role= '${role}'

        WHERE player_id= ${playerId};`;

    const player = await db.run(getPlayerQuery);
    res.send("Player updated successfully");
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
  }
});

//delete
app.delete("/players/:playerId/", async (req, res) => {
  const { playerId } = req.params;
  const deleteQuery = `DELETE FROM cricket_team WHERE player_id=${playerId};`;
  const dbResponse = await db.run(deleteQuery);
  res.send("player Removed");
});

//ccbp submit NJSCPXTWMS
