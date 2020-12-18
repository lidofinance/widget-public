import { makeStyles } from '@material-ui/core';
import LidoIcon from '../assets/icons/lido.svg';
import LidoMinimalIcon from '../assets/icons/lido-minimal.svg';

const useStyles = makeStyles((theme) => ({
  logo: {
    position: 'absolute',
    display: 'inline-block',
    top: '30px',
    [theme.breakpoints.up('xs')]: {
      left: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      left: '32px',
    },
    [theme.breakpoints.up('lg')]: {
      left: '120px',
    },
  },
}));

export default function Logo({ minimal }) {
  const classes = useStyles();
  return minimal ? <LidoMinimalIcon className={classes.logo} /> : <LidoIcon className={classes.logo} />;
}
