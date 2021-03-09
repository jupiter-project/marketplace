
import Link from 'next/link'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import SOCIALS from 'utils/constants/social'

const useStyles = makeStyles(() => ({
  root: {
    width: 48,
    height: 48
  }
}));

const FacebookIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Link
      href={SOCIALS.FACEBOOK.HREF}>
      <a aria-label={SOCIALS.FACEBOOK.LABEL} target='_blank' rel='noreferrer'>
        <SvgIcon viewBox={viewBox || '0 0 48 48'} {...rest} className={clsx(classes.root, className)}>
          <g id='Oval' fill='none' stroke='#009044' strokeMiterlimit='10' strokeWidth='2'>
            <circle cx='24' cy='24' r='24' stroke='none' />
            <circle cx='24' cy='24' r='23' fill='none' />
          </g>
          <path id='facebook' d='M2.571,5.333H0V8H2.571v8H6.429V8h2.34L9,5.333H6.429V4.223c0-.637.123-.889.717-.889H9V0H5.909C3.6,0,2.571,1.056,2.571,3.077Z' transform='translate(19 16)' fill='#009044' />
        </SvgIcon>
      </a>
    </Link>
  )
}

export default FacebookIcon;
