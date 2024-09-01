import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import PropTypes from "prop-types";

const ProductCard = ({ item }) => {
  return (
    <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
      <Paper
        elevation={3}
        sx={{
          cursor: "pointer",
          height: "100%",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
          // Additional styles for accessibility and design
          ":focus": {
            outline: "3px solid #3f51b5", // Accessible focus outline
          },
        }}
      >
        <img src={item.image} alt="bag" className="img" />

        <Box paddingX={1}>
          <Typography variant="subtitle1" component="h2">
            {item.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            marginTop={2}
          >
            <Rating
              name="read-only"
              value={item.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" component="p" marginLeft={0.5}>
              {item.rating}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography variant="body2" component="p" marginTop={1}>
              LKR
            </Typography>
            <Typography variant="h6" component="h3" marginLeft={0.2}>
              {item.price}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid2>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired, 
  }).isRequired,
};

export default ProductCard;
