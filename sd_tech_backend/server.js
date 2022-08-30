const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
var corsOptions = {
    origin: '*'
};
const db = require('./config/db.config');

var mysql = require('mysql');
var conn = mysql.createConnection({
  host:db.HOST,
  user:db.USER,
  db:db.DB,
  password:db.PASSWORD,
});
conn.connect(function(err){
  if(err){}
  else{
    console.log('Connection Established to '+db.DB)
    conn.query(`SELECT * FROM sdtech.users`);
  }
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/userRouter')

app.get("/", (req, res) => {
  res.json({ message: "Running application." });
});

app.use('/api',userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = conn;