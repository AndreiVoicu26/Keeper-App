import "dotenv/config";
import express from "express";
import passport from "passport";
import initializeApp from "./middlewares/AppMiddlewares.js";
import initializePassport from "./middlewares/PassportMiddlewares.js";
import authRoutes from "./routes/AuthRoutes.js";
import notesRoutes from "./routes/NotesRoutes.js";

const app = express();

initializeApp(app);
initializePassport(passport);

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

app.listen(8080, () => {
  console.log("Server started on port 8080.");
});
