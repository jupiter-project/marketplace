
import { memo, useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as nftAPI from 'services/api-nft';
import GradientButton from 'components/UI/Buttons/GradientButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import UploadMedia from './UploadMedia'
import PreviewCard from './PreviewCard'
import {
  STRING_VALID,
  NUMBER_VALID,
  INTEGER_VALID
} from 'utils/constants/validations'
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast'
import useLoading from 'utils/hooks/useLoading'
import LINKS from 'utils/constants/links'

const schema = yup.object().shape({
  name: STRING_VALID,
  price: NUMBER_VALID,
  quantity: INTEGER_VALID
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
  const router = useRouter();
  const { changeLoadingStatus } = useLoading();

  const [fileBuffer, setFileBuffer] = useState(null);
  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');

  const { control, handleSubmit, errors, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const watchAllFields = watch();

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      let tags = ['nft'];
      if (tag1) {
        tags = [...tags, tag1]
      }
      if (tag2) {
        tags = [...tags, tag2]
      }

      const params = {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        tags: tags.join(', '),
        fileBuffer
      }

      const response = await nftAPI.createNFTtoken(params);
      showSuccessToast(response.message)
      router.push(LINKS.DASHBOARD.HREF)
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        showErrorToast(message)
      }
    }
    changeLoadingStatus(false)
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
              fileBuffer={fileBuffer}
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                as={<MagicTextField />}
                name='name'
                label='Name'
                placeholder='Name'
                error={errors.name?.message}
                control={control}
                defaultValue=''
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={<MagicTextField />}
                isOption
                multiline
                rows={4}
                name='description'
                label='Description'
                placeholder='Description'
                error={errors.description?.message}
                control={control}
                defaultValue=''
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={<MagicTextField />}
                name='price'
                label='Price'
                type='number'
                placeholder='Price'
                inputProps={{ min: 0 }}
                error={errors.price?.message}
                className={classes.input}
                control={control}
                defaultValue=''
              />
              <Controller
                as={<MagicTextField />}
                name='quantity'
                label='Quantity'
                type='number'
                placeholder='Quantity'
                inputProps={{ min: 1 }}
                error={errors.quantity?.message}
                control={control}
                defaultValue={1}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MagicTextField
                disabled
                isOption
                name='tag0'
                label='Tags'
                className={classes.input}
                value='nft'
              />
              <MagicTextField
                name='tag1'
                className={classes.input}
                placeholder='Second Tag'
                value={tag1}
                onChange={(e) => setTag1(e.target.value)}
              />
              <MagicTextField
                name='tag2'
                className={classes.input}
                placeholder='Third Tag'
                value={tag2}
                onChange={(e) => setTag2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <GradientButton
                type='submit'
                className={classes.button}
              >
                Create collectible
              </GradientButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </main>
  )
}

export default memo(CreateCollect)