const express = require('express');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/EmployeeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  salary: Number,
  designation: String,
  employee_type: String
});

// Define the employee model
const Employee = mongoose.model('Employee', employeeSchema);

// Create a new Express application
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Define a route to display all employee names
app.get('/', async (req, res) => {
  const employees = await Employee.find().maxTimeMS(30000);
  const employeeNames = employees.map(employee => employee.name);
  res.render('index', { employeeNames });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
