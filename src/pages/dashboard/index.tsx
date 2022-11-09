import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Paper, createStyles, AppShell } from '@mantine/core';
import MainNav, { navbarWidth } from '@components/MainNav/MainNav';

const useStyles = createStyles(_theme => {
  return {
    wrapper: {
      minHeight: '100vh',
      width: `calc(100vw - ${navbarWidth}px)`,
      marginLeft: navbarWidth,
    },
  };
});

function Dashboard() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard') navigate('home');
  }, [location.pathname, navigate]);

  return (
    <AppShell
      padding="md"
      navbar={<MainNav />}
      styles={theme => ({
        main: {
          backgroundColor: theme.colors.dark[8],
          padding: 0,
          overflowX: 'hidden',
        },
      })}
    >
      <Paper className={classes.wrapper}>
        <Outlet />
      </Paper>
    </AppShell>
  );
}

export default Dashboard;
