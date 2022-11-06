import { createStyles, Title, Image, Container } from '@mantine/core';

import viteLogo from '@images/vite.svg';

const useStyles = createStyles(_theme => ({
  wrapper: {
    height: '100vh',
    display: 'grid',
    placeContent: 'center',
    justifyItems: 'center',
  },
}));

function DashboardHome() {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper}>
      <Image src={viteLogo} alt="logo" width={128} mb="md" />
      <Title align="center">Welcome back to HRME!</Title>
    </Container>
  );
}

export default DashboardHome;
