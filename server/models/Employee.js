const pool = require('../config/db');

class Employee {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM employees');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(employee) {
    const { title, firstName, lastName, email, role, password } = employee;
    const [result] = await pool.query(
      'INSERT INTO employees (title, first_name, last_name, email, role, password) VALUES (?, ?, ?, ?, ?, ?)',
      [title, firstName, lastName, email, role, password]
    );
    return result.insertId;
  }

  static async update(id, employee) {
    const { title, firstName, lastName, email, role, password } = employee;
    const query = password 
      ? 'UPDATE employees SET title = ?, first_name = ?, last_name = ?, email = ?, role = ?, password = ? WHERE id = ?'
      : 'UPDATE employees SET title = ?, first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?';
    
    const params = password
      ? [title, firstName, lastName, email, role, password, id]
      : [title, firstName, lastName, email, role, id];
    
    const [result] = await pool.query(query, params);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Employee;