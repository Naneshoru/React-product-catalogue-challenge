import { Box, Grid, Paper, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";

function CatalogPage() {
  const { catalog } = useCatalog();
  console.log(catalog)
 
  const { cart, addToCart } = useCart();

  console.log(cart)

  const cartNItems = cart.items.length;
  const cartTotal = `R$ ${cart.total.toFixed(2)}`;

  // const handleClick = () => {
  //   addToCart()
  // }

  return (
    <MainLayout
      pageTitle="Produtos"
      footerLabel={`${cartTotal} (${cartNItems} itens)`}
    >
      <Box sx={{ p: 2, flex: 1 }}>
        {/* <Typography variant="h6" fontWeight="bold">{{}}</Typography> */}
        
        <Grid container>
          {catalog.products.map((elem, index) => (
            <Grid item md={3} px={2} py={1}>
              <Box sx={{ p: 2, mt: 2, 
                height: "180px", 
                // background: `url(${elem.imageUrl})`,
                backgroundColor: "#CECFD1",
                borderRadius: "10px 10px 0 0"}} >
              </Box>
              <Paper sx={{ p:1, borderRadius: "0 0 10px 10px", height: "60px" }}>
                <Typography variant="body2">{elem.name}</Typography>
              </Paper>
            </Grid> 
          ))}
        </Grid>
      </Box>
      
    </MainLayout>
  );
}

export default CatalogPage;
