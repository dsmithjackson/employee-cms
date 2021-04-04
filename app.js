const cTable = require('console.table')
const inquirer = require('inquirer')

const mysql = require('mysql')
const dbConfig = require('./dbconfig.json')

const connection = mysql.createConnection({
  host: dbConfig.db_host,
  user: dbConfig.db_user,
  password: dbConfig.db_password,
  database: dbConfig.db_database,
  port: dbConfig.db_port || 3306
})

// connection.connect()


// connection.query('SELECT * FROM employee', (err, res, fields) => {
//   if (err) throw err

//   console.table(res)
// })

// connection.end()


const testQuestion = {
  type: 'input',
  name: 'whatsUp',
  message: 'What\'s up?',
  default: 'imdumb'
}

inquirer.prompt([testQuestion])
  .then((answers) => {
    console.log(answers)
    console.log('bah bah', answers)
  })

// Manage Departments
// Add
// View
// Delete

// Manage Roles
// Add
// View
// Update
// Delete

// Manage Employees
// Add
// View
// Update
// Delete
// Change Managers


// Helpers
// View Total Budgets
