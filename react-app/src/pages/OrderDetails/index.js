import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export default function OrderDetails() {
  const match = useRouteMatch();

  const [hasErrors, setErrors] = useState(false);
  const [order, setOrder] = useState({});

  const orderId = match.params.id;

  async function fetchOrder(orderId) {
    try {
      const response = await fetch(`${process.env.REACT_APP_ORDERS_URL}/${orderId}`);
      const order = await response.json();
      setOrder(order);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {hasErrors && (
        <Paper
          elevation={3}
          sx={{
            background: '#f99',
            padding: (theme) => theme.spacing(3, 2),
          }}
        >
          <Typography component="p">An error has occurred, please try reloading the page.</Typography>
        </Paper>
      )}
      {!hasErrors && (
        <Paper
          elevation={3}
          sx={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: (theme) => theme.spacing(3, 2),
          }}
        >
          <Grid container spacing={3} justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={12}>
              <Typography variant="h5">{order.id}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography component="p">
                <b>Date: </b>
                {order.date}
              </Typography>
              <Typography component="p">
                <b>Cost: </b>${order.cost}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography component="p">
                <b>Order Items: </b>
              </Typography>
              {order.items && order.items.map((item) => <Typography key={item}>{item}</Typography>)}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
