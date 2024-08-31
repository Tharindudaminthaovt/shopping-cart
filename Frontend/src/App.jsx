import { Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./Components/ProductCard/ProductCard";
import SearchAppBar from "./Components/SearchAppBar/SearchAppBar";
import SideBar from "./Components/SideBar/SideBar";
import Footer from "./Components/Footer/Footer";
import "./App.css";

export const CategoryContext = createContext("");

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/");
      setItems(response.data);
    } catch (err) {
      console.error("Error fetching products: ", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      search.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <CategoryContext.Provider value={{ category, setCategory }}>
        <SearchAppBar setSearch={setSearch} />
        <Box>
          <SideBar />
        </Box>
        <Container sx={{ marginY: 5 }}>
          {filteredItems.length > 0 ? (
            <Grid2
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {filteredItems.map((item, index) => (
                <ProductCard item={item} key={index} />
              ))}
            </Grid2>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h6" align="center">
                No items found
              </Typography>
            </Box>
          )}
        </Container>
        <Footer />
      </CategoryContext.Provider>
    </>
  );
}

export default App;
