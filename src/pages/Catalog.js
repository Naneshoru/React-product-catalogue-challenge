import { Box, Grid, Paper, Typography } from "@mui/material";

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";

function CatalogPage() {
  const { catalog } = useCatalog();
 
  const { cart, addToCart } = useCart();

  const cartNItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = `R$ ${cart.total.toFixed(2).replace('.', ',')}`;

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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 1, mt: 2,
                height: "180px", 
                backgroundColor: "#CECFD1",
                borderRadius: "10px 10px 0 0",
              }} >
                {/*console.log(elem.imageUrl)*/}
                <Box sx={{
                  visibility: elem.quantity ? "visible" : "hidden",
                  alignSelf: "flex-end",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  height: "40px", width: "40px", 
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: 16,
                }}>
                  {elem.quantity}
                </Box>
                <Box sx={{
                  alignSelf: "flex-end",
                  px: 1,
                  backgroundColor: "primary.main",
                  borderRadius: "40px",
                  color: "white",
                  fontSize: 14,
                }}>R$ {elem.price.replace('.', ',')}
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
