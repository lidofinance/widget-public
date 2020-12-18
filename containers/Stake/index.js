import { useCallback } from 'react';
import {
  Button,
  makeStyles,
  //  Tooltip,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import StakeTextField from './components/Textfield';
import ShieldIcon from '../../assets/icons/shield.svg';
// import QuestionIcon from '../../assets/icons/question.svg';
import { openConnectDialog } from '../../store/reducers/ui/actions';
import { getStakeAction } from '../../store/reducers/wallet/actions';
import {
  pendingSelector,
  txCostSelector,
} from '../../store/reducers/wallet/selectors';
import StakeLoading from './components/Loading';

const useStyles = makeStyles({
  root: {
    background: '#FFFFFF',
    marginTop: '16px',
    borderRadius: '20px',
    padding: '32px',
    textAlign: 'center',
  },
  connected: {
    marginTop: '-16px',
  },
  inputLabel: {
    color: '#505A7A',
    lineHeight: '20px',
    marginBottom: '6px',
    textAlign: 'start',
  },
  button: {
    height: '56px',
    marginBottom: '32px',
  },
  data: {},
  dataRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:not(:last-of-type)': {
      marginBottom: '16px',
    },
  },
  dataRowKey: {
    color: '#505A7A',
    position: 'relative',
  },
  question: {
    position: 'absolute',
    left: 'calc(100% + 6px)',
    top: '15%',
    '&&:hover': {
      cursor: 'pointer',
    },
  },
  tooltip: {
    '&& > .MuiTooltip-tooltip': {
      background: '#2B3036',
      fontSize: '12px',
      padding: '12px',
      width: '257px',
    },
  },
  dataRowValueHighlighted: {
    color: '#61B75F',
  },
  badge: {
    display: 'inline-flex',
    justifyContent: 'center',
    padding: '9px 16px',
    alignItems: 'center',
    height: '30px',
    margin: '32px auto 0 auto',
    borderRadius: '40px',
    background: 'rgba(97, 183, 95, 0.1)',
  },
  badgeText: {
    color: '#61B75F',
    fontSize: '12px',
    fontWeight: 500,
    marginLeft: '6px',
  },
});

const initialValues = {
  eth2stake: '',
};

const validationSchema = yup.object().shape({
  eth2stake: yup
    .number('Stake amount must be a number')
    .positive('Stake amount must be a positive number')
    .moreThan(0, 'Stake amount must be greater than 0')
    .required('Stake amount is required'),
});

function StakeCard({ account, txCost, openDialog, startStake }) {
  const classes = useStyles();
  const { isConnected, maxStake, stake } = account;

  const handleSubmit = useCallback(({ eth2stake }, { setSubmitting }) => {
    startStake(eth2stake);
    setSubmitting(false);
  }, []);

  const handleConnectWallet = useCallback(() => {
    openDialog();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ values, submitForm, isValidating, isSubmitting, setFieldValue }) => {
        const handleClick = (e) => {
          e.preventDefault();
          submitForm();
        };

        const setMaxStake = () => {
          setFieldValue('eth2stake', maxStake);
        };

        return (
          <div
            className={`${classes.root} ${
              isConnected ? classes.connected : ''
            }`}
          >
            <Typography className={classes.inputLabel}>Stake amount</Typography>
            <StakeTextField name='eth2stake' handleMax={setMaxStake} />
            {isConnected ? (
              <Button
                className={classes.button}
                variant='contained'
                fullWidth
                color='primary'
                onClick={handleClick}
                disabled={isValidating || isSubmitting}
              >
                Stake
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant='contained'
                fullWidth
                color='primary'
                onClick={handleConnectWallet}
              >
                Connect wallet
              </Button>
            )}
            <div className={classes.data}>
              <div className={classes.dataRow}>
                <Typography className={classes.dataRowKey}>
                  Transaction fee
                </Typography>
                <Typography>{txCost}</Typography>
              </div>
              <div className={classes.dataRow}>
                <Typography className={classes.dataRowKey}>
                  You will receive
                </Typography>
                <Typography>{values.eth2stake || 0} stETH</Typography>
              </div>
            </div>
            <div className={classes.badge}>
              <ShieldIcon />
              <p className={classes.badgeText}>Safe staking with Lido</p>
            </div>
            <StakeLoading totalStake={stake} />
          </div>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = (state) => ({
  pending: pendingSelector(state),
  txCost: txCostSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  openDialog: bindActionCreators(openConnectDialog, dispatch),
  startStake: bindActionCreators(getStakeAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StakeCard);
