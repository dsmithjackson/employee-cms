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
  ALL_EMPLOYEES: async function (connection, ask) {
    const query = 'SELECT e.id, e.first_name, e.last_name, d.name, r.title, r.salary, e.manager_id FROM employee e INNER JOIN role r ON r.id = e.role_id INNER JOIN department d ON d.id = r.department_id'
    
    // TODO: Abstract this out later
    const res = new Promise(function(resolve, reject) {
      connection.query(query, (err, res, fields) => {
        if (err) throw err
        resolve(res)
      })
    })
      .then((result) => {
        console.table(result)
        return 'same'
      })

    return res
  },
  EMPLOYEE_BY_DEPARTMENT: async function (connection, ask) {

    // return 'same'
  },
  DELETE_EMPLOYEE: async function(connection, ask) {
    const employeeListQuery = 'SELECT * FROM employee'
    connection.query(employeeListQuery, (err, res, fields) => {
      if (err) throw err
      console.log('list', res)

      const employeeList = []
      res.forEach(employee => {
        employeeList.push({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        })
      });

      console.log(employeeList)

      const employeeListQuestion = {
        type: 'list',
        name: 'whichEmployee',
        message: 'Which Employee to Delete',
        choices: employeeList
      }

      inquirer.prompt([employeeListQuestion]).then((answer) => {
        connection.query('DELETE FROM employee WHERE id = ?', answer.whichEmployee, (err, rows, fields) => {
          if (err) throw err
          console.log(rows)
          ask()
        })
      })
    })
  },
  BACK: async function () {
    return 'top'
  }
}

module.exports = {
  choices,
  methods
}
