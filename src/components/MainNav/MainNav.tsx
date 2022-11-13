import { useCallback, useContext, useState } from 'react';
import { Navbar, Group, Image, Text, Box, Loader } from '@mantine/core';
import {
  IconLogout,
  IconChecklist,
  IconMessageReport,
  IconRepeat,
  IconMessages,
  IconCheckupList,
  IconUsers,
  IconReportAnalytics,
  IconSettings,
} from '@tabler/icons';
import { Link, useHref, useLocation } from 'react-router-dom';
import viteLogo from '@images/vite.svg';
import useStyles from './mainNav.styles';
import AuthContext from '@contexts/auth';

const linksData = [
  { link: 'tasks', label: 'Task Center', icon: IconChecklist },
  { link: 'requests', label: 'Requests', icon: IconMessageReport },
  { link: 'practices', label: 'HR Practices', icon: IconRepeat },
  { link: 'conversations', label: 'Conversations', icon: IconMessages },
  { link: 'policies', label: 'HR Policy', icon: IconCheckupList },
  { link: 'staff', label: 'Staff', icon: IconUsers },
  { link: 'reports', label: 'Report Cards', icon: IconReportAnalytics },
];

export const navbarWidth = 300;

function MainNav() {
  const { classes, cx } = useStyles();
  const { logout } = useContext(AuthContext)!;

  const location = useLocation();

  const [loggingOut, setLoggingOut] = useState(false);

  const logoutHandler = useCallback(async () => {
    setLoggingOut(true);

    await logout();

    setLoggingOut(false);
  }, [logout]);

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Link to="home" style={{ textDecoration: 'none' }}>
          <Group className={classes.header} spacing="md">
            <Image src={viteLogo} width={48} />
            <Text weight={600} size="lg" color="gray.0">
              HRME Now
            </Text>
          </Group>
        </Link>

        {linksData.map(item => (
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: location.pathname.startsWith(
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useHref(item.link)
              ),
            })}
            to={item.link}
            key={item.label}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </Link>
        ))}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to="/" className={classes.link}>
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </Link>

        <Box
          onClick={logoutHandler}
          className={cx(classes.link, {
            [classes.linkActive]: loggingOut,
            [classes.disabled]: loggingOut,
          })}
        >
          {loggingOut ? (
            <Loader color="white" size="sm" mr="sm" />
          ) : (
            <IconLogout className={classes.linkIcon} stroke={1.5} />
          )}
          <span>Logout</span>
        </Box>
      </Navbar.Section>
    </Navbar>
  );
}

export default MainNav;
