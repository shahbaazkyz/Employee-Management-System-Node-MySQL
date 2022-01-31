const router = require("express").Router();
const db = require("../models");

const Designation = db.designations;

//* Create Designation
router.post("/insert", async (req, res) => {
  const { name, salary } = req.body;
  try {
    const designation = await Designation.create({ name, salary });
    res.status(201).send(designation);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Get Designations
router.get("/", async (req, res) => {
  try {
    const designation = await Designation.findAll({
      order: [["name", "ASC"]],
    });
    res.status(200).send(designation);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Get single designation
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id");
  try {
    const designation = await Designation.findOne({
      where: { id },
    });
    if (!designation) {
      return res.status(404).send("Designation not found");
    }
    res.status(200).send(designation);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Delete Designation
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const designation = await Designation.destroy({
      where: { id },
    });
    if (!designation) {
      return res.status(404).send("Designation not found");
    }
    res.status(200).send("Designation deleted successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Update Designation
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const designation = await Designation.update(
      { name, salary },
      { where: { id } }
    );
    if (!designation) {
      return res.status(404).send("Designation not found");
    }
    res.status(200).send("Designation updated successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Get Designation by name
router.get("/findByName/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const designation = await Designation.findOne({
      where: { name },
    });
    if (!designation) {
      return res.status(404).send("Designation not found");
    }
    res.status(200).send(designation);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* Pagination of Designations
router.get("/paginate", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const designation = await Designation.findAndCountAll({
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [["name", "ASC"]],
    });
    res.status(200).send(designation);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
