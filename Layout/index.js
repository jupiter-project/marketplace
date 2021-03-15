
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import MagicLoading from 'components/MagicLoading'
import TopAppBar from './TopAppBar'
import Footer from './Footer'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative'
  },
  container: {
    flex: '1 0 auto'
  },
}));

const Layout = ({
  children
}) => {
  const classes = useStyles();
  const { loadingStatus } = useSelector(state => state.loading);

  return (
    <main className={classes.root}>
      {
        loadingStatus &&
        <MagicLoading loading={loadingStatus} />
      }
      <TopAppBar />
      <div className={classes.container}>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default memo(Layout);
