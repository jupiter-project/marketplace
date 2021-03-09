
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

import SOCIALS from 'utils/constants/social'

const useStyles = makeStyles(() => ({
  root: {
    width: 48,
    height: 48
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
        <SvgIcon viewBox={viewBox || '0 0 48 48'} {...rest} className={clsx(classes.root, className)}>
          <g id='Group_5' data-name='Group 5' transform='translate(-56)'>
            <g id='Oval' transform='translate(56)' fill='none' stroke='#009044' strokeMiterlimit='10' strokeWidth='2'>
              <circle cx='24' cy='24' r='24' stroke='none' />
              <circle cx='24' cy='24' r='23' fill='none' />
            </g>
            <path id='twitter' d='M16,1.54a6.572,6.572,0,0,1-1.885.517A3.3,3.3,0,0,0,15.559.241a6.57,6.57,0,0,1-2.085.8A3.284,3.284,0,0,0,7.88,4.029,9.324,9.324,0,0,1,1.115.6,3.286,3.286,0,0,0,2.131,4.982,3.277,3.277,0,0,1,.645,4.572,3.286,3.286,0,0,0,3.279,7.831,3.291,3.291,0,0,1,1.8,7.887a3.287,3.287,0,0,0,3.067,2.278A6.608,6.608,0,0,1,0,11.526,9.286,9.286,0,0,0,5.031,13a9.282,9.282,0,0,0,9.331-9.762A6.617,6.617,0,0,0,16,1.54Z' transform='translate(72 18)' fill='#009044' />
          </g>
        </SvgIcon>
      </a>
    </Link>
  )
}

export default TwitterIcon;