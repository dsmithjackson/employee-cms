const inquirer = require('inquirer')

const choices = [
  {
    name: 'View All Employees',
    value: 'ALL_EMPLOYEES'
  },
  {
    name: 'View All By Department',
    value: 'EMPLOYEE_BY_DEPARTMENT'
  },
  {
    name: 'Delete Employee',
    value: 'DELETE_EMPLOYEE'
  },
  new inquirer.Separator(),
  {
    name: 'Back',
    value: 'BACK'
  }

]

const methods = {
  ALL_EMPLOYEES: function (connection) {
    console.log('Call All Employees')
  },
  EMPLOYEE_BY_DEPARTMENT: async function (connection) {
    console.log('Calls Employees By Department')
    // return 'same'
  },
  DELETE_EMPLOYEE: function(connection) {
    console.log('Calls Delete Employee)
  },
  BACK: async function () {
    return 'top'
  }
}

module.exports = {
  choices,
  methods
}
