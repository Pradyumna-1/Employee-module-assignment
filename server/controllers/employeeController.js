const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.getById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { title, firstName, lastName, email, role, password } = req.body;
    
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const employeeId = await Employee.create({
      title,
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword
    });

    res.status(201).json({ id: employeeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { title, firstName, lastName, email, role, password } = req.body;
    
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await Employee.update(req.params.id, {
      title,
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword
    });

    if (result === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};