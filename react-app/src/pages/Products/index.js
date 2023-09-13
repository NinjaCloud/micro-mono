import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';

export default function Products() {
  const [hasErrors, setErrors] = useState(false);
  const [products, setProducts] = useState([]);
  const contextData = useContext(UserContext);
  const { userState, cart, setCart } = contextData;

  async function fetchData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCTS_URL}`);
      const products = await response.json();
      setProducts(products);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    cacheCart(newCart);
  };

  const cacheCart = async (cartValues) => {
    try {
      await fetch(`${process.env.REACT_APP_CART_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userState.user,
          cart: cartValues,
        }),
      }).then((res) => {});
    } catch (err) {
      console.log(err);
    }
  };

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
        <Grid
          sx={{ maxWidth: '1000px', margin: '0 auto' }}
          container
          spacing={3}
          justify="flex-start"
          alignItems="stretch"
        >
          {products.map((product) => {
            return (
              <Grid key={product.id} item md={4} xs={12}>
                <Card className="border border-cloudthat-blue">
                  <CardMedia sx={{ height: 0, paddingTop: '56.25%' }} image={product.picture} title={product.name} />
                  <CardContent>
                    <Typography variant="body1">
                      {product.name} - ${product.cost}
                    </Typography>
                  </CardContent>

                  <div className="bg-cloudthat-blue hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer">
                    <div className="flex justify-center items-center">
                      <div
                        className="flex justify-center items-center p-2 text-white"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        Add to cart
                      </div>
                    </div>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
