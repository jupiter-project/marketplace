
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
  GATE_WAY_BLOG_URL,
  JUP_WALLET_URL,
  JUP_SUPPORT_URL
} from 'utils/constants/common'
import SOCIALS from 'utils/constants/social'

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
    title: '1. NFT? Singleton Asset?',
    description: `A Non-Fungible Token (NFT) is a unit of data stored on a blockchain that certifies a digital 
    asset to be unique and therefore not interchangeable. NFTs can be used to represent items 
    such as photos, videos, audios, in-game items, and any other type of digital file. As an artist, 
    by tokenizing your work, you ensure that it is unique and that the ownership is provably 
    yours. Leda is an NFT marketplace that uses the Jupiter blockchain, where NFTs are called 
    Singleton Asset Tokens.`,
  },
  {
    title: '2. What is JUP?',
    description: (
      <>
        Jupiter (JUP) is the native coin of the Jupiter blockchain and you’ll need Jupiter coins to create
        your NFT or to buy a NFT. Wrapped JUP tokens are available as JUP on Ethereum{' '}
        <a href={UNISWAP_URL} target='_blank' rel='noreferrer'>
          Uniswap
        </a>{' '}
        {' and bwJUP on Binance Smart Chain '}
        <a href={PANCAKESWAP_URL} target='_blank' rel='noreferrer'>
          Pancakeswap
        </a>{' '}
        and can be sent from these platforms to your Jupiter mainnet address via a gateway. You can find
        the gateway procedure over{' '}
        <a href={GATE_WAY_BLOG_URL} target='_blank' rel='noreferrer'>
          here.
        </a>
      </>
    ),
  },
  {
    title: '3. How do I sign up?',
    description: `Leda doesn’t need any personal information, the only thing you need to have to be 
    able to use the marketplace is a Jupiter address. If you already have one, you can use that. 
    If you don’t have one or want to create a separate one for Leda, hit the Sign up button and follow 
    the steps. Be sure to write down your passphrase and save it in a secure place. If you lose your 
    passphrase, you’ll permanently lose access to your JUP coins and you can’t eventually (re)sell your NFTs.`,
  },
  {
    title: '4. How do I fund my account?',
    description: (
      <>
        You can buy wrapped Jupiter tokens on either{' '}
        <a href={UNISWAP_URL} target='_blank' rel='noreferrer'>
          Uniswap
        </a>{' '}
        {' or '}
        <a href={PANCAKESWAP_URL} target='_blank' rel='noreferrer'>
          Pancakeswap
        </a>
        {' and then send them via a '}
        <a href={GATE_WAY_BLOG_URL} target='_blank' rel='noreferrer'>
          gateway
        </a>
        {' to your mainnet Jupiter address (you can find your JUP address in the My Account tab, after logging in).'}
      </>
    ),
  },
  {
    title: '5. Why doesn\'t my balance update after funding it or doing a transaction?',
    description: `It will after you log out and log in again.`,
  },
  {
    title: '6. What if I lose my JUP address?',
    description: (
      <>
        If you have lost your JUP address, there isn’t any problem as long as you have your
        12-word passphrase. <br />
        Please head over to {' '}
        <a href={JUP_WALLET_URL} target='_blank' rel='noreferrer'>
          {JUP_WALLET_URL}
        </a>{' '}
        and click on the “Returning user” button. Next, click on the key icon below the logo,
        enter your 12-word passphrase and click on the arrow. Now the Jupiter wallet opens
        and at the top left you’ll see your JUP address.
      </>
    ),
  },
  {
    title: '7. What if I lose my 12-word passphrase?',
    description: `Unfortunately, without your passphrase, there is no possibility to access your account 
    anymore. You can still see your purchases by logging in with your JUP address, but you can’t 
    buy or sell anything or send your JUP coins anymore.`,
  },
  {
    title: '8. Do I need to enter my name on the My Account page?',
    description: `No this isn’t mandatory, you can use Leda without any additional information. Though, 
    content creators and sellers may want to use their (nick)name and eventually want to share other info, 
    which is displayed on the info pages of all of his/her NFTs. If you want to change your name or 
    additional info, just change the text and the update button will become clickable.`,
  },
  {
    title: '9. As a content creator, can I create and sell several copies of the same NFT?',
    description: `This is possible, but as every item is unique, if you would like to sell a picture in 
    a limited edition of 10 copies for example, you would have to create 10 individual NFTs, that
    then all have their own NFT ID. In the NFT description you then could for example include 
    something like “Limited edition,item 1/10” etc.`,
  },
  {
    title: '10. Can I put my NFT for sale without a price?',
    description: `No this isn’t possible. Jupiter NFTs work with a fixed ask price, they can’t be put for sale 
    without setting a price ceiling.`,
  },
  {
    title: '11. Can I add a time limit for my auction?',
    description: (
      <>
        The NFT system on the Jupiter blockchain doesn’t allow to enter a bidding period in the
        process itself, but if you really want to set a defined period for your sale there is a sort of workaround.
        <br />
        The info in your My Account section can be updated and is shown on the NFT detail page of all of your NFTs.
        If you would like to add a specific sell period for one of your NFTs you could update your account info
        with for example “sale of {'<NFT title>'} ends on {'<date/time UTC>'}”.
        <br />
        When that time has been reached you can cancel your sell order, and sell it to the person with the highest
        bid (by putting it for sale for the  price of the highest bid). Next, you can remove the auction info again
        from your account info.
        <br />
        Note: the description of the NFT itself can’t be changed, that is final once it has been created.
        So please don’t add any dates in there, they will be there forever and it would look very strange
        if the buyer of your NFT would like to resell it later on.
      </>
    ),
  },
  {
    title: '12. Why does it look like my buy/sell order isn’t placed?',
    description: (
      <>
        All actions have to be confirmed by the blockchain before they are shown in your account.
        On average this takes 1 minute, but can vary between a few seconds and a few minutes. So please wait
        a little bit longer.
        <br />
        Also, for some actions, a refresh of the webpage is needed before they are reflected.
      </>
    ),
  },
  {
    title: '13. How can I contact you?',
    description: (
      <>
        {'For more general questions, please join our Telegram channel '}
        <a href={SOCIALS.TELEGRAM.HREF} target='_blank' rel='noreferrer'>
          {SOCIALS.TELEGRAM.HREF}
        </a>{' '}
        There are always people around that are willing to help. For specific, personal questions, you can open
        a support ticket over{' '}
        <a href={JUP_SUPPORT_URL} target='_blank' rel='noreferrer'>
          here
        </a>.
      </>
    ),
  },

];