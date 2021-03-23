
import { memo } from 'react'
import Link from 'next/link'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import SOCIALS from 'utils/constants/social'

const useStyles = makeStyles(() => ({
  root: {
    width: 24,
    height: 24
  }
}));

const TelegramIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Link
      href={SOCIALS.TELEGRAM.HREF}>
      <a aria-label={SOCIALS.TELEGRAM.LABEL} target='_blank' rel='noreferrer'>
        <SvgIcon viewBox={viewBox || '0 0 18 16'} {...rest} className={clsx(classes.root, className)}>
          <path d="M15.9513 1.29916L13.5438 13.1556C13.377 13.997 12.8902 14.1987 12.21 13.8093L8.542 10.979L6.76804 12.7662C6.56797 12.9748 6.40125 13.1556 6.03445 13.1556C5.55428 13.1556 5.63431 12.9679 5.47425 12.495L4.20714 8.19051L0.572523 7.00834C-0.214421 6.76495 -0.22109 6.20168 0.745918 5.7914L14.9243 0.0891779C15.5711 -0.209841 16.1914 0.256072 15.9446 1.29221L15.9513 1.29916Z" fill="#fff"></path>
        </SvgIcon>
      </a>
    </Link>
  )
}

export default memo(TelegramIcon);
