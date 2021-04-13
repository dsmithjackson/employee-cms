const cTable = require('console.table')
const inquirer = require('inquirer')

const mysql = require('mysql')
const dbConfig = require('./dbconfig.json')
// const question = require('./question-sets/mainQuestions')

const connection = mysql.createConnection({
  host: dbConfig.db_host,
  user: dbConfig.db_user,
  password: dbConfig.db_password,
  database: dbConfig.db_database,
  port: dbConfig.db_port || 3306
})

connection.connect()

// connection.query('SELECT * FROM employee', (err, res, fields) => {
//   if (err) throw err

//   console.table(res)
// })

// connection.end()

// const testQuestion = {
//   type: 'input',
//   name: 'whatsUp',
//   message: 'What\'s up?',
//   default: 'imdumb'
// }

// inquirer.prompt([testQuestion])
//   .then((answers) => {
//     console.log(answers)
//     console.log('bah bah', answers)
//   })

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

const questionSets = {
  employees: require('./employeeOptions.js'),
  departments: require('./departmentOptions.js')
}

const choiceList = Object.keys(questionSets)
choiceList.push(
  new inquirer.Separator(),
  {
    name: 'Exit',
    value: 'DONE'
  })

const questions = [
  {
    type: 'list',
    name: 'what',
    message: 'what are you doin',
    choices: choiceList
  },
  {
    type: 'list',
    name: 'option',
    message: 'MANAGE EMPLOYEES',
    choices: questionSets.employees.choices,
    when: (answers) => {
      return answers.what === 'employees'
    }
  },
  {
    type: 'list',
    name: 'option',
    message: 'MANAGE DEPARTMENTS',
    choices: ['view', 'add', 'back'],
    when: (answers) => {
      return answers.what === 'departments'
    }
  },
  {
    type: 'list',
    name: 'option',
    message: 'MANAGE ROLES',
    choices: ['view', 'add', 'back'],
    when: (answers) => {
      return answers.what === 'roles'
    }
  }
]

function secondaryAsk(what, option, connection) {
  console.log(what, option)
  // TODO: Come up with something better than passing ask
  questionSets[what].methods[option](connection, ask)
    .then((next) => {
      switch (next) {
        case 'top':
          ask()
          break
        case 'same':
          // TODO: Fix handling infinte loop
          ask()
          // secondaryAsk(what, option, connection)
          break
        default:
          console.log('Shouldn\'t be here')
          break
      }
    })
}

function ask () {
  // console.clear()
  inquirer.prompt(questions).then((answers) => {
    if (answers.what === 'DONE') {
      process.exit()
    }
    // questionSets[answers.what].methods[answers.option](connection)
    console.log(answers)
    secondaryAsk(answers.what, answers.option, connection)
  })
}

ask()
