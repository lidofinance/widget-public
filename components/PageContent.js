import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { accountSelector } from '../store/reducers/wallet/selectors';
import FAQ from './FAQ';
import Logo from './Logo';
import PageTitle from './PageTitle';
import StakeCard from '../containers/Stake';
import WalletCard from './WalletCard';

const useStyles = makeStyles({
  root: {
    maxWidth: '516px',
    minWidth: '320px',
    padding: '20px',
    margin: '84px auto 50px auto',
  },
});

function PageContent({ account }) {
  const classes = useStyles();
  const { isConnected } = account;

  return (
    <div className={classes.root}>
      <Logo minimal={isConnected && isMobile} />
      <PageTitle />
      {isConnected && <WalletCard />}
      <StakeCard account={account} />
      <FAQ />
    </div>
  );
}

const mapStateToProps = (state) => ({
  account: accountSelector(state),
});

export default connect(mapStateToProps)(PageContent);
