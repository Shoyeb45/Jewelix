import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();

// Configuring CORS
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

// Linking 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Linking frontend
app.use(express.static(path.join(__dirname, "./../../frontend")));


// Fallback route for index.html in case of client-side routing
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./../../frontend/index.html"));
// });

app.use(express.json({
    limit: "20kb"
}));


app.use(bodyParser.json());
// When recieving data through URL, url encodes data in different format, so while receiving it, we need to tell app, the it is url encoded
app.use(express.urlencoded({
    extended: true,
    limit: "20kb" 
}));

// For static pages and files - most of time, we'll use public folder to store the static files
app.use(express.static(path.join(__dirname, "./../../frontend")));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../frontend/index.html"));
});





// ------------ Routes -----------------
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import authLogin from "./routes/auth.route.js";

// User api
app.use("/api/v1/user", userRouter);

// product admin api
app.use("/api/v1/product", productRouter);
app.use("/api/auth", authLogin);

export default app;