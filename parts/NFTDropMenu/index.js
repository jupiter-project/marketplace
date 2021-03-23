
import { memo, useCallback, useState } from 'react'
import {
  Menu,
  MenuItem,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 120,
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.custom.palette.grey}`,
    padding: theme.spacing(1)
  },
  item: {
    borderRadius: 4,
    color: theme.palette.primary.main,
  }
}));

const NFTDropMenu = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <>
      <IconButton aria-label='settings' onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <div>
          <MenuItem className={classes.item}>
            Place a bid
          </MenuItem>
          <MenuItem className={classes.item}>
            Report
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default memo(NFTDropMenu);