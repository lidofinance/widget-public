import { makeStyles, Typography } from '@material-ui/core';
import LidoIcon from '../assets/icons/lido.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: '1px solid rgba(8, 14, 20, 0.1)',
    paddingTop: '54px',
    paddingBottom: '60px',
    display: 'grid',
    columnGap: '80px',
    rowGap: '50px',
    [theme.breakpoints.up('xs')]: {
      gridTemplateColumns: '1fr',
      margin: '0 20px',
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      margin: '0 32px',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      margin: '0 120px',
    },
  },
  lido: {
    [theme.breakpoints.up('xs')]: {
      gridArea: '4 / 1 / span 1 / span 1',
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      gridArea: '2 / 1 / span 1 / span 3',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    [theme.breakpoints.up('lg')]: {
      gridArea: '1 / 1 / 1 / span 1',
      display: 'block',
    },
  },
  logo: {
    marginTop: '-30px',
  },
  founded: {
    marginTop: '46px',
    marginBottom: '12px',
    fontSize: '18px',
    lineHeight: '1.5',
  },
  copyright: {
    color: 'rgba(8, 14, 20, 0.5)',
    marginTop: '46px',
  },
  colTitle: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '20px',
    marginBottom: '16px',
  },
  colLink: {
    fontSize: '16px',
    lineHeight: '36px',
    color: 'rgba(8, 14, 20, 0.5)',
    display: 'block',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: 'rgba(8, 14, 20, 1)',
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.lido}>
        <LidoIcon className={classes.logo} />
      </div>
      <div>
        <Typography className={classes.colTitle}>Resources</Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://lido.fi/'
          target='_blank'
          rel='noreferrer'
        >
          Stake with Lido
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://lido.fi/static/Lido:Ethereum-Liquid-Staking.pdf'
          target='_blank'
          rel='noreferrer'
        >
          Primer
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://lido.fi/faq'
          target='_blank'
          rel='noreferrer'
        >
          FAQ
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://lido.fi/static/LIDO_press_kit.zip'
          target='_blank'
          rel='noreferrer'
        >
          Press Kit
        </Typography>
      </div>
      <div>
        <Typography className={classes.colTitle}>Community</Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://twitter.com/lidofinance'
          target='_blank'
          rel='noreferrer'
        >
          Twitter
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://t.me/lidofinance'
          target='_blank'
          rel='noreferrer'
        >
          Telegram
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://discord.gg/vgdPfhZ'
          target='_blank'
          rel='noreferrer'
        >
          Discord
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://github.com/lidofinance'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://www.reddit.com/r/LidoFinance/'
          target='_blank'
          rel='noreferrer'
        >
          Reddit
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='https://blog.lido.fi/'
          target='_blank'
          rel='noreferrer'
        >
          Blog
        </Typography>
      </div>
      <div>
        <Typography className={classes.colTitle}>Contacts</Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='mailto:info@lido.fi'
          target='_blank'
          rel='noreferrer'
        >
          info@lido.fi
        </Typography>
        <Typography
          component='a'
          className={classes.colLink}
          href='http://help.lido.fi/'
          target='_blank'
          rel='noreferrer'
        >
          Help Center
        </Typography>
      </div>
    </div>
  );
}
