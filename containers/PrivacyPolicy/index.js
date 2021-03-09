
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

const PrivacyPolicy = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles();

  return (
    <main className={classes.root}>
      <ImageWall header={'Privacy Policy'} />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        <Typography className={classes.description}>
          Jupiter Project (“<b>Us</b>,” “<b>We</b>,” or  “<b>Our</b>”) operates the{' '}
          <LinkButton href={LINKS.HOME.HREF} className={classes.link}>
            {SITE_URL}
          </LinkButton>
          {' '}website (hereinafter referred to as the “<b>Service</b>”).
        </Typography>
        <Typography className={classes.description}>
          This page informs you of our policies regarding the collection, use and disclosure of personal
          data when you use our Service and the choices you have associated with that data.
        </Typography>
        <Typography className={classes.description}>
          We use your data to provide and improve the Service. By using the Service, you agree to the collection
          and use of information in accordance with this policy. Unless otherwise defined in this{' '}
          <LinkButton href={LINKS.PRIVACY_POLICY.HREF} className={classes.link}>
            Privacy Policy
          </LinkButton>
          {', the terms used in this Privacy Policy have the same meanings as in our '}
          <LinkButton href={LINKS.TERMS_OF_SERVICE.HREF} className={classes.link}>
            Terms and Conditions
          </LinkButton>
          {', accessible from '}
          <LinkButton href={LINKS.HOME.HREF} className={classes.link}>
            {SITE_URL}
          </LinkButton>
        </Typography>

        <Typography className={classes.title}>
          Definitions
        </Typography>
        <ul className={classes.list}>
          <li>
            {'Service is the '}
            <LinkButton href={LINKS.HOME.HREF} className={classes.link}>
              {SITE_URL}
            </LinkButton>
            {' website operated by Jupiter Project'}
          </li>
          <li>
            Personal Data Personal Data means data about a living individual who can be identified from those data
            (or from those and other information either in our possession or likely to come into our possession).
          </li>
          <li>
            Usage Data Usage Data is data collected automatically either generated by the use of the Service or
            from the Service infrastructure itself (for example, the duration of a page visit).
          </li>
          <li>Cookies are small files stored on your device (computer or mobile device).</li>
          <li>
            Data Controller Data Controller means the natural or legal person who (either alone or jointly or
            in common with other persons) determines the purposes for which and the manner in which any personal
            information are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller
            of your Personal Data.
          </li>
          <li>
            Data Processors (or Service Providers) Data Processor (or Service Provider) means any natural or legal
            person who processes the data on behalf of the Data Controller. We may use the services of various
            Service Providers in order to process your data more effectively.
          </li>
          <li>
            Data Subject (or User) Data Subject is any living individual who is using our Service and is the subject
            of Personal Data.
          </li>
        </ul>

        <Typography className={classes.title}>
          Information Collection and Use
        </Typography>

        <Typography className={classes.subtitle}>
          Personal Data
        </Typography>
        <Typography className={classes.description}>
          While using our Service, we may ask you to provide us with certain personally identifiable information that
          can be used to contact or identify you (“<b>Personal Data</b>”). Personally identifiable information may include,
          but is not limited to:
        </Typography>
        <ul className={classes.list}>
          <li>Email address</li>
          <li>Cookies and Usage Data</li>
        </ul>
        <Typography className={classes.description}>
          We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other
          information that may be of interest to you. You may opt out of receiving any, or all, of these communications
          from us by following the unsubscribe link or the instructions provided in any email we send.
        </Typography>

        <Typography className={classes.subtitle}>
          Usage Data
        </Typography>
        <Typography className={classes.description}>
          We may also collect information on how the Service is accessed and used (“<b>Usage Data</b>”).
          This Usage Data may include information such as your computer’s Internet Protocol address (e.g. IP address),
          browser type, browser version, the pages of our Service that you visit, the time and date of your visit,
          the time spent on those pages, unique device identifiers and other diagnostic data.
        </Typography>

        <Typography className={classes.subtitle}>
          Tracking & Cookies Data
        </Typography>
        <Typography className={classes.description}>
          We use cookies and similar tracking technologies to track the activity on our Service and we hold
          certain information.
        </Typography>
        <Typography className={classes.description}>
          Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies
          are sent to your browser from a website and stored on your device. Other tracking technologies are also
          used such as beacons, tags and scripts to collect and track information and to improve and analyse our Service.
        </Typography>
        <Typography className={classes.description}>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
          if you do not accept cookies, you may not be able to use some portions of our Service.
        </Typography>
        <Typography className={classes.description}>
          Examples of Cookies we use:
        </Typography>
        <ul className={classes.list}>
          <li>Session Cookies. We use Session Cookies to operate our Service.</li>
          <li>Preference Cookies. We use Preference Cookies to remember your preferences and various settings.</li>
          <li>Security Cookies. We use Security Cookies for security purposes.</li>
        </ul>

        <Typography className={classes.title}>
          Use of Data
        </Typography>
        <Typography className={classes.description}>
          Jupiter Project uses the collected data for various purposes:
        </Typography>
        <ul className={classes.list}>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>
            To provide you with news, special offers and general information about other goods, services
            and events which we offer that are similar to those that you have already purchased or enquired
            about unless you have opted not to receive such information
          </li>
        </ul>

        <Typography className={classes.title}>
          Legal Basis for Processing Personal Data under the General Data Protection Regulation (GDPR)
        </Typography>
        <Typography className={classes.description}>
          If you are from the European Economic Area (EEA), Jupiter Project legal basis for collecting and
          using the personal information described in this Privacy Policy depends on the Personal Data we
          collect and the specific context in which we collect it.
        </Typography>
        <Typography className={classes.description}>
          Jupiter Project may process your Personal Data because:
        </Typography>
        <ul className={classes.list}>
          <li>We need to perform a contract with you</li>
          <li>You have given us permission to do so</li>
          <li>The processing is in our legitimate interests and it is not overridden by your rights</li>
          <li>To comply with the law</li>
        </ul>

        <Typography className={classes.title}>
          Retention of Data
        </Typography>
        <Typography className={classes.description}>
          Jupiter Project will retain your Personal Data only for as long as is necessary for the purposes
          set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary
          to comply with our legal obligations (for example, if we are required to retain your data to comply
          with applicable laws), resolve disputes and enforce our legal agreements and policies.
        </Typography>
        <Typography className={classes.description}>
          Jupiter Project will also retain Usage Data for internal analysis purposes. Usage Data is generally
          retained for a shorter period of time, except when this data is used to strengthen the security or
          to improve the functionality of our Service, or we are legally obligated to retain this data for
          longer periods.
        </Typography>

        <Typography className={classes.title}>
          Transfer of Data
        </Typography>
        <Typography className={classes.description}>
          Your information, including Personal Data, may be transferred to – and maintained on – computers
          located outside of your state, province, country or other governmental jurisdiction where the data
          protection laws may differ from those of your jurisdiction.
        </Typography>
        <Typography className={classes.description}>
          If you are located outside United States and choose to provide information to us, please note
          that we transfer the data, including Personal Data, to United States and process it there.
        </Typography>
        <Typography className={classes.description}>
          {'Your consent to this '}
          <LinkButton href={LINKS.PRIVACY_POLICY.HREF} className={classes.link}>
            Privacy Policy
          </LinkButton>
          {' '}followed by your submission of such information represents your agreement to that transfer.
        </Typography>
        <Typography className={classes.description}>
          Jupiter Project will take all the steps reasonably necessary to ensure that your data is treated
          securely and in accordance with this Privacy Policy and no transfer of your Personal Data will
          take place to an organization or a country unless there are adequate controls in place including
          the security of your data and other personal information.
        </Typography>

        <Typography className={classes.title}>
          Disclosure of Data
        </Typography>
        <Typography className={classes.description}>
          Legal Requirements
        </Typography>
        <Typography className={classes.description}>
          Jupiter Project may disclose your Personal Data in the good faith belief that such action is necessary to:
        </Typography>
        <ul className={classes.list}>
          <li>To comply with a legal obligation</li>
          <li>To protect and defend the rights or property of Jupiter Project</li>
          <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
          <li>To protect the personal safety of users of the Service or the public</li>
          <li>To protect against legal liability</li>
        </ul>

        <Typography className={classes.title}>
          Security of Data
        </Typography>
        <Typography className={classes.description}>
          The security of your data is important to us but remember that no method of transmission over the
          Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
          means to protect your Personal Data, we cannot guarantee its absolute security.
        </Typography>
        <Typography className={classes.description}>
          Our Policy on “<b>Do Not Track</b>” Signals under the California Online Protection Act (CalOPPA)
        </Typography>
        <Typography className={classes.description}>
          We do not support Do Not Track (“<b>DNT”</b>). Do Not Track is a preference you can set in your web
          browser to inform websites that you do not want to be tracked.
        </Typography>
        <Typography className={classes.description}>
          You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.
        </Typography>
        <Typography className={classes.description}>
          Your Data Protection Rights under the General Data Protection Regulation (GDPR)
        </Typography>
        <Typography className={classes.description}>
          If you are a resident of the European Economic Area (EEA), you have certain data protection rights.
          Jupiter Project aims to take reasonable steps to allow you to correct, amend, delete or limit the
          use of your Personal Data.
        </Typography>
        <Typography className={classes.description}>
          If you wish to be informed about what Personal Data we hold about you and if you want it to be removed
          from our systems, please{' '}
          <LinkButton href={`mailto:${SUPPORT_EMAIL}`} className={classes.link}>
            contact us
          </LinkButton>.
        </Typography>
        <Typography className={classes.description}>
          In certain circumstances, you have the following data protection rights:
        </Typography>
        <ul className={classes.list}>
          <li>
            The right to access, update or delete the information we have on you. Whenever made possible,
            you can access, update or request deletion of your Personal Data directly within your account
            settings section. If you are unable to perform these actions yourself, please contact us to assist you.
          </li>
          <li>
            The right of rectification. You have the right to have your information rectified if that
            information is inaccurate or incomplete.
          </li>
          <li>
            The right to object. You have the right to object to our processing of your Personal Data.
          </li>
          <li>
            The right of restriction. You have the right to request that we restrict the processing of your
            personal information.
          </li>
          <li>
            The right to data portability. You have the right to be provided with a copy of the information
            we have on you in a structured, machine-readable and commonly used format.
          </li>
          <li>
            The right to withdraw consent. You also have the right to withdraw your consent at any time where
            Jupiter Project relied on your consent to process your personal information.
          </li>
        </ul>
        <Typography className={classes.description}>
          Please note that we may ask you to verify your identity before responding to such requests.
        </Typography>
        <Typography className={classes.description}>
          You have the right to complain to a Data Protection Authority about our collection and use
          of your Personal Data. For more information, please contact your local data protection authority
          in the European Economic Area (EEA).
        </Typography>

        <Typography className={classes.title}>
          Service Providers
        </Typography>
        <Typography className={classes.description}>
          We may employ third party companies and individuals to facilitate our Service (“<b>Service Providers</b>”),
          provide the Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.
        </Typography>
        <Typography className={classes.description}>
          These third parties have access to your Personal Data only to perform these tasks on our behalf and are
          obligated not to disclose or use it for any other purpose.
        </Typography>

        <Typography className={classes.title}>
          Analytics
        </Typography>
        <Typography className={classes.description}>
          We may use third-party Service Providers to monitor and analyse the use of our Service.
        </Typography>
        <ul className={classes.list}>
          <li>
            Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.
            Google uses the data collected to track and monitor the use of our Service. This data is shared with
            other Google services. Google may use the collected data to contextualise and personalise the ads of
            its own advertising network. You can opt-out of having made your activity on the Service available
            to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents
            the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google
            Analytics about visits activity. For more information on the privacy practices of Google, please
            visit the Google Privacy & Terms web page:{' '}
            <LinkButton href={'https://policies.google.com/privacy?hl=en'} className={classes.link}>
              https://policies.google.com/privacy?hl=en
            </LinkButton>.
          </li>
        </ul>

        <Typography className={classes.title}>
          Links to Other Sites
        </Typography>
        <Typography className={classes.description}>
          Our Service may contain links to other sites that are not operated by us. If you click a third party link,
          you will be directed to that third party’s site. We strongly advise you to review the{' '}
          <LinkButton href={LINKS.PRIVACY_POLICY.HREF} className={classes.link}>
            Privacy policy
          </LinkButton>
          {' of every site you visit.'}
        </Typography>
        <Typography className={classes.description}>
          We have no control over and assume no responsibility for the content, privacy policies or practices of
          any third party sites or services.
        </Typography>

        <Typography className={classes.title}>
          Children’s Privacy
        </Typography>
        <Typography className={classes.description}>
          Our Service does not address anyone under the age of 18 (“<b>Children</b>”).
        </Typography>
        <Typography className={classes.description}>
          We do not knowingly collect personally identifiable information from anyone under the age of 18.
          If you are a parent or guardian and you are aware that your Child has provided us with Personal Data,
          please contact us. If we become aware that we have collected Personal Data from children without
          verification of parental consent, we take steps to remove that information from our servers.
        </Typography>

        <Typography className={classes.title}>
          Changes to This Privacy Policy
        </Typography>
        <Typography className={classes.description}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting
          the new Privacy Policy on this page.
        </Typography>
        <Typography className={classes.description}>
          We will let you know via email and/or a prominent notice on our Service, prior to the change
          becoming effective and update the “effective date” at the top of this Privacy Policy.
        </Typography>
        <Typography className={classes.description}>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this
          Privacy Policy are effective when they are posted on this page.
        </Typography>

        <Typography className={classes.title}>
          Contact Us
        </Typography>
        <Typography className={classes.description}>
          If you have any questions about this Privacy Policy, please contact us:
        </Typography>
        <ul className={classes.list}>
          <li>
            {'By email: '}
            <LinkButton href={`mailto:${SUPPORT_EMAIL}`} className={classes.link}>
              {SUPPORT_EMAIL}
            </LinkButton>.
          </li>
        </ul>
      </div>
    </main>
  )
}

export default memo(PrivacyPolicy)