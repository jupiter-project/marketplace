
import { memo } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

import SOCIALS from 'utils/constants/social'

const useStyles = makeStyles(() => ({
  root: {
    width: 24,
    height: 24
  }
}));

const TwitterIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Link
      href={SOCIALS.TWITTER.HREF}>
      <a aria-label={SOCIALS.TWITTER.LABEL} target='_blank' rel='noreferrer'>
        <SvgIcon viewBox={viewBox || '0 0 18 16'} {...rest} className={clsx(classes.root, className)}>
          <path d="M17.9655 2.42676C17.3018 2.71851 16.593 2.91726 15.8468 3.00801C16.6073 2.54976 17.1922 1.82751 17.469 0.965759C16.7558 1.38201 15.9653 1.68501 15.1238 1.85376C14.4518 1.13451 13.494 0.684509 12.4305 0.684509C10.3927 0.684509 8.7405 2.33676 8.7405 4.37226C8.7405 4.66476 8.77425 4.94601 8.83575 5.21526C5.76825 5.07051 3.0495 3.59751 1.23 1.37076C0.90975 1.91226 0.7305 2.54151 0.7305 3.22701C0.7305 4.50951 1.383 5.63676 2.3715 6.29901C1.76625 6.27951 1.197 6.11301 0.7005 5.83701V5.88276C0.7005 7.67151 1.97025 9.16326 3.66 9.50301C3.35025 9.58626 3.02325 9.63126 2.688 9.63126C2.4525 9.63126 2.22675 9.60876 2.001 9.56676C2.47425 11.0315 3.83475 12.0995 5.454 12.1295C4.194 13.1188 2.59725 13.7083 0.8775 13.7083C0.585 13.7083 0.29325 13.691 0 13.658C1.64175 14.7035 3.576 15.3148 5.66775 15.3148C12.4583 15.3148 16.167 9.69276 16.167 4.82526C16.167 4.66851 16.167 4.51026 16.1558 4.35276C16.8765 3.83601 17.5057 3.18276 18.0007 2.44176L17.9655 2.42676Z" fill="#fff"></path>
        </SvgIcon>
      </a>
    </Link>
  )
}

export default memo(TwitterIcon);