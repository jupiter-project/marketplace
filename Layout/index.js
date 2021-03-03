
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TopAppBar from './TopAppBar'
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative'
  },
  container: {
    paddingTop: theme.spacing(4),
  }
}));

const Layout = ({
  children
}) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <TopAppBar />
      <div className={classes.container}>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default memo(Layout);
