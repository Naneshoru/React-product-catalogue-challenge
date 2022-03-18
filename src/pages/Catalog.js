import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import GridCardItem from "../components/GridCardItem";

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";
import { formatCurrency, variableNameToText } from "../utils/Functions";

function CatalogPage() {
  const { catalog, getCategoriesList } = useCatalog();
  const { cart, getItemsQuantity } = useCart();

  const cartNItems = getItemsQuantity();
  const cartTotal = formatCurrency(cart?.total);

  const categories = getCategoriesList();

  return (
    <MainLayout
      pageTitle="Produtos"
      footerLabel={`${cartTotal} (${cartNItems} itens)`}
    >
      <Box sx={{ p: 2, pb: 4, flex: 1 }}>
        <Grid container>
          {categories.map((category) => ( //cada category é só uma chave
            <Fragment key={category}>
              <Typography variant="h6" component="div" sx={{px: 2, pt: 6, pb: 2, width: "100%", fontWeight: "bold"}}>
                {variableNameToText(category)}
              </Typography>
              {catalog?.products?.categories[category].map((item) => 
                <GridCardItem item={item} key={item.name} />
              )}
            </Fragment>
          ))}
        </Grid>
      </Box>
      
    </MainLayout>
  );
}

export default CatalogPage;
