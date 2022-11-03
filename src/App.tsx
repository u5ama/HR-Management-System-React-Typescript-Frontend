import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1667039596264-7424fa636a26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: '100vh',
    maxWidth: 450,
    paddingTop: 80,
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function App() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align='center' mt='md' mb={50}>
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
        <Checkbox label='Keep me logged in' mt='xl' size='md' color='orange' />
        <Button fullWidth mt='xl' size='md' color='orange'>
          Login
        </Button>

        <Text align='center' mt='md'>
          Don&apos;t have an account?{' '}
          <Anchor<'a'>
            href='#'
            weight={700}
            onClick={(event) => event.preventDefault()}
            color='orange'
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
