import { Box, Grid, Paper, Typography } from "@mui/material";

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";

function CatalogPage() {
  const { catalog } = useCatalog();
 
  const { cart, addToCart } = useCart();

  const cartNItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = `R$ ${cart.total.toFixed(2)}`;

  const handleClick = (item) => addToCart(item)

  return (
    <MainLayout
      pageTitle="Produtos"
      footerLabel={`${cartTotal} (${cartNItems} itens)`}
    >
      <Box sx={{ p: 2, flex: 1 }}>
        <Grid container>
          {catalog.products.map((elem, index) => (
            <Grid item md={3} px={2} py={1} key={elem.id} onClick={(() => handleClick(elem))}>
              <Box sx={{ 
                p: 1, mt: 2, 
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#CECFD1",
                borderRadius: "10px 10px 0 0",
                height: "180px", 
              }} >
                {/*console.log(elem.imageUrl)*/}
                <Box sx={{
                  px: 1,
                  fontSize: 14,
                  backgroundColor: "primary.main",
                  borderRadius: "40px",
                  color: "white",
                  alignSelf: "flex-end",
                }}>R$ {elem.price}
                </Box>
              </Box>
              <Paper sx={{ p:1, borderRadius: "0 0 10px 10px", height: "60px", boxShadow: 1 }}>
                <Typography fontSize={12} fontWeight="medium">{elem.name}</Typography>
              </Paper>
            </Grid> 
          ))}
        </Grid>
      </Box>
      
    </MainLayout>
  );
}

export default CatalogPage;
