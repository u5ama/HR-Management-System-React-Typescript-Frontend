import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Image,
} from '@mantine/core';

import viteLogo from '@images/vite.svg';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1667039596264-7424fa636a26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)',
  },

  form: {
    height: '100vh',
    width: 450,
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

function Login() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  return (
    <main className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Image src={viteLogo} alt='logo' width={128} mx='auto' />

        <Title order={2} align='center' mt='md' mb={50}>
          Welcome back to HRME!
        </Title>

        <TextInput
          label='Email address'
          placeholder='hello@gmail.com'
          size='md'
        />

        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          size='md'
        />

        <Anchor<'a'>
          onClick={(event) => event.preventDefault()}
          href='#'
          size='sm'
          mt='md'
        >
          Forgot password?
        </Anchor>

        <Button fullWidth mt='xl' size='md' onClick={() => navigate('/')}>
          Login
        </Button>

        <Text align='center' mt='md'>
          Don&apos;t have an account?{' '}
          <Anchor<'a'>
            href='#'
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </main>
  );
}

export default Login;
