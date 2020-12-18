import { Divider, makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { accountSelector } from '../store/reducers/wallet/selectors';
import AddressBadge from './AddressBadge';
import { trimTrailingZeros } from '../utils/string';

const useStyles = makeStyles({
  root: {
    background: '#2B3036',
    marginTop: '16px',
    borderRadius: '20px 20px 0 0',
    padding: '32px',
    color: '#FFFFFF',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    '&& h2': {
      fontSize: '26px',
      lineHeight: '32px',
      fontWeight: '500',
      marginTop: '8px',
    },

    marginBottom: '16px',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: '24px',
  },
  assets: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-between',
  },
  assetItem: {
    '&& > p': {
      fontSize: '14px',
      marginBottom: '4px',
    },
    '&& > h3': {
      fontSize: '18px',
      fontWeight: '500',
    },
  },
});

function WalletCard({ account }) {
  const classes = useStyles();
  const { address, stake, balance } = account;

  const formattedBalance = trimTrailingZeros(
    Number(balance).toFixed(6).toString()
  );

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div>
          <Typography>Your wallet balance</Typography>
          <Typography variant='h2'>{formattedBalance} ETH</Typography>
        </div>
        <AddressBadge address={address} mode='dark' />
      </div>
      <Divider className={classes.divider} />
      <div className={classes.assets}>
        <div className={classes.assetItem}>
          <Typography>Staked amount</Typography>
          <Typography variant='h3'>{stake} stETH</Typography>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  account: accountSelector(state),
});

export default connect(mapStateToProps)(WalletCard);
