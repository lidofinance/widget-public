import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import Footer from '../components/Footer';
import PageContent from '../components/PageContent';
import ConnectWallet from '../containers/ConnectWallet';
import { getTxCostEstimateAction } from '../store/reducers/wallet/actions';

function Home({ getTxCost }) {
  useEffect(getTxCost, []);

  return (
    <main>
      <ConnectWallet />
      <PageContent />
      <ErrorAlert />
      <Footer />
    </main>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getTxCost: bindActionCreators(getTxCostEstimateAction, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
