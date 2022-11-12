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
import splashImage from '@images/login-page-splash.jpg';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '@hooks/useAuthUser';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from 'src/App';

const useStyles = createStyles(_theme => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${splashImage})`,
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

function LoginPage() {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const user = useAuthUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(AuthContext)!;

  useEffect(() => {
    if (user)
      navigate('/', {
        replace: true,
      });
  }, [navigate, user]);

  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().min(1, { message: 'Please enter a password' }),
  });

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: zodResolver(formSchema),
  });

  const formSubmitHandler = useCallback(
    async (values: typeof form.values) => {
      setLoading(true);

      const response = await axios.post('/login', values);

      if (!response.data.success) setError(response.data.message);
      else {
        setError(null);

        localStorage.setItem('user', JSON.stringify(response.data));

        setUser(response.data);
      }
      setLoading(false);
    },
    [form, setUser]
  );

  return (
    <main className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Image src={viteLogo} alt="logo" width={128} mx="auto" />

        <Title order={2} align="center" mt="md" mb={50}>
          Welcome back to HRME!
        </Title>

        <form onSubmit={form.onSubmit(formSubmitHandler)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps('password')}
          />

          <Anchor<'a'>
            onClick={event => event.preventDefault()}
            href="#"
            size="sm"
            mt="md"
          >
            Forgot password?
          </Anchor>

          <Text color="red" align="right">
            {error}
          </Text>

          <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
            Login
          </Button>
        </form>

        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'>
            href="#"
            weight={700}
            onClick={event => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </main>
  );
}

export default LoginPage;
