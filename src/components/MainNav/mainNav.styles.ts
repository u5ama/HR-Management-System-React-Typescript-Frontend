import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  const backgroundColor = theme.fn.variant({
    variant: 'filled',
    color: theme.primaryColor,
  }).background;
  const borderColor = theme.fn.lighten(backgroundColor!, 0.1);

  return {
    navbar: {
      backgroundColor,
    },

    header: {
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.lg,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: '1px solid',
      borderColor,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: '1px solid',
      borderColor,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: borderColor,
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background!,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

export default useStyles;
