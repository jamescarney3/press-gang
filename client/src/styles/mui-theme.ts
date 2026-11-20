import { createTheme, type Shadows } from '@mui/material/styles';

const palette = {
  primary: {
    main: 'var(--color-brand)',
    contrastText: 'var(--color-fg)',
  },
  secondary: {
    main: 'var(--color-accent)',
    contrastText: 'var(--color-accent-fg)',
  },
  error: {
    main: 'var(--color-danger)',
    contrastText: 'var(--color-danger-fg)',
  },
  warning: {
    main: 'var(--color-warning)',
    contrastText: 'var(--color-warning-fg)',
  },
  info: {
    main: 'var(--color-info)',
    contrastText: 'var(--color-info-fg)',
  },
  success: {
    main: 'var(--color-success)',
    contrastText: 'var(--color-success-fg)',
  },
  text: {
    primary: 'var(--color-fg)',
    secondary: 'var(--color-fg-muted)',
    disabled: 'var(--color-fg-subtle)',
  },
  background: {
    default: 'var(--color-bg)',
    paper: 'var(--color-surface)',
  },
  divider: 'var(--color-border)',
};

const shadows: Shadows = [
  'none',
  'var(--shadow-sm)',
  'var(--shadow-sm)',
  'var(--shadow-md)',
  'var(--shadow-md)',
  'var(--shadow-md)',
  'var(--shadow-md)',
  'var(--shadow-md)',
  'var(--shadow-md)',
  'var(--shadow-lg)',
  'var(--shadow-lg)',
  'var(--shadow-lg)',
  'var(--shadow-lg)',
  'var(--shadow-lg)',
  'var(--shadow-lg)',
  'var(--shadow-lg)',
  'var(--shadow-lg)',
  'var(--shadow-xl)',
  'var(--shadow-xl)',
  'var(--shadow-xl)',
  'var(--shadow-xl)',
  'var(--shadow-xl)',
  'var(--shadow-xl)',
  'var(--shadow-xl)',
  'var(--shadow-2xl)',
];

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'media', nativeColor: true },
  colorSchemes: {
    light: { palette: { ...palette, mode: 'light' } },
    dark: { palette: { ...palette, mode: 'dark' } },
  },
  typography: {
    fontFamily: 'var(--font-family-body)',
    fontSize: 16,
    h1: {
      fontFamily: 'var(--font-family-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 500,
      lineHeight: 'var(--line-height-4xl)',
      letterSpacing: 'var(--letter-spacing-4xl)',
    },
    h2: {
      fontFamily: 'var(--font-family-heading)',
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 500,
      lineHeight: 'var(--line-height-2xl)',
      letterSpacing: 'var(--letter-spacing-2xl)',
    },
    h3: {
      fontFamily: 'var(--font-family-heading)',
      fontSize: 'var(--font-size-3xl)',
      fontWeight: 500,
      lineHeight: 'var(--line-height-3xl)',
      letterSpacing: 'var(--letter-spacing-3xl)',
    },
    h4: {
      fontFamily: 'var(--font-family-heading)',
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 500,
      lineHeight: 'var(--line-height-2xl)',
      letterSpacing: 'var(--letter-spacing-2xl)',
    },
    h5: {
      fontFamily: 'var(--font-family-heading)',
      fontSize: 'var(--font-size-xl)',
      fontWeight: 500,
      lineHeight: 'var(--line-height-xl)',
      letterSpacing: 'var(--letter-spacing-xl)',
    },
    h6: {
      fontFamily: 'var(--font-family-heading)',
      fontSize: 'var(--font-size-lg)',
      fontWeight: 500,
      lineHeight: 'var(--line-height-lg)',
      letterSpacing: 'var(--letter-spacing-lg)',
    },
    body1: {
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-base)',
    },
    body2: {
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-sm)',
    },
    button: {
      fontFamily: 'var(--font-family-body)',
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-base)',
      // textTransform: 'none',
    },
    caption: {
      fontSize: 'var(--font-size-xs)',
      lineHeight: 'var(--line-height-xs)',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          minWidth: 'var(--spacing-80)',
        },
      },
    },
  },
  shape: { borderRadius: 4 },
  spacing: (factor: number) => `calc(var(--spacing-1) * ${factor})`,
  shadows,
});

export default theme;
