import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetErrorAction } from '../store/reducers/wallet/actions';
import { errorSelector } from '../store/reducers/wallet/selectors';

function ErrorAlert({ error, resetError }) {
  // todo: fix error message disappering before the alert box does
  const open = Boolean(error);

  const handleClose = useCallback((e, reason) => {
    if (reason !== 'clickaway') {
      resetError();
    }
  }, []);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      onClose={handleClose}
      disableWindowBlurListener
    >
      <Alert onClose={handleClose} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => ({
  error: errorSelector(state),
});

const mapDispatchToActions = (dispatch) => ({
  resetError: bindActionCreators(resetErrorAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToActions)(ErrorAlert);
