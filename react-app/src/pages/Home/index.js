import { Box, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

export default function Home() {
  const contextData = useContext(UserContext);

  const { userState } = contextData;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Paper
          elevation={3}
          sx={{
            width: '800px',
            margin: '0 auto',
            padding: (theme) => theme.spacing(3, 2),
          }}
        >
          <Typography variant="h5">Welcome to the Cloud Shop!</Typography>
          <br />
          {userState.user && userState.token ? (
            <>
              <Typography variant="body1">You are logged in as {userState.user}.</Typography>
              <br />
              <Typography variant="body1">Take a look at our wide variety of products.</Typography>
              <div className="flex">
                <button
                  onClick={() => (window.location.href = '/products')}
                  className="btn bg-cloudthat-blue mx-auto rounded-md p-2 text-white w-full"
                >
                  Products
                </button>
              </div>
            </>
          ) : (
            <>
              <Typography variant="body1">You are not logged in.</Typography>
              <button onClick={() => (window.location.href = '/login')}>Login</button>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
}
