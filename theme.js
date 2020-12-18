import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#0C141D',
    },
    primary: {
      main: '#00A3FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F4F6F8',
      contrastText: '#00A3FF',
    },
    background: {
      default: 'rgb(244, 246, 248)',
    },
    action: {
      hoverOpacity: 1,
      hover: 1,
    },
  },
  typography: {
    fontSize: 16,
    color: '#080E14',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2rem',
      margin: 0,
      color: '#080E14',
      fontWeight: 500,
      lineHeight: '38px',
    },
    body1: {
      fontSize: '16px',
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      // disableRipple: true,
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButton: {
      root: {
        height: 48,
        boxSizing: 'border-box',
      },
      disableElevation: true,
      contained: {
        boxShadow: 'none',
      },
      label: {
        textTransform: 'none',
        fontWeight: 600,
      },
      outlinedPrimary: {
        '&:hover span, &:active span': {
          color: 'white',
        },
        '&:active': {
          backgroundColor: '#009BF2',
        },
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#009BF2',
        },
        '&:disabled': {
          backgroundColor: '#00A3FF',
        },
        '&& span': {
          color: 'white',
        },
      },
    },
    MuiDialog: {
      paper: {
        width: 432,
        minWidth: 335,
        borderRadius: '10px',
      },
    },
    MuiDialogTitle: {
      root: {
        '&&': {
          padding: '32px',
          '& h2': {
            fontWeight: 500,
            fontSize: 20,
            lineHeight: '26px',
            margin: 0,
            padding: 0,
          },
        },
      },
    },
    MuiDialogContent: {
      root: {
        padding: '0 32px 32px',
      },
    },
    MuiListItem: {
      root: {
        background: '#F4F6F8',
        borderRadius: 10,
        padding: '16px 20px',
        fontSize: '18px',
        marginBottom: 8,
        '&:hover': {
          backgroundColor: 'rgba(0, 163, 255, 0.1)',
        },
      },
      gutters: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
      },
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: '0px 0px 8px 0px',
        },
        boxShadow: 'none',
        marginBottom: '8px',
        borderRadius: '10px',
        '&&:before': {
          background: 'rgba(0, 0, 0, 0)',
        },
        '&& .MuiAccordionSummary-root': {
          padding: 0,
          minHeight: 'unset',
          border: 'none',
          '& .MuiAccordionSummary-content': {
            margin: '30px 20px',
            fontWeight: 600,
            lineHeight: '20px',
          },
        },
        '&& .MuiAccordionSummary-expandIcon': {
          marginRight: '18px',
          '& .MuiSvgIcon-root': {
            color: '#505A7A',
          },
        },
        '&& .MuiAccordionDetails-root': {
          padding: '0 20px 20px 20px',
          color: '#505A7A',
          lineHeight: '20px',
          '& ul': {
            paddingLeft: '16px',
          },
        },
      },
    },
  },
});

export default theme;
