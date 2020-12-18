import { useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { closeStakeLoading } from '../../../store/reducers/ui/actions';
import { getStakeLoadingOpen } from '../../../store/reducers/ui/selectors';
import {
  eth2stakeSelector,
  etherscanPageSelector,
  pendingSelector,
} from '../../../store/reducers/wallet/selectors';

import SuccessIcon from '../../../assets/icons/success.svg';

const useStyles = makeStyles({
  iconWrapper: {
    position: 'relative',
    height: '154px',
  },
  icon: {
    position: 'absolute',
    top: '50px',
    left: 'calc(50% - 30px)',
  },
  title: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '26px',
    textAlign: 'center',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#505A7A',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
    marginBottom: '42px',
  },
  confirm: {
    color: '#5D6B7B',
    lineHeight: '20px',
    opacity: '0.5',
    textAlign: 'center',
  },
  success: {
    margin: '50px auto',
  },
  linkWrapper: {
    textAlign: 'center',
    marginTop: '40px',
  },
  link: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '24px',
    textDecoration: 'none',
    color: '#00A3FF',
  },
});

function StakeLoading({
  totalStake,
  toStakeAmount,
  open,
  pending,
  link,
  onClose,
}) {
  const classes = useStyles();

  const displayContent = useCallback(() => {
    if (pending) {
      if (link) {
        return (
          <>
            <div className={classes.iconWrapper}>
              <CircularProgress
                className={classes.icon}
                size={60}
                thickness={2}
              />
            </div>
            <Typography className={classes.title}>
              You are now staking {toStakeAmount} stETH
            </Typography>
            <div className={classes.linkWrapper}>
              <a
                className={classes.link}
                target='_blank'
                rel='noreferrer'
                href={link}
              >
                View on Etherscan
              </a>
            </div>
          </>
        );
      }

      return (
        <>
          <div className={classes.iconWrapper}>
            <CircularProgress
              className={classes.icon}
              size={60}
              thickness={2}
            />
          </div>
          <Typography className={classes.title}>
            Waiting for Confirmation
          </Typography>
          <Typography className={classes.subtitle}>
            Staking {toStakeAmount} ETH. You will receive {toStakeAmount} stETH
          </Typography>
          <Typography className={classes.confirm}>
            Confirm this transaction in your wallet
          </Typography>
        </>
      );
    }
    return (
      <>
        <div className={classes.iconWrapper}>
          <SuccessIcon className={classes.icon} />
        </div>
        <Typography className={classes.title}>
          Your new balance is {totalStake} stETH
        </Typography>
        <div className={classes.linkWrapper}>
          <a
            className={classes.link}
            target='_blank'
            rel='noreferrer'
            href={link}
          >
            View on Etherscan
          </a>
        </div>
      </>
    );
  }, [toStakeAmount, open, pending, link, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.content}>
        {displayContent()}
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  toStakeAmount: eth2stakeSelector(state),
  open: getStakeLoadingOpen(state),
  pending: pendingSelector(state),
  link: etherscanPageSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: bindActionCreators(closeStakeLoading, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StakeLoading);
