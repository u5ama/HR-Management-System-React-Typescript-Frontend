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
import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useCallback, useState } from 'react';

const useStyles = createStyles(_theme => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${splashImage})`,
  },

  formWrapper: {
    height: '100vh',
    width: 450,
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

function LoginPage() {
  const { classes } = useStyles();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

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

      await login(values.email, values.password);

      setLoading(false);
    },
    [form, login]
  );

  if (user) return <Navigate to="/" replace />;
  else
    return (
      <main className={classes.wrapper}>
        <Paper className={classes.formWrapper} radius={0} p={30}>
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
