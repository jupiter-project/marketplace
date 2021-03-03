
import { memo } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

import LINKS from 'utils/constants/links'
import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles(() => ({
  picture: {
    display: 'flex',
  },
  img: {
    width: 65,
    height: 65,
    objectFit: 'contain'
  },
}));

const Logo = ({
  className,
  ...rest
}) => {
  const classes = useStyles();

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
