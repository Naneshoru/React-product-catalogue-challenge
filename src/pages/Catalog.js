import { Box, Grid, Typography } from "@mui/material";
import { Fragment, lazy, Suspense, useEffect } from "react";
import GridCardItem from "../components/GridCardItem";
import { v4 as uuidv4 } from 'uuid'

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";
import { formatCurrency, itemOrItens, variableNameToText } from "../utils/Functions";
import GridCardItemLazy from "../components/GridCardItemLazy";

function CatalogPage() {
  const { catalog, getCatalog, getCategoriesList } = useCatalog();
  const { cart, getItemsQuantity } = useCart();

  const cartNItems = getItemsQuantity();
  const cartTotal = formatCurrency(cart?.total);

  const categories = getCategoriesList();

  useEffect(() => {
    getCatalog().catch(err => console.log(err));
  }, []);

  const skeletonCategory = Array.from({ length: 8 }, () => ({
    name: "",
    imageUrl: "",
    price: "0",
    categoryName: ""
  }));

  return (
    <MainLayout
      pageTitle="Produtos"
      footerLabel={`${cartTotal} (${cartNItems} ${itemOrItens(cartNItems)})`}
    >
      <Box sx={{ p: 2, pb: 4, flex: 1 }}>
        <Grid container>
          {categories 
            ? categories?.map((category, i) => {
                const singleCategory = catalog?.products?.categories?.[category]
                
                return (
                <Fragment key={category}>
                  <Typography component="div" variant="h6" fontSize='1.1em' letterSpacing="0.02em" sx={{m: 2, mt: 5, width: "100%", fontWeight: "bold"}}>
                    {variableNameToText(category)}
                  </Typography>
                  {singleCategory?.map((item) => <Fragment key={uuidv4()}>
                    <GridCardItemLazy item={item} />
                  </Fragment>
                  )}
                </Fragment>
              )})
            : skeletonCategory.map((item) => <Fragment key={uuidv4()}>
              <GridCardItemLazy item={item} />
            </Fragment>
          )}
        </Grid>
      </Box>
    </MainLayout>
  );
}

export default CatalogPage;
