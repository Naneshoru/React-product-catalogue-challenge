import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import GridCardItem from "../components/GridCardItem";

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";
import { formatCurrency, variableNameToText } from "../utils/Functions";

function CatalogPage() {
  const { catalog } = useCatalog();
  const { cart, addToCart, getItemsQuantity } = useCart();

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
          {Object.keys(catalog.products.categories).map((category) => ( //cada category é só uma chave
            <Fragment key={category}>
              <Typography variant="h6" component="div" sx={{px: 2, pt: 6, pb: 2, width: "100%", fontWeight: "bold"}}>
                {variableNameToText(category)}
              </Typography>
              {catalog.products.categories[category].map((item) => (
                <Grid item md={3} px={2} py={1} key={item.id} onClick={(() => handleClick(item))}>
                  <GridCardItem item={item} />
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Box>
      
    </MainLayout>
  );
}

export default CatalogPage;
