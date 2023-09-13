import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';

import { NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import logoUrl from '../../assets/logo.svg';

import UserContext from '../../context/UserContext';
import Cart from '../../pages/Cart';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import OrderDetails from '../../pages/OrderDetails';
import Orders from '../../pages/Orders';
import Products from '../../pages/Products';
import SignUp from '../../pages/SignUp';

const drawerWidth = 200;

export default function ClippedDrawer() {
  const contextData = useContext(UserContext);
  const { userState, setUserState, cart } = contextData;

  return (
    <Box sx={{ display: 'flex' }}>
      <Router>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          className="!bg-cloudthat-blue"
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              <img src={logoUrl} alt="CloudThat" className=" h-6" />
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h6" noWrap>
              <div className="flex justify-center items-center">
                <div className="px-2">{userState.user && `Welcome ${userState.user}` + ' '}</div>
                <div className="px-2 border-2 border-white rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500">
                  {userState.user ? (
                    <NavLink
                      style={{
                        textDecoration: 'none',
                      }}
                      onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        setUserState({});
                        window.location.href = '/';
                      }}
                      to="/"
                      className="flex flex-row"
                    >
                      Logout
                    </NavLink>
                  ) : (
                    <NavLink
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                      }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>

        {userState.user && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <List>
              <ListItem
                component={NavLink}
                exact
                sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                activeClassName="Mui-selected"
                to="/"
                className="hover:!bg-cloudthat-blue hover:text-white"
              >
                <ListItemText primary="Home" />
              </ListItem>{' '}
              <ListItem
                component={NavLink}
                exact
                sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                activeClassName="Mui-selected"
                to="/products"
                className="hover:!bg-cloudthat-blue hover:text-white"
              >
                <ListItemText primary="Products" />
              </ListItem>{' '}
              <ListItem
                component={NavLink}
                sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                activeClassName="Mui-selected"
                className="hover:!bg-cloudthat-blue hover:text-white"
                to="/cart"
              >
                <ListItemText primary={`Cart (${cart.length})`} />
              </ListItem>
            </List>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {userState.user && userState.token ? (
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route path="/orders/:id">
                <OrderDetails />
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          )}
        </Box>
      </Router>
    </Box>
  );
}
