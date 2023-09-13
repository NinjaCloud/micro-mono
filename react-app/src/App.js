
import React, { useEffect, useState } from 'react';

import ClippedDrawer from './components/ClippedDrawer';
import UserContext from './context/UserContext';

function App() {
  const [userState, setUserState] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    updateUserDetails();
  }, []);

  useEffect(() => {
    if (userState.user) {
      getCachedCart();
    }
  }, [userState]);

  const getCachedCart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_CART_GET_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userState.user,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setCart(data);
          } else {
            setCart([]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserDetails = () => {
    const localUser = localStorage.getItem('user');
    const userToken = localStorage.getItem('token');
    if (localUser && userToken) {
      setUserState({ user: JSON.parse(localUser), token: userToken });
    }
  };

  return (
    <UserContext.Provider value={{ userState, setUserState, cart, setCart }}>
      <ClippedDrawer />
    </UserContext.Provider>
  );
}

export default App;
