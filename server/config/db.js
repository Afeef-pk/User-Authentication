const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL || "mongodb+srv://afeefpk:yyUC1a1fox82wf0c@cluster0.vipofcg.mongodb.net/peko-task?retryWrites=true&w=majority"

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection; //Getting a Reference to the Database Connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = db;
