import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Paper, createStyles, AppShell } from '@mantine/core';
import MainNav, { navbarWidth } from '@components/MainNav/MainNav';
import useAuth from '@hooks/useAuth';

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
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (location.pathname === '/dashboard') return <Navigate to="home" replace />;

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
