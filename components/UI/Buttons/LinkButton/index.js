
import React, { memo } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'unset',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    }
  }
}));

const LinkButton = ({
  className,
  href,
  as,
  target = '',
  onClick = () => { },
  children
}) => {
  const classes = useStyles();

  return href
    ? (
      <Link
        as={as}
        href={href}
      >
        <a
          target={target}
          className={clsx(classes.root, className)}
        >
          {children}
        </a>
      </Link>
    ) : (
      <Typography
        className={clsx(classes.root, className)}
        onClick={onClick}
      >
        {children}
      </Typography>
    )
};

export default memo(LinkButton);