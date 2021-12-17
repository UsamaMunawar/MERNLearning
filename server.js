const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log('Connection to MongoDB Failed', err));

//Use Routes
app.use('/api/items', items);

console.log(process.env.NODE_ENV);
console.log(process.env);

// Serve our static assets if in production
if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV);
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

//starting our server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
