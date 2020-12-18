/* eslint-disable react/jsx-one-expression-per-line */
import { Button, makeStyles } from '@material-ui/core';
import AddressBadge from '../../../components/AddressBadge';
import { trimTrailingZeros } from '../../../utils/string';

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
    background: '#FFF',
    borderRadius: '6px',
    padding: '8px 8px 8px 16px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#FFF',
    },
    '&& span': {
      fontWeight: 'normal',
    },
  },
  balance: {
    fontWeight: 500,
    marginRight: '12px',
  },
}));

export default function Badge({ account, handleClick }) {
  const classes = useStyles();
  const { balance, address } = account;
  const formattedBalance = trimTrailingZeros(Number(balance).toFixed(6).toString());

  return (
    <Button className={classes.root} onClick={handleClick}>
      <div className={classes.balance}>{formattedBalance} ETH</div>
      <AddressBadge address={address} mode='light' />
    </Button>
  );
}
