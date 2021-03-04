
import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import { PLACE_FILLER_URL } from 'utils/constants/common';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(8, 3)
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 720,
    width: '100%'
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(8),
    maxWidth: 380,
    [theme.breakpoints.down('sm')]: {
      fontSize: 42,
      marginBottom: theme.spacing(5),
    },
  },
  accordion: {
    width: '100%',
    boxShadow: 'unset'
  },
  summary: {
    padding: theme.spacing(2, 0)
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  icon: {
    width: 35,
    height: 35
  },
  active: {
    color: theme.palette.primary.main
  },
  details: {
    padding: theme.spacing(1, 0)
  },
  description: {
    fontSize: 18,
    '& a': {
      color: theme.palette.primary.main
    }
  }
}));

const HomeFAQs = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography variant='h1' className={classes.title}>
          FAQ
        </Typography>
        {
          FAQs.map((faq, index) => (
            <Accordion
              key={index}
              className={classes.accordion}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className={clsx(classes.icon, { [classes.active]: expanded === `panel${index}` })} />
                }
                aria-controls='panel1a-content'
                id='panel1a-header'
                className={classes.summary}
              >
                <Typography className={clsx(classes.heading, { [classes.active]: expanded === `panel${index}` })}>
                  {faq.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <Typography color='textSecondary' className={classes.description}>
                  {faq.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </section>
  );
};

export default memo(HomeFAQs);

const FAQs = [
  {
    title: 'NFT? Singleton Assets?',
    description: `NFT stands for non-fungible tokens like Singleton Asset Tokens which are 
    hosted on Jupiter's own blockchain. NFTs are unique digital items such as collectibles 
    or artworks or game items. As an artist, by tokenizing your work you both ensure that 
    it is unique and brand it as your work. The actual ownership is blockchain-managed.`,
  },
  {
    title: 'What does “minting” mean?',
    description: 'The process of tokenizing your work and creating an NFT (see above).',
  },
  {
    title: 'What is verification?',
    description: `Verified badges are granted to creators and collectors that show enough proof 
    of authenticity and active dedication to the marketplace. We are looking at multiple factors 
    such as active social media presence and following, dialogue with community members, number 
    of minted and sold items.`,
  },
  {
    title: 'What is $JUP and how is it distributed?',
    description: <>Jupiter is the native token of the Jupiter blockchain. Jupiter is available
    as a tokenized instance (an NFT, if you will) on Ethereum ($JUP) and Binance Smart Chain
    ($bwJUP). You will need Jupiter tokens to create your NFT on our blockchain.
    Please see <a href={PLACE_FILLER_URL} target='_blank' rel='noreferrer'>here</a> for more information.</>,
  },
]