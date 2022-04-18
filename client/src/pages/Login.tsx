import { useState } from 'react';
import { Avatar, Button, Container, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../common/AuthContext';
import { Navigate } from 'react-router-dom';

const emailPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const { isSignedIn, signIn } = useAuth();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setIsError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsError(false);
  };

  const handleLogin = () => {
    // Validate username as email
    if (emailPattern.test(username)) {
      alert(`username entered: ${username}\npassword: ${password}`);
      signIn();
    } else {
      setIsError(true);
    }
  };

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Avatar sx={{ bgcolor: 'error.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1">Sign in</Typography>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            required
            fullWidth
            type="email"
            error={isError}
            onChange={handleUsernameChange}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            required
            fullWidth
            type="password"
            error={isError}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" onClick={handleLogin}>
            Sign in
          </Button>
          <Link href="/signup" variant="body2">
            Don&apos;t have an account? Sign up
          </Link>
        </Stack>
      </Paper>
    </Container>
  );
};
