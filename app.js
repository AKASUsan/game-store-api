const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  
  next();
});
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {});

function connectdb() {
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database("./db/game_store.db", (err) => {
    if (err) {
      alert("Error opening database:", err.message);
    } 
   
  });
   return db;
}

function seedData() {
  console.log("...seeding Data");
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database("./db/game_store.db", (err) => {
    if (err) {
      alert("Error opening database:", err.message);
    } else {
      console.log("Connect Database.");
    }
  });

  database.forEach(data => {
    let values = Object.values(data)
    console.log(values)
    db.run("INSERT INTO game (title, category,discount_precent,base_price,image,first_run) VALUES( ?, ?, ?, ?, ?, ?)", values)
  });
}

  app.get("/game", (req, res) => {
    const games = []; 
    const db = connectdb()
    db.all("SELECT* FROM game", (err, rows) => {
      rows.forEach((row) => {
        games.push(row);
      });
       res.send(games)
    });
    // console.log(games)
   
  });
  app.post('/game', (req,res) =>{
    console.log(req.body)
    const db = connectdb();
    const sql = sqlInsertGame();
    const values = req.
    db.run(sql, values)
  })

  function sqlInsertGame() {
    return `INSERT INTO game (title, category,discount_precent,base_price,image,first_run) VALUES( ?, ?, ?, ?, ?, ?)`
  }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
