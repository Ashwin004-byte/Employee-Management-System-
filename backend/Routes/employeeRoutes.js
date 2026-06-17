const express = require("express");

const router = express.Router();

const Employee = require("../Models/Employee");


// GET ALL EMPLOYEES

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ADD EMPLOYEE

router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);

    await employee.save();

    res.status(201).json({
      message: "Employee Added Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE EMPLOYEE

router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE EMPLOYEE

router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;