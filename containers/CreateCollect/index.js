
import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import GradientButton from 'components/UI/Buttons/GradientButton'
import MagicTextField from 'components/UI/MagicTextField'
import UploadMedia from './UploadMedia'
import PreviewCard from './PreviewCard'
import {
  STRING_VALID,
  NUMBER_VALID
} from 'utils/constants/validations'
import { showErrorToast } from 'utils/helpers/toast'

const schema = yup.object().shape({
  name: STRING_VALID,
  royalties: NUMBER_VALID
});

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
    width: '100%',
    maxWidth: 650,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3)
  },
  media: {
    padding: theme.spacing(2, 0)
  },
  input: {
    marginBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2, 0)
  }
}));

const CreateCollect = () => {
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const [fileBuffer, setFileBuffer] = useState(null);

  const { control, handleSubmit, errors, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const watchAllFields = watch();

  const onSubmit = async (data) => {
    try {
      const params = {
        email: data.email,
        password: data.password
      }

      console.log(params)
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        showErrorToast(message)
      }
    }
  };

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Typography
          variant='h3'
          color='textPrimary'
          className={classes.header}
        >
          Create collectible
        </Typography>
        <Grid container spacing={3} className={classes.media}>
          <Grid item xs={12} sm={6} md={8}>
            <UploadMedia
              file={file}
              fileBuffer={fileBuffer}
              setFile={setFile}
              setFileBuffer={setFileBuffer}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PreviewCard
              item={watchAllFields}
              image={fileBuffer}
            />
          </Grid>
        </Grid>
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={<MagicTextField />}
            name='name'
            label='Name'
            error={errors.name?.message}
            className={classes.input}
            control={control}
            defaultValue=''
          />
          <Controller
            as={<MagicTextField />}
            isOption
            name='description'
            label='Description'
            error={errors.description?.message}
            className={classes.input}
            control={control}
            defaultValue=''
          />
          <Controller
            as={<MagicTextField />}
            isOption
            name='price'
            label='Price'
            type='number'
            inputProps={{ min: 0 }}
            error={errors.price?.message}
            className={classes.input}
            control={control}
            defaultValue=''
          />
          <Controller
            as={<MagicTextField />}
            name='royalties'
            label='Royalties'
            type='number'
            inputProps={{ min: 0, max: 100 }}
            error={errors.royalties?.message}
            className={classes.input}
            control={control}
            defaultValue=''
          />
          <GradientButton
            type='submit'
            className={classes.button}
          >
            Create collectible
          </GradientButton>
        </form>
      </div>
    </main >
  )
}

export default memo(CreateCollect)