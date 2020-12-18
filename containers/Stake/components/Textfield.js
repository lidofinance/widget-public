import {
  TextField,
  SvgIcon,
  makeStyles,
  withStyles,
  Button,
} from '@material-ui/core';
import { useField } from 'formik';

import EthereumIcon from '../../../assets/icons/ethereum.svg';

const OutlinedTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      '& fieldset': {
        borderColor: '#D1D8DF',
      },
      '&:hover fieldset': {
        borderColor: '#B1B7BD',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00A3FF',
        borderWidth: '1px',
      },
    },
  },
})(TextField);

const useStyles = makeStyles({
  root: {
    borderRadius: '10px',
    marginBottom: '34px',
  },
  startAdornment: {
    marginRight: '16px',
  },
  endAdornment: {
    marginLeft: '16px',
    height: '32px',
    background: '#F4F6F8',
    color: '#00A3FF',
    padding: '0px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    '&:hover': {
      background: '#F4F6F8',
    },
  },
});

export default function StakeTextField({ handleMax, ...props }) {
  const classes = useStyles();

  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <OutlinedTextField
      className={classes.root}
      fullWidth
      variant='outlined'
      placeholder='Amount'
      type='number'
      inputProps={{
        min: 0,
      }}
      InputProps={{
        startAdornment: (
          <SvgIcon className={classes.startAdornment}>
            <EthereumIcon />
          </SvgIcon>
        ),
        endAdornment: (
          <Button
            className={classes.endAdornment}
            disableRipple
            onClick={handleMax}
          >
            MAX
          </Button>
        ),
      }}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
}
