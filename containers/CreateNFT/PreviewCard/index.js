import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import DefaultImageIcon from 'components/Icons/DefaultImageIcon'
import { FILE_TYPES } from 'utils/constants/file-types'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 220,
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.custom.palette.border}`,
  },
  defaultImage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.custom.palette.grey
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain'
  },
}));

const PreviewCard = ({
  type,
  fileBuffer
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!!fileBuffer
        ? (
          type === FILE_TYPES.IMAGE.VALUE
            ? (
              <img
                alt='image'
                src={fileBuffer || IMAGE_PLACEHOLDER_IMAGE_PATH}
                className={classes.image}
              />
            ) : (
              <video muted autoPlay loop controls className={classes.image}>
                <source src={fileBuffer} />
              </video>
            )
        ) : (
          <div className={classes.defaultImage}>
            <DefaultImageIcon />
          </div>
        )
      }
    </div>
  );
}

export default memo(PreviewCard)