import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, AppBar, Toolbar, Button, ButtonGroup, Link } from '@mui/material';

import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

const theme = createTheme();

export const App = () => {
  useEffect(() => {
    fetch('http://127.0.0.1:8084/api/users/current_user', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    fetch('http://127.0.0.1:8084/api/jobs', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppBar position="static" elevation={0} color="primary">
          <Toolbar>
            <ButtonGroup variant="contained" color="inherit">
              <Button>
                <Link href="/" underline="none" variant="button">
                  Home
                </Link>
              </Button>
              <Button>
                <Link href="/login" underline="none" variant="button">
                  Login
                </Link>
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
