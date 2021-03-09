
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

const InstagramIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Link href={SOCIALS.INSTAGRAM.HREF}>
      <a aria-label={SOCIALS.INSTAGRAM.LABEL} target='_blank' rel='noreferrer'>
        <SvgIcon viewBox={viewBox || '0 0 48 48'} {...rest} className={clsx(classes.root, className)}>
          <g fillRule="nonzero" fill="none">
            <circle stroke="#009044" strokeWidth="2" cx="24" cy="24" r="23" />
            <path d="M24 17.443c2.136 0 2.39.008 3.233.046 2.17.099 3.18 1.127 3.28 3.279.038.844.046 1.096.046 3.232s-.008 2.39-.046 3.232c-.1 2.15-1.109 3.181-3.28 3.28-.844.037-1.096.047-3.233.047-2.136 0-2.39-.008-3.232-.047-2.173-.1-3.18-1.132-3.28-3.28-.037-.843-.047-1.096-.047-3.232s.01-2.39.047-3.232c.099-2.153 1.11-3.181 3.28-3.28.843-.039 1.096-.045 3.232-.045zM24 16c-2.173 0-2.444.01-3.299.05-2.906.133-4.52 1.745-4.653 4.651C16.009 21.556 16 21.828 16 24c0 2.173.01 2.445.048 3.299.133 2.905 1.747 4.52 4.653 4.653.855.039 1.126.048 3.299.048s2.445-.01 3.3-.048c2.901-.133 4.521-1.745 4.652-4.653.039-.854.048-1.126.048-3.299 0-2.172-.01-2.444-.048-3.299-.13-2.902-1.745-4.52-4.652-4.652-.855-.04-1.127-.049-3.3-.049zm0 3.892a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm0 6.775a2.666 2.666 0 110-5.334A2.668 2.668 0 0126.668 24 2.668 2.668 0 0124 26.667zm4.27-7.896a.96.96 0 100 1.92.96.96 0 000-1.92z" fill="#009044" />
          </g>
        </SvgIcon>
      </a>
    </Link>
  )
}

export default InstagramIcon;