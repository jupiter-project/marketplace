
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    width: 131,
    height: 65
  }
}));

const DefaultImageIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox={viewBox || '0 0 131 65'} {...rest} className={clsx(classes.root, className)}>
      <g>
        <g>
          <path fill="#4D4E4E" d="M105.97,30.43c-5.41-6-21.47-21.81-40.44-21.81c-18.97,0-35.03,15.81-40.44,21.81
			c-1.15,1.28-1.15,3.27,0,4.54c5.41,6,21.47,21.81,40.44,21.81c18.97,0,35.03-15.81,40.44-21.81
			C107.12,33.7,107.12,31.71,105.97,30.43z M65.53,52.22c-10.78,0-19.52-8.74-19.52-19.52c0-10.78,8.74-19.52,19.52-19.52
			c10.78,0,19.52,8.74,19.52,19.52C85.05,43.49,76.31,52.22,65.53,52.22z"/>
          <path fill="#4D4E4E" d="M65.53,18.66c-7.76,0-14.04,6.29-14.04,14.04s6.29,14.04,14.04,14.04c7.76,0,14.04-6.29,14.04-14.04
			S73.28,18.66,65.53,18.66z M69.25,32.28c-2.37,0-4.3-1.92-4.3-4.3c0-2.37,1.92-4.3,4.3-4.3c2.37,0,4.3,1.92,4.3,4.3
			C73.55,30.35,71.63,32.28,69.25,32.28z"/>
        </g>
      </g>
    </SvgIcon>
  )
}

export default memo(DefaultImageIcon);
