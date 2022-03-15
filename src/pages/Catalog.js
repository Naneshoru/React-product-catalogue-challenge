import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import GridCardItem from "../components/GridCardItem";

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";

function CatalogPage() {
  const { catalog } = useCatalog();

  useEffect(() => {
    catalog.products.sort((a, b) => {
      if (a.categoryName > b.categoryName) return 1;
      if (a.categoryName < b.categoryName) return -1;
      return 0;
    });
  }, [catalog]);
 
  const { cart, addToCart, getItemsQuantity, formatCurrency } = useCart();

  const cartNItems = getItemsQuantity();
  const cartTotal = formatCurrency(cart.total);

  const handleClick = (item) => addToCart(item);

  return (
    <MainLayout
      pageTitle="Produtos"
      footerLabel={`${cartTotal} (${cartNItems} itens)`}
    >
      <Box sx={{ p: 2, pb: 4, flex: 1 }}>
        <Grid container>
          {catalog.products.map((elem, index) => (
            <Fragment key={elem.id}>
              {elem.categoryName !== catalog.products[index-1]?.categoryName && 
              <Typography variant="h6" component="div" sx={{px: 2, pt: 6, pb: 2, width: "100%", fontWeight: "bold"}}>
                {elem.categoryName}
              </Typography>}
              <Grid item md={3} px={2} py={1} key={elem.id} onClick={(() => handleClick(elem))}>
                <GridCardItem item={elem} />
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
      
    </MainLayout>
  );
}

export default CatalogPage;
