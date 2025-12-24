import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from './routes/authRoutes.js'



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use('/api/auth', authRoutes)

app.get("/", (req, res) => {
  res.send("Backend Portfolio API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
