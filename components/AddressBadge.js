import { makeStyles } from '@material-ui/core';
import { useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const useStyles = makeStyles({
  root: {
    borderRadius: '100px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px',
    '&& p': {
      lineHeight: '24px',
      margin: 0,
      marginLeft: '12px',
      marginRight: '6px',
    },
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.2)',
    '&& p': {
      color: '#FFFFFF',
    },
  },
  light: {
    background: '#F4F6F8',
    '&& p': {
      color: '#5D6B7B',
    },
  },
});

export default function AddressBadge({ address, mode }) {
  const classes = useStyles();

  const addressShortened = useMemo(() => {
    const len = address.length;
    const sliceUpTo = isMobile ? 3 : 6;
    return `${address.slice(0, sliceUpTo)}...${address.slice(len - (sliceUpTo + 1), len + 1)}`;
  }, [address]);

  return (
    <div className={`${classes.root} ${classes[mode || 'light']}`}>
      <p>{addressShortened}</p>
      <Jazzicon diameter={24} seed={jsNumberForAddress(address)} />
    </div>
  );
}
