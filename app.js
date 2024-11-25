const express = require("express");
const cors = require("cors");
// TODO: Uncomment Later
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./config/swagger.config");
const { handleError } = require("./src/middlewares/error.middlewares");
const { Database } = require("./src/config");
const {
  AccountRouter,
  ApplicantRouter,
  StudentRouter,
  CollegeRouter,
  ScannerRouter,
  FacultyRouter,
  SubjectRouter,
  RoomRouter,
  RoutineRouter,
  DepartmentRouter,
  CourseRouter,
  CurriculumRouter,
} = require("./src/routers");
const { Response } = require("./src/helpers");
class App {
  app = express();
  port = null;

  constructor() {
    // TODO: uncommect beloew line
    this.app = express();
    this.port = process.env.PORT || 8080;
  }

  configure() {
    const corsOptions = {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://192.168.0.100:3000",
        "http://192.168.0.101:3000",
        "http://192.168.0.102:3000",
        "https://eduversa.github.io",
        "https://eduversa.in",
        "https://www.eduversa.in",
        "https://vidit-eduversa.netlify.app",
        "https://eduversa-vidit.vercel.app",
        "https://eduversa-git-ankur-eduversas-projects.vercel.app",
      ],
      methods: "GET,POST,PUT,DELETE,PATCH,UPDATE,HEAD",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      credentials: true,
    };
    // Section: Middlewares
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    // TODO: Uncomment Later
    // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.use((req, res, next) => {
      console.log("==========================================");
      console.log(`Request: ${req.method} ${req.url}`);
      console.log("------------------------------------------");
      next();
    });
    // Section: Default Routes
    this.app.head("/", (req, res) => {
      console.log("Uptime Robot Hit");
    });
    this.app.get("/connection", async (req, res) => {
      new Response.Ok(res).setMessage("The API is working").send();
    });
    this.app.delete("/connection/reset", async (req, res) => {
      //   clearAllCollections();
    });
    this.app.get("/", (req, res) => {
      res.send({
        status: "working",
        help: [
          "/account/help",
          "/applicant/help",
          "/college/help",
          "/student/help",
          "/permission/help",
          "/faculty/help",
          "/subject/help",
          "/room/help",
          "/department/help",
          "/course/help",
          "/curriculum/help",
          "/routine/help",
        ],
      });
    });

    // Section: Custom Routes
    // User Profiles
    this.app.use("/account", new AccountRouter().configure().getRouter());
    this.app.use("/applicant", new ApplicantRouter().configure().getRouter());
    this.app.use("/student", new StudentRouter().configure().getRouter());
    this.app.use("/faculty", new FacultyRouter().configure().getRouter());
    // College
    this.app.use("/college", new CollegeRouter().configure().getRouter());
    this.app.use("/subject", new SubjectRouter().configure().getRouter());
    this.app.use("/room", new RoomRouter().configure().getRouter());
    this.app.use("/department", new DepartmentRouter().configure().getRouter());
    this.app.use("/course", new CourseRouter().configure().getRouter());
    this.app.use("/curriculum", new CurriculumRouter().configure().getRouter());
    // Features
    this.app.use("/scanner", new ScannerRouter().configure().getRouter());
    this.app.use("/routine", new RoutineRouter().configure().getRouter());

    // Section: Error Handlers
    this.app.use(handleError);
  }

  async start() {
    try {
      const database = new Database();
      await database.connect();
      if (!database.getConnection()) {
        throw new Error("No Database Connected");
      }
      this.app.listen(this.port, () => {
        console.log("Server is listening on port: " + this.port);
      });
    } catch (error) {
      console.log("Error - App - Start");
      console.log(error);
    }
  }
}
module.exports = App;
