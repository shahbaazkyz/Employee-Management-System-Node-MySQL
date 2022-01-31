const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

//Routes
app.use("/api/designations", require("./api/routes/designationRoutes"));
app.use("/api/employees", require("./api/routes/employeeRoutes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
