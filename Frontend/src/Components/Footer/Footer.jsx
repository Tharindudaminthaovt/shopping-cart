import { Box, Typography, Container, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="lg" color="primary">
        <Typography variant="body2" color="white" align="center">
          © ShoppingCart || Tharindu Damintha
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
