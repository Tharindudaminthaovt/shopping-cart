const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173"], // Allow requests only from this origin
};

app.use(cors(corsOptions));
app.use(express.json());

const productRoutes = require("./router/products");
const categoryRoutes = require("./router/categories");

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
