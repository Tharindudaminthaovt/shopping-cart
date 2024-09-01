import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Typography } from "@mui/material";

import { useState, useContext, useEffect } from "react";
import { CategoryContext } from "../../App";
import axios from "axios";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const { setCategory } = useContext(CategoryContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSelectedCategory = (category) => {
    //setting the value to send to App component to validate the output
    setCategory(category);
    setOpen(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories/");
      setCategoryList(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
   
      <IconButton
        size="large"
        edge="start"
        color="success"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        sx={{
          ml: 2,
          mt: 12,
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "4px",
          padding: "5px",
          transition: "transform 0.3s ease, background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#1976d2",

            transform: "scale(1.1)",
          },
        }}
      >
        <MenuIcon sx={{ mr: 1 }}/>
        <Typography>Categories</Typography>
      </IconButton>
     
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {categoryList.map((category) => (
            <ListItem key={category.id}>
              <ListItemButton
                onClick={() => handleSelectedCategory(category.name)}
              >
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
