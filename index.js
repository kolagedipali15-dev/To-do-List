const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); 

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render("home");
});


app.get('/task', (req, res) => {
  res.render("task");
});


app.post('/taskdetails', async (req, res) => {
  try {
    const data = {
       task:req.body.task,
       description:req.body.description,
       priority:req.body.priority,
       completed:req.body.completed
    }
    await connectDB.insertMany([data]);
   res.redirect('/task');
  } catch (err) {
    console.error('Error saving task:', err);
  }
});

// Read task (GET)
app.get('/td2', async (req, res) => {
  try {
    const task = await connectDB.find({});
    res.render("taskdetails", { task});
  } catch (err) {
    console.error('Error fetching contacts:', err);
  }
});

// Update task (GET Form)
app.get('/edit/:id', async (req, res) => {
  try {
    const task = await connectDB.findById(req.params.id);
    res.render("edit", { task });
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).send("Error fetching data");
  }
});

// Update task (POST)
app.post('/update/:id', async (req, res) => {
  try {
    await connectDB.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/td2');
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).send("Error updating data");
  }
});

// Delete task
app.get('/delete/:id', async (req, res) => {
  try {
    await connectDB.findByIdAndDelete(req.params.id);
    res.redirect('/td2');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send("Error deleting data");
  }
});

app.listen(5000, () => {
  console.log('Server is running on 5000');
});
