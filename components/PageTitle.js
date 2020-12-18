import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '&& > *': {
      textAlign: 'center',
    },
  },
  title: {
    marginBottom: '4px',
  },
  subtitle: {
    color: '#505A7A',
    lineHeight: '20px',
  },
});

export default function PageTitle() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant='h1'>
        Stake Ether
      </Typography>
      <Typography className={classes.subtitle}>Stake ETH and receive stETH while staking.</Typography>
    </div>
  );
}
