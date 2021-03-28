
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'

import TopTags from 'parts/TopTags'
import CreateForm from './CreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(5, 3, 10),
    backgroundColor: theme.palette.background.default
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: theme.custom.layout.maxDesktopWidth,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3)
  },
}));

const CreateNFT = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Typography
          variant='h3'
          color='textPrimary'
          className={classes.header}
        >
          Create NFT
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TopTags />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CreateForm />
          </Grid>
        </Grid>
      </div>
    </main>
  )
}

export default memo(CreateNFT)