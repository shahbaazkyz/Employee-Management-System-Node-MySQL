const router = require("express").Router();
const db = require("../models");

const Employee = db.employees;

//* Create Employee
router.post("/insert", async (req, res) => {
  const { name, age, gender, email, phone, designationName, shift } = req.body;
  try {
    const employee = await Employee.create({
      name,
      age,
      gender,
      email,
      phone,
      designationName,
      shift,
    });
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Show all employees
router.get("/", async (req, res) => {
  try {
    const employee = await Employee.findAll({
      order: [["name", "ASC"]],
    });
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Get Employee
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({
      where: { id },
    });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Get employee by designation
router.get("/findByDesignation/:designationName", async (req, res) => {
  const { designationName } = req.params;
  try {
    const employee = await Employee.findAll({
      where: { designationName },
    });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Get salary from designation table on the basis of designation name
router.get("/findSalary/:designationName", async (req, res) => {
  const { designationName } = req.params;
  try {
    const designation = await db.designations.findOne({
      where: { name: designationName },
    });
    if (!designation) {
      return res.status(404).send("Designation not found");
    }
    res.status(200).send(designation);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Update employee
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.update(req.body, {
      where: { id },
    });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Count employees by designation
router.get("/countByDesignation/:designationName", async (req, res) => {
  const { designationName } = req.params;
  try {
    const employee = await Employee.findAndCountAll({
      where: { designationName },
    });
    if (!employee) {
      return res.status(404).json("Employee not found");
    }
    console.log(employee);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).send("error");
  }
});

//* Delete employee
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.destroy({
      where: { id },
    });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
