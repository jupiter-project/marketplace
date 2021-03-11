
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Select,
  MenuItem
} from '@material-ui/core'

import MagicTextField from 'components/UI/TextFields/MagicTextField'

const useStyles = makeStyles(theme => ({
  menuPaper: {
    backgroundColor: theme.palette.background.primary
  },
  icon: {
    borderRadius: 6,
    marginRight: theme.spacing(1),
    color: theme.palette.text.primary
  },
  placeholder: {
    color: theme.custom.palette.lightBlack,
  }
}));

const MagicSelect = React.forwardRef(({
  items,
  placeholder,
  label,
  ...rest
}, ref) => {

  const classes = useStyles();

  return (
    <Select
      id='demo-customized-select'
      ref={ref}
      input={<MagicTextField label={label} />}
      displayEmpty
      classes={{
        icon: classes.icon
      }}
      MenuProps={{
        classes: {
          paper: classes.menuPaper
        }
      }}
      placeholder={placeholder}
      {...rest}
    >
      {
        placeholder &&
        <MenuItem
          key='placeholder'
          value=''
          className={classes.placeholder}
        >
          {placeholder}
        </MenuItem>
      }
      {
        items.map((item, index) => (
          <MenuItem
            key={index}
            value={item.VALUE}
          >
            {item.LABEL}
          </MenuItem>
        ))
      }
    </Select>
  );
});

export default memo(MagicSelect);