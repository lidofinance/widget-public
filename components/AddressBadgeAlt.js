import { makeStyles } from '@material-ui/core';
import { useMemo } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    '&& p': {
      lineHeight: '26px',
      margin: 0,
      marginLeft: '6px',
      marginRight: '6px',
      fontSize: '20px',
      fontWeight: 500,
    },
  },
});

export default function AddressBadgeAlt({ address, mode }) {
  const classes = useStyles();

  const addressShortened = useMemo(() => {
    if (address) {
      const len = address.length;
      const sliceUpTo = isMobile ? 3 : 6;
      return `${address.slice(0, sliceUpTo)}...${address.slice(len - (sliceUpTo + 1), len + 1)}`;
    }

    return '';
  }, [address]);

  if (!address) return null;
  return (
    <div className={`${classes.root} ${classes[mode || 'light']}`}>
      <Jazzicon diameter={24} seed={jsNumberForAddress(address)} />
      <p>{addressShortened}</p>
    </div>
  );
}
