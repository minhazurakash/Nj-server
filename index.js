const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { connectToServer } = require('./utils/dbConnect');
const projectsRoutes = require("./routes/v1/projects.route");
const slidersRoutes = require("./routes/v1/sliders.route");
const blogsRoutes = require('./routes/v1/blogs.route');
const instagramRoutes = require('./routes/v1/instagrams.route');
const userRouter = require('./routes/v1/users.route');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())
app.use(fileUpload())

connectToServer((err) => {
    if (!err) {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    } else {
      console.log(err);
    }
  });

  app.get('/', (req, res) => {
    res.send('Running server')
  });
  app.use("/api/v1/project", projectsRoutes);
  app.use("/api/v1/slider", slidersRoutes);
  app.use("/api/v1/blog", blogsRoutes);
  app.use("/api/v1/instagram", instagramRoutes);
  app.use("/api/v1/user", userRouter);



app.all("*", (req, res) => {
  res.send("No route found.");
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});