import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Orders() {
  const history = useHistory();

  const [hasErrors, setErrors] = useState(false);
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await fetch(`${process.env.REACT_APP_ORDERS_URL}`);
      const orders = await response.json();
      setOrders(orders);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

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
          <Typography variant="h5">Orders</Typography>
          <Table sx={{ minWidth: '650px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Items</TableCell>
                <TableCell>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  sx={{ cursor: 'pointer' }}
                  key={order.id}
                  onClick={() => {
                    history.push(`/orders/${order.id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{(order.items && order.items.length) || 0}</TableCell>
                  <TableCell>${order.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
