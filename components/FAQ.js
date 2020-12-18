import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import { useCallback, useState } from 'react';

const FAQText = [
  {
    question: 'What is Lido?',
    answer: (
      <div>
        Lido is a liquid staking solution for ETH 2.0 backed by industry-leading
        staking providers. Lido lets users stake their ETH - without locking
        assets or maintaining infrastructure - whilst participating in on-chain
        activities, e.g. lending.
        <br />
        <br />
        Our goal is to solve the problems associated with initial ETH 2.0
        staking - illiquidity, immovability and accessibility - making staked
        ETH liquid and allowing for participation with any amount of ETH to
        improve security of the Ethereum network.
        <br />
        <br />
        Learn more{' '}
        <a
          href='https://blog.lido.fi/introducing-lido/'
          target='_blank'
          rel='noreferrer'
        >
          here
        </a>
        .
      </div>
    ),
  },
  {
    question: 'How does Lido work?',
    answer: (
      <div>
        When staking with Lido, users receive stETH tokens on a 1:1 basis
        representing their staked ETH. stETH balances can be used like regular
        ETH to earn yields and lending rewards, and are updated on a daily basis
        to reflect your ETH staking rewards. Note that there are no lock-ups or
        minimum deposits when staking with Lido.
        <br />
        <br />
        When using Lido, users receive secure staking rewards in real-time,
        allowing for participation in the securing of Ethereum without the
        associated risks and downside potential.
        <br />
        <br />
        Learn more{' '}
        <a
          href='https://blog.lido.fi/how-lido-works/'
          target='_blank'
          rel='noreferrer'
        >
          here
        </a>
        .
      </div>
    ),
  },
  {
    question: 'What is liquid staking?',
    answer: (
      <>
        Liquid staking protocols allow users to earn staking rewards without
        locking assets or maintaining staking infrastructure. Users can deposit
        tokens and receive tradable liquid tokens in return. The DAO-controlled
        smart contract stakes these tokens using elected staking providers. As
        users funds are controlled by the DAO, staking providers never have
        direct access to the users&apos; assets.
      </>
    ),
  },
  {
    question: 'What is stETH?',
    answer: (
      <>
        stETH is a token that represents staked ether in Lido, combining the
        value of initial deposit + staking rewards. stETH tokens are minted upon
        deposit and burned when redeemed. stETH token balances are pegged 1:1 to
        the ethers that are staked by Lido. stETH token’s balances are updated
        when the oracle reports change in total stake every day.
        <br />
        <br />
        stETH tokens can be used as one would use ether, allowing you to earn
        ETH 2.0 staking rewards whilst benefiting from e.g. yields across
        decentralised finance products.
      </>
    ),
  },
  {
    question: 'What is LDO?',
    answer: (
      <>
        LDO is an Ethereum token granting governance rights in the Lido DAO. The
        Lido DAO governs a set of liquid staking protocols, decides on key
        parameters (e.g., fees) and executes protocol upgrades to ensure
        efficiency and stability. By holding the LDO token, one is granted
        voting rights within the Lido DAO. The more LDO locked in a user’s
        voting contract, the greater the decision-making power the voter gets.
      </>
    ),
  },
  {
    question: 'How is Lido secure?',
    answer: (
      <div>
        Lido is a secure liquid staking solution for a number of reasons:
        <ul>
          <li>Open-sourcing &amp; continuous review of all code.</li>
          <li>
            Committee of elected, best-in-class validators to minimise staking
            risk.
          </li>
          <li>
            Use of non-custodial staking service to eliminate counterparty risk.
          </li>
          <li>
            Use of DAO for governance decisions &amp; to manage risk factors.
          </li>
        </ul>
        Usually when staking ETH you choose only one validator. In the case of
        Lido you stake across many validators, minimising your staking risk.
      </div>
    ),
  },
  {
    question: 'What is the difference between self staking and liquid staking?',
    answer: (
      <div>
        Ethereum is soon to be the biggest staking economy in the space.
        However, staking on ETH 2.0 requires expert knowledge and complex and
        costly infrastructure. There are several reasons why - the main being
        the fact that slashing and offline penalties can get very severe if the
        staking is managed improperly. In addition to this, self-staking brings
        with it a minimum deposit of 32 ETH and a token lock-up which could last
        years.
        <br />
        <br />
        Through the use of a liquid self-staking service such as Lido, users can
        eliminate these inconveniences and benefit from secure, non-custodial
        staking backed by industry leaders.
      </div>
    ),
  },
  {
    question: 'What are the risks of staking with Lido?',
    answer: (
      <div>
        There exist a number of potential risks when staking ETH using liquid
        staking protocols.
        <ul>
          <li>
            <strong>Smart contract security</strong>
            <p>
              There is an inherent risk that Lido could contain a smart contract
              vulnerability or bug. The Lido code is open-sourced, audited and
              covered by an extensive bug bounty program to minimise this risk.
            </p>
          </li>
          <li>
            <strong>ETH 2.0 - Technical risk</strong>
            <p>
              Lido is built atop experimental technology under active
              development, and there is no guarantee that ETH 2.0 has been
              developed error-free. Any vulnerabilities inherent to ETH 2.0
              brings with it slashing risk, as well as stETH fluctuation risk.
            </p>
          </li>
          <li>
            <strong>ETH 2.0 - Adoption risk</strong>
            <p>
              The value of stETH is built around the staking rewards associated
              with the Ethereum beacon chain. If ETH 2.0 fails to reach required
              levels of adoption we could experience significant fluctuations in
              the value of ETH and stETH.
            </p>
          </li>
          <li>
            <strong>DAO key management risk</strong>
            <p>
              Ether staked via the Lido DAO is held across multiple accounts
              backed by a multi-signature threshold scheme to minimise custody
              risk. If signatories across a certain threshold lose their key
              shares, get hacked or go rogue, we risk funds becoming locked.
            </p>
          </li>
          <li>
            <strong>Slashing risk</strong>
            <p>
              ETH 2.0 validators risk staking penalties, with up to 100% of
              staked funds at risk if validators fail. To minimise this risk,
              Lido stakes across multiple professional and reputable node
              operators with heterogeneous setups, with additional mitigation in
              the form of insurance that is paid from Lido fees.
            </p>
          </li>
          <li>
            <strong>stETH price risk</strong>
            <p>
              Users risk an exchange price of stETH which is lower than inherent
              value due to withdrawal restrictions on Lido, making arbitrage and
              risk-free market-making impossible. The Lido DAO is driven to
              mitigate above risks and eliminate them entirely to the extent
              possible. Despite this, they may still exist and, as such, it is
              our duty to communicate them.
            </p>
          </li>
        </ul>
      </div>
    ),
  },
];

const useStyles = makeStyles({
  root: {
    marginTop: '48px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '26px',
  },
  link: {
    color: '#00A3FF',
  },
});

export default function FAQ() {
  const classes = useStyles();

  const [expanded, setExpanded] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleChange = useCallback(
    (index) => {
      const updated = [...expanded];
      updated[index] = !updated[index];
      setExpanded(updated);
    },
    [expanded]
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>FAQ</Typography>
      </div>
      {FAQText.map(({ question, answer }, index) => (
        <Accordion
          key={question}
          square
          expanded={expanded[index]}
          onChange={() => handleChange(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            {question}
          </AccordionSummary>
          <AccordionDetails>{answer}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
