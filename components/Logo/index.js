
import { memo } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

import LINKS from 'utils/constants/links'
import {
  WHITE_LOGO_IMAGE_PATH,
  BLACK_LOGO_IMAGE_PATH
} from 'utils/constants/image-paths'

const useStyles = makeStyles(() => ({
  picture: {
    display: 'flex',
  },
  img: {
    width: 120,
    height: 40,
    objectFit: 'contain'
  },
}));

const Logo = ({
  isWhite = false,
  className,
  ...rest
}) => {
  const classes = useStyles();

  const LOGO_IMAGE_PATH = isWhite ? WHITE_LOGO_IMAGE_PATH : BLACK_LOGO_IMAGE_PATH;

  return (
    <Link href={LINKS.HOME.HREF}>
      <a className={className}>
        <picture className={classes.picture} {...rest}>
          <source srcSet={LOGO_IMAGE_PATH} />
          <img
            className={classes.img}
            src={LOGO_IMAGE_PATH}
            alt='logo' />
        </picture>
      </a>
    </Link>
  )
}

export default memo(Logo);
