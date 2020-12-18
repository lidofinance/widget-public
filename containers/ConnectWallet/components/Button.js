import React, { useCallback } from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '16px',
    [theme.breakpoints.up('xs')]: {
      right: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      right: '32px',
    },
    [theme.breakpoints.up('lg')]: {
      right: '120px',
    },
  },
}));

export default function Button({ onClick }) {
  const classes = useStyles();
  const handleClick = useCallback(() => {
    onClick();
  }, []);

  return (
    <MuiButton
      className={classes.root}
      color='primary'
      variant='contained'
      onClick={handleClick}
    >
      Connect wallet
    </MuiButton>
  );
}
