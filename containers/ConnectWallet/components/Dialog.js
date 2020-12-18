import {
  CircularProgress,
  Dialog as MuiDialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LidoRound from '../../../assets/icons/lido-round.svg';
import { closeConnectDialog } from '../../../store/reducers/ui/actions';
import { getConnectDialogOpen } from '../../../store/reducers/ui/selectors';
import {
  getProviderAction,
  resetWalletAction,
} from '../../../store/reducers/wallet/actions';
import { pendingSelector } from '../../../store/reducers/wallet/selectors';
import { supportedWallets } from '../../../wallets/constants';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  logo: {
    margin: '32px auto 0px',
  },
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
    textAlign: 'center',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#505A7A',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
    marginBottom: '24px',
  },
  listItem: {
    position: 'relative',
  },
  loadText: {
    marginLeft: '8px',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    '-ms-transform': 'translate(0%, -50%)',
    transform: 'translate(0%, -50%)',
  },
  accept: {
    backgroundColor: '#F4F6F8',
    display: 'flex',
    padding: '16px 20px',
    borderRadius: '10px',
    '&& a': {
      color: '#00A3FF',
      textDecoration: 'none',
    },
  },
  checkbox: {
    padding: '0px !important',
    marginRight: '20px',
    '&& *': {
      padding: '0px !important',
    },
  },
});

function Dialog({ getWalletInfo, pending, open, onClose, resetWallet }) {
  const classes = useStyles();

  const handleClick = useCallback((type) => {
    getWalletInfo(type);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    resetWallet();
  }, []);

  return (
    <MuiDialog open={open} onClose={handleClose} className={classes.root}>
      <LidoRound className={classes.logo} />
      <IconButton
        className={classes.closeIcon}
        disableRipple
        onClick={handleClose}
      >
        <CloseRounded />
      </IconButton>
      <Typography className={classes.title}>Connect wallet</Typography>
      <Typography className={classes.subtitle}>To start using Lido</Typography>
      <DialogContent>
        <List>
          {pending ? (
            <ListItem>
              <CircularProgress size={25} />
              <span className={classes.loadText}>Initializing...</span>
            </ListItem>
          ) : (
            supportedWallets.map(({ name, type, Icon }) => (
              <ListItem
                className={classes.listItem}
                key={name}
                button
                onClick={() => handleClick(type)}
              >
                {name}
                <Icon className={classes.icon} />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
    </MuiDialog>
  );
}

const mapStateToProps = (state) => ({
  open: getConnectDialogOpen(state),
  pending: pendingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  getWalletInfo: bindActionCreators(getProviderAction, dispatch),
  onClose: bindActionCreators(closeConnectDialog, dispatch),
  resetWallet: bindActionCreators(resetWalletAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
