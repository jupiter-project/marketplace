
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(3),
  }
}));

const GreyEyeIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox={viewBox || '0 0 83 49'} {...rest} className={clsx(classes.root, className)}>
      <g>
        <g>
          <path fill="#999999" d="M82.02,22.28c-5.41-6-21.47-21.81-40.44-21.81S6.55,16.28,1.14,22.28c-1.15,1.28-1.15,3.27,0,4.54
			c5.41,6,21.47,21.81,40.44,21.81s35.03-15.81,40.44-21.81C83.17,25.55,83.17,23.56,82.02,22.28z M41.58,44.07
			c-10.78,0-19.52-8.74-19.52-19.52S30.8,5.03,41.58,5.03S61.1,13.77,61.1,24.55C61.1,35.34,52.36,44.07,41.58,44.07z"/>
        </g>
        <g>
          <path fill="#999999" d="M41.58,10.51c-7.76,0-14.04,6.29-14.04,14.04s6.29,14.04,14.04,14.04c7.76,0,14.04-6.29,14.04-14.04
			S49.33,10.51,41.58,10.51z M45.3,24.13c-2.37,0-4.3-1.92-4.3-4.3c0-2.37,1.92-4.3,4.3-4.3c2.37,0,4.3,1.92,4.3,4.3
			C49.6,22.2,47.68,24.13,45.3,24.13z"/>
        </g>
      </g>
    </SvgIcon>
  )
}

export default memo(GreyEyeIcon);
