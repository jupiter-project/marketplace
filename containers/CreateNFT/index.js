
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import ImageWall from 'parts/ImageWall'
import CreateForm from './CreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.default
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 610,
    padding: theme.spacing(0, 2, 10),
  },
  header: {
    fontSize: 18,
    marginBottom: theme.spacing(3)
  },
}));

const CreateNFT = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <ImageWall header='CREATE NFT' />
      <div className={classes.container}>
        <Typography
          align='center'
          color='textPrimary'
          className={classes.header}
        >
          Please select your file type, upload your file and add a title for your NFT.
          <br />
          If you{"'"}d like to attach additional info you can enter this in the
          description box (sub-title, your name, inspiration, whether it is part of a
          series or a limited edition number, etc).
        </Typography>
        <CreateForm />
      </div>
    </main>
  )
}

export default memo(CreateNFT)