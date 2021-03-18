
import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import LinkButton from 'components/UI/Buttons/LinkButton'
import ImageWall from 'parts/ImageWall'
import { SUPPORT_EMAIL, SITE_URL } from 'utils/constants/contact'
import LINKS from 'utils/constants/links'
import { useCommonStyles } from 'styles/use-styles'

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
    margin: theme.spacing(3, 0)
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    margin: theme.spacing(2, 0),
    color: theme.palette.primary.main
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 600,
    margin: theme.spacing(1, 0)
  },
  description: {
    fontSize: 18,
    margin: theme.spacing(1, 0)
  },
  link: {
    fontSize: 18,
    fontWeight: 'lighter',
    color: `${theme.palette.primary.main} !important`
  },
  list: {
    fontSize: 18,
    maxWidth: 650,
    margin: theme.spacing(0.5, 0),
    '& li': {
      marginBottom: theme.spacing(0.5)
    }
  }
}));

const TermsOfService = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <main className={classes.root}>
      <ImageWall header={'Terms Of Service'} />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        <Typography className={classes.description}>
          Please read these Terms of Use (“<b>Terms</b>”, “<b>Terms of Use</b>”) carefully before using the{' '}
          <LinkButton href={LINKS.HOME.HREF} className={classes.link}>
            {SITE_URL}
          </LinkButton>
          {' '}website (the “<b>Service</b>”) operated by Jupiter Project “<b>Us</b>,” “<b>We</b>,” or
          “<b>Our</b>”).
        </Typography>
        <Typography className={classes.description}>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
          These Terms apply to all visitors, users and others who access or use the Service.
        </Typography>
        <Typography className={classes.description}>
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
          terms then you may not access the Service.
        </Typography>

        <Typography className={classes.title}>
          Links To Other Web Sites
        </Typography>
        <Typography className={classes.description}>
          Our Service may contain links to third-party web sites or services that are not owned or controlled
          by Jupiter Project.
        </Typography>
        <Typography className={classes.description}>
          Jupiter Project has no control over, and assumes no responsibility for, the content, privacy policies, or
          practices of any third party web sites or services. You further acknowledge and agree that Jupiter Project
          shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be
          caused by or in connection with use of or reliance on any such content, goods or services available on or
          through any such web sites or services.
        </Typography>
        <Typography className={classes.description}>
          We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites
          or services that you visit.
        </Typography>

        <Typography className={classes.title}>
          Termination
        </Typography>
        <Typography className={classes.description}>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for any
          reason whatsoever, including without limitation if you breach the{' '}
          <LinkButton href={LINKS.TERMS_OF_SERVICE.HREF} className={classes.link}>
            Terms
          </LinkButton>.
        </Typography>
        <Typography className={classes.description}>
          All provisions of the Terms which by their nature should survive termination shall survive termination,
          including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of
          liability.
        </Typography>

        <Typography className={classes.title}>
          Governing Law
        </Typography>
        <Typography className={classes.description}>
          These Terms shall be governed and construed in accordance with the laws of Missouri, United States, without
          regard to its conflict of law provisions.
        </Typography>
        <Typography className={classes.description}>
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions
          of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our
          Service, and supersede and replace any prior agreements we might have between us regarding the Service.
        </Typography>

        <Typography className={classes.title}>
          Changes
        </Typography>
        <Typography className={classes.description}>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
          is material we will try to provide at least 30 days notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole discretion.
        </Typography>
        <Typography className={classes.description}>
          By continuing to access or use our Service after those revisions become effective, you agree to be bound
          by the revised terms. If you do not agree to the new terms, please stop using the Service.
        </Typography>

        <Typography className={classes.title}>
          Contact Us
        </Typography>
        <Typography className={classes.description}>
          {'If you have any questions about these Terms, please '}
          <LinkButton href={`mailto:${SUPPORT_EMAIL}`} className={classes.link}>
            contact us
          </LinkButton>.
        </Typography>
      </div>
    </main>
  )
}

export default memo(TermsOfService)