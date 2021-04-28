
import { memo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'

import ImageWall from 'parts/ImageWall'
import { useCommonStyles } from 'styles/use-styles'
import {
  UNISWAP_URL,
  PANCAKESWAP_URL,
} from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.layout.maxDesktopWidth,
    margin: theme.spacing(3, 0, 8)
  },
  accordion: {
    width: '100%',
    boxShadow: 'unset',
    backgroundColor: 'unset'
  },
  summary: {
    padding: theme.spacing(2, 0),
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  icon: {
    width: 35,
    height: 35,
  },
  active: {
    color: theme.palette.primary.main,
  },
  details: {
    padding: theme.spacing(1, 0),
  },
  description: {
    fontSize: 18,
    '& a': {
      color: theme.palette.primary.main,
    },
  },
}));

const FAQ = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const [expanded, setExpanded] = useState(false);

  const handleChange = useCallback((panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }, [setExpanded]);

  return (
    <main className={classes.root}>
      <ImageWall header={'FAQ'} />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            className={classes.accordion}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  className={clsx(classes.icon, {
                    [classes.active]: expanded === `panel${index}`,
                  })}
                />
              }
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={classes.summary}
            >
              <Typography
                className={clsx(classes.heading, {
                  [classes.active]: expanded === `panel${index}`,
                })}
              >
                {faq.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <Typography color='textSecondary' className={classes.description}>
                {faq.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </main>
  )
}

export default memo(FAQ)

const faqs = [
  {
    title: '1. NFT? Singleton Assets?',
    description: `NFT stands for non-fungible tokens and are unique digital items such as 
    NFTs or artworks or game (hmm should this be in-game?) items. As an artist, by 
    tokenizing your work you both ensure that it is unique and brand it as your work. 
    The actual ownership is blockchain-managed. Leda uses the Jupiter blockchain, where 
    NFT’s are called Singleton Asset Tokens.`,
  },
  {
    title: '2. What does “minting” mean?',
    description:
      'The process of tokenizing your work and creating an NFT (see above).',
  },
  {
    title: '3. What is verification?',
    description: `Verified badges are granted to creators and collectors that show enough proof 
    of authenticity and active dedication to the marketplace. We are looking at multiple factors 
    such as active social media presence and following, dialogue with community members, number 
    of minted and sold items.`,
  },
  {
    title: '4. What is JUP?',
    description: (
      <>
        Jupiter (JUP) is the native coin of the Jupiter blockchain and you will
        need Jupiter coins to create your NFT on our blockchain or to buy a NFT.
        Wrapped JUP tokens are available as JUP on Ethereum{' '}
        <a href={UNISWAP_URL} target='_blank' rel='noreferrer'>
          Uniswap
        </a>{' '}
        {' and bwJUP on Binance Smart Chain '}
        <a href={PANCAKESWAP_URL} target='_blank' rel='noreferrer'>
          Pancakeswap
        </a>{' '}
        and can be send from these platforms to your Jupiter mainnet account via
        a gateway. Please see here for more information.
      </>
    ),
  },
];