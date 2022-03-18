import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useCart } from '../models/Cart';
import { formatCurrency, removeZerosCurrency } from '../utils/Functions';

const GridCardItem = ({ item }) => {
  const { addToCart } = useCart();

  const handleClick = (item) => addToCart(item);

  return (
    <Grid item md={3} px={2} py={1} key={item.id} component="div" onClick={(() => handleClick(item))}>
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1, mt: 2,
          height: "180px",
          backgroundColor: "#CECFD1",
          borderRadius: "10px 10px 0 0",
          backgroundImage: "url(" + require(`../assets/${item?.imageUrl.split('./')[1]}`).default + ")",
          backgroundPosition: 'center center no-repeat',
          backgroundSize: 'cover',
        }} 
      >
        <Box 
          sx={{
            visibility: item.quantity ? "visible" : "hidden",
            alignSelf: "flex-end",
            display: "flex", justifyContent: "center", alignItems: "center",
            height: "40px", width: "40px",
            backgroundColor: "primary.main",
            borderRadius: "50%",
            color: "white",
            fontSize: 16,
          }}
        >
          {item.quantity}
        </Box>
        <Box 
          sx={{
            alignSelf: "flex-end",
            px: 1,
            backgroundColor: "primary.main",
            borderRadius: "40px",
            color: "white",
            fontSize: 14,
          }}
        >{removeZerosCurrency(formatCurrency(item.price))}
        </Box>
      </Box>
      <Paper component="div"
        sx={{ p:1, borderRadius: "0 0 10px 10px", height: "60px", boxShadow: "2px 2px 16px 2px rgba(0, 0, 0, 0.1)" }}>
        <Typography fontSize={12} fontWeight="medium" >
          {item.name}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default GridCardItem;