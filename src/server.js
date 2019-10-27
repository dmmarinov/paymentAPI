import express from "express";
import bodyParser  from "body-parser";
import { promisify } from "util";

import { errorHandler } from "./services/errorHandler";

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/v1/authenticate", require("./routes/api/v1/authenticate"));
app.use("/v1/", require("./routes/api/v1/payments"));
app.use(errorHandler);

const startServer = async () => {
    const port = process.env.port || 3000;

    await promisify(app.listen).bind(app)(port);
    console.log(`Server is running on port ${port}`);
};

startServer();