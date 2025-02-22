import { Box, Grid, Typography } from "@mui/material";
import { Fragment, memo, useEffect, useMemo, useCallback } from "react";

import { v4 as uuidv4 } from 'uuid'

import MainLayout from "../layouts/Main";

import { useCart } from "../models/Cart";
import { useCatalog } from "../models/Catalog";
import { formatCurrency, itemOrItens, variableNameToText } from "../utils/Functions";
import GridCardItemLazy from "../components/GridCardItemLazy";

const CatalogPage = memo(function CatalogPage() {
  const { catalog, getCatalog, getCategoriesList } = useCatalog();
  const { getItemTotal, getItemsQuantity } = useCart();

  const categories = useMemo(() => getCategoriesList(), [getCategoriesList]);

  const cartNItems = useMemo(() => getItemsQuantity(), [getItemsQuantity]);
  const cartTotal = useMemo(() => formatCurrency(getItemTotal()), [getItemTotal]);

  useEffect(() => {
    getCatalog().catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoriesMemo = useMemo(() => catalog?.products?.categories, [catalog])
 
  const skeletonCategoryMemo = useMemo(() => {
    const skeletonCategory = Array.from({ length: 8 }, () => ({
      id: uuidv4(),
      name: "",
      imageUrl: "",
      price: "0",
      categoryName: ""
    }));
    return skeletonCategory.map((item) => (
      <Fragment key={item.id}>
        <GridCardItemLazy item={item} />
      </Fragment>
    ));
  }, [])

  return (
    <MainLayout
      pageTitle="Produtos"
      footerLabel={`${cartTotal} (${cartNItems} ${itemOrItens(cartNItems)})`}
    >
      <Box sx={{ p: 2, pb: 4, flex: 1 }}>
        <Grid container>
          {categories 
            ? categories.map((category, i) => {
                return (
                  <Fragment key={category}>
                    <Typography component="div" variant="h6" fontSize='1.1em' letterSpacing="0.02em" sx={{m: 2, mt: 5, width: "100%", fontWeight: "bold"}}>
                      {variableNameToText(category)}
                    </Typography>
                    {categoriesMemo[category]?.map((item) => (
                      <Fragment key={item.id}>
                        <GridCardItemLazy item={item} />
                      </Fragment>
                    ))}
                  </Fragment>
                );
              })
            : skeletonCategoryMemo}
        </Grid>
      </Box>
    </MainLayout>
  );
});

export default CatalogPage;
