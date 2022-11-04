import {
  Paper,
  createStyles,
  Title,
  Image,
  Navbar,
  Header,
  AppShell,
  Anchor,
  Text,
} from '@mantine/core';

import viteLogo from '@images/vite.svg';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: 'calc(100vh - 60px - 32px)',
    display: 'grid',
    placeContent: 'center',
    justifyItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'space-between',
  },
}));

function Home() {
  const { classes } = useStyles();

  return (
    <AppShell
      padding='md'
      navbar={
        <Navbar width={{ base: 300 }} p='lg'>
          Nav Menu
        </Navbar>
      }
      header={
        <Header height={60} p='lg' pr='64px' className={classes.header}>
          <Text>Header</Text>

          <Anchor to='/login' component={Link} ml='auto'>
            Logout
          </Anchor>
        </Header>
      }
      styles={(theme) => ({ main: { backgroundColor: theme.colors.dark[8] } })}
    >
      <Paper className={classes.wrapper}>
        <Image src={viteLogo} alt='logo' width={128} mb='md' />
        <Title align='center'>Welcome back to HRME!</Title>
      </Paper>
    </AppShell>
  );
}

export default Home;
