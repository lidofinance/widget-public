import {
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
  Button,
  IconButton,
  capitalize,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';
import { CloseRounded } from '@material-ui/icons';
import { closeAccountInfoAction } from '../../../store/reducers/ui/actions';
import { getAccountInfoOpen } from '../../../store/reducers/ui/selectors';
import { walletTypeSelector } from '../../../store/reducers/wallet/selectors';
import AddressBadgeAlt from '../../../components/AddressBadgeAlt';
import { startResetWalletAction } from '../../../store/reducers/wallet/actions';
import { ACTIVE_CHAIN_ID, ETHERSCAN_PREFIXES } from '../../../config/constants';
import CopyIcon from '../../../assets/icons/copy.svg';
import ExternalLinkIcon from '../../../assets/icons/external-link.svg';

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    right: '32px',
    top: '32px',
    padding: '0',
    '&& svg': {
      color: '#505A7A',
      height: '20px',
      width: '20px',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },
  title: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '26px',
    margin: '12px 0 32px 0',
  },
  box: {
    background: '#F4F6F8',
    borderRadius: '10px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  account: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  info: {},
  connected: {
    marginBottom: '8px',
    fontSize: '14px',
    color: '#505A7A',
  },
  disconnect: {
    height: '32px',
    borderRadius: '6px',
  },
  actions: {
    marginTop: '8px',
    paddingLeft: '4px',
    display: 'grid',
    [theme.breakpoints.up('xs')]: {
      gridTemplateColumns: '1fr',
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '3fr 4fr',
    },
  },
  action: {
    justifySelf: 'start',
    padding: '0px',
    '&:hover': {
      background: 'unset',
    },
    '&& span': {
      color: '#00A3FF',
    },
  },
}));

function AccountInfo({ account, open, onClose, type, disconnect }) {
  const classes = useStyles();

  const [copied, setCopied] = useState(false);
  const openCopied = useCallback(() => setCopied(true), []);
  const closeCopied = useCallback(() => setCopied(false), []);

  const handleClose = () => {
    onClose();
    closeCopied();
  };

  useEffect(() => {
    let interval;

    if (copied) {
      interval = window.setInterval(closeCopied, 1000);
    }

    return () => window.clearInterval(interval);
  }, [copied]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className={classes.dialogContent}>
        <Typography className={classes.title}>Account</Typography>
        <IconButton
          className={classes.closeIcon}
          disableRipple
          onClick={handleClose}
        >
          <CloseRounded fontSize='small' />
        </IconButton>
        <div className={classes.box}>
          <div className={classes.account}>
            <Button
              className={classes.disconnect}
              disableRipple
              variant='outlined'
              color='primary'
              onClick={disconnect}
            >
              Disconnect
            </Button>
            <div className={classes.info}>
              <Typography className={classes.connected}>
                Connected with {capitalize(type || '')}
              </Typography>
            </div>
          </div>
          <AddressBadgeAlt address={account.address} mode='light' />
          <div className={classes.actions}>
            {copied ? (
              <Button
                className={classes.action}
                variant='text'
                component='span'
                disableRipple
                startIcon={<CopyIcon fontSize='small' color='primary' />}
                onClick={closeCopied}
              >
                Copied!
              </Button>
            ) : (
              <CopyToClipboard text={account.address} onCopy={openCopied}>
                <Button
                  className={classes.action}
                  variant='text'
                  startIcon={<CopyIcon fontSize='small' color='primary' />}
                  disableRipple
                >
                  Copy address
                </Button>
              </CopyToClipboard>
            )}
            <Button
              className={classes.action}
              variant='text'
              component='a'
              disableRipple
              startIcon={<ExternalLinkIcon fontSize='small' color='primary' />}
              href={`https://${ETHERSCAN_PREFIXES[ACTIVE_CHAIN_ID]}etherscan.io/address/${account.address}`}
              target='_blank'
            >
              View on Etherscan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  open: getAccountInfoOpen(state),
  type: walletTypeSelector(state),
});

const mapDispatchToPropss = (dispatch) => ({
  onClose: bindActionCreators(closeAccountInfoAction, dispatch),
  disconnect: bindActionCreators(startResetWalletAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToPropss)(AccountInfo);
