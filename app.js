const express = require('express')
const app = express()
const port = 3000

app.use((req, res,next) =>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/', (req, res) => {
    
})


function connectdb() {
 const sqlite3 = require('sqlite3').verbose();

    const db = new sqlite3.Database('./db/game_store.db', (err) => {
        if(err){
         alert('Error opening database:', err.message)
        }
        else{
            console.log('Connect to the Sqlite3 database.');
        }
    });
  app.get('/game',(req, res) =>{
    const select = 'SELECT * FROM game';
    db.all(select,[], (err,rows) =>{
      if(err){
        res.status(500).json({error:err.message});
        return
      }
      res.json(rows);
    })
  })
  
};

function seedData() {
  console.log("...seeding Data")
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/game_store.db', (err) => {
        if(err){
         alert('Error opening database:', err.message)
        }
        else{
            console.log('Connect Database.');
        }
    })

    let database =[
      {"title": "Grand Theft Auto V Enhanced", "category":"base","base_price":"959","discount_percent":"50","first_run":"No","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZVn4J-ON11_D4JcCOQMfbV7DEtuA31Jxiw&s"},
      {"title": "Surgeon Simulator 2", "category":"base","base_price":"269","discount_percent":"80","first_run":"Yes","image":"https://cdn1.epicgames.com/7f1fa336313d48eca0a802170aa8dd8a/offer/standard-key-art_OUT-NOW-1200x1600-21cc285767add349c9cc123d8e36ea9d.jpg?resize=1&w=360&h=480&quality=medium"},
      {"title": "Cyberpunk 2077", "category":"base","base_price":"1750","discount_percent":"65","first_run":"No","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_OX9TQaJsqRP4WSfeyGoQ2Nv3XUT0t6ebA&s"},
    ]
    database.forEach(data => {
      let values = Object.values(data)
      console.log(values)
      db.run("INSERT INTO game (title, category,discount_precent,base_price,image,first_run) VALUES( ?, ?, ?, ?, ?, ?)", values)
    })
   
}
// app.get('/game', (req, res) => {
//     let game =[
//         {"title": "Grand Theft Auto V Enhanced", "category":"base","base_price":"959","discount_percent":"50","first_run":"No","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZVn4J-ON11_D4JcCOQMfbV7DEtuA31Jxiw&s"},
//         {"title": "Surgeon Simulator 2", "category":"base","base_price":"269","discount_percent":"80","first_run":"Yes","image":"https://cdn1.epicgames.com/7f1fa336313d48eca0a802170aa8dd8a/offer/standard-key-art_OUT-NOW-1200x1600-21cc285767add349c9cc123d8e36ea9d.jpg?resize=1&w=360&h=480&quality=medium"},
//         {"title": "Cyberpunk 2077", "category":"base","base_price":"1750","discount_percent":"65","first_run":"No","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_OX9TQaJsqRP4WSfeyGoQ2Nv3XUT0t6ebA&s"},
//     ]
//     res.send(game);
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectdb()
});