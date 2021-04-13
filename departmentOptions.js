const inquirer = require('inquirer')

const choices = [
  {
    name: 'View All Departments',
    value: 'ALL_DEPARTMENTS'
  },
  new inquirer.Separator(),
  {
    name: 'Back',
    value: 'BACK'
  }

]

const methods = {
  ALL_DEPARTMENTS: function (connection) {
    const query = 'SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", r.salary AS "Salary", d.name AS "Department" FROM employee e LEFT JOIN role r ON e.role_id=r.id LEFT JOIN department d ON r.department_id=d.id'
    // connection.query(query, (err, result, fields) => {
    //   if (err) {
    //     console.log('Error Getting Records')
    //     throw err
    //   }
    //   console.log(result)
    //   return true
    // })
  },
  BACK: async function () {
    return 'top'
  }
}

module.exports = {
  choices,
  methods
}
