import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';

function Cart() {
  const contextData = useContext(UserContext);
  const { userState, setUserState, cart, setCart } = contextData;
  const [displayCart, setDisplayCart] = useState([]);

  useEffect(() => {
    setDisplayCart(cart);
    getRedisCart(cart);
  }, [cart]);

  const getRedisCart = async (cartValues) => {
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
      })
        .then((res) => res.json())
        .then((data) => {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Grid
        sx={{ maxWidth: '1000px', margin: '0 auto' }}
        container
        spacing={3}
        justify="flex-start"
        alignItems="stretch"
      >
        {displayCart?.map((product) => (
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
                      const newCart = cart.filter((item) => item.id !== product.id);
                      setCart(newCart);
                    }}
                  >
                    Remove from cart
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Cart;
