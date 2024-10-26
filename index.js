require("dotenv").config();
const App = require("./app");

// app.use("/account", accountRouter);
// app.use("/applicant", applicantRouter);
// app.use("/college", collegeRouter);
// app.use("/student", studentRouter);
// app.use("/permission", permissionRouter);
// app.use("/scanner", scannerRouter);
// app.use("/routine", routineRouter);

const server = new App();
server.configure();
server.start();
