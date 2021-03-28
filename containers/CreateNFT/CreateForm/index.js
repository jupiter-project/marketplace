
import { memo, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as cloudinaryAPI from 'services/api-cloudinary'
import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import UploadMedia from '../UploadMedia'
import PreviewCard from '../PreviewCard'
import {
  STRING_VALID,
  PRICE_VALID,
  INTEGER_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import usePopUp from 'utils/hooks/usePopUp'
import useLoading from 'utils/hooks/useLoading'
import { isEmpty } from 'utils/helpers/utility'
import { NQT_WEIGHT } from 'utils/constants/common'
import LINKS from 'utils/constants/links'
import MESSAGES from 'utils/constants/messages'
import clsx from 'clsx'

const schema = yup.object().shape({
  name: STRING_VALID,
  price: PRICE_VALID,
  quantity: INTEGER_VALID,
  passphrase: PASSPHRASE_VALID
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  media: {
    padding: theme.spacing(2, 0)
  },
  input: {
    marginBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(5, 1)
  },
  resetButton: {
    backgroundColor: theme.custom.palette.red
  }
}));

const CreateForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();

  const { currentUser } = useSelector(state => state.auth);
  const [fileBuffer, setFileBuffer] = useState(null);
  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');

  const { control, handleSubmit, errors, watch, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const watchAllFields = watch();

  const resetHandler = useCallback(() => {
    setFileBuffer(null)
    setTag1('')
    setTag2('')
    reset({
      name: '',
      price: '',
      quantity: 1
    })
  }, [reset, setFileBuffer, setTag1, setTag2])

  const onSubmit = useCallback(async (data) => {
    if (isEmpty(currentUser)) {
      setPopUp({ text: MESSAGES.AUTH_REQUIRED })
      router.push(LINKS.SIGN_IN.HREF)
      return;
    }

    if (!fileBuffer) {
      setPopUp({ text: MESSAGES.IMAGE_NOT_FOUND })
      return;
    }

    changeLoadingStatus(true)
    try {
      let tags = ['nft'];
      if (tag1) tags = [...tags, tag1]
      if (tag2) tags = [...tags, tag2]

      const { image = '' } = await cloudinaryAPI.uploadFileCloudinary({ fileBuffer });
      const params = {
        name: data.name,
        price: data.price * NQT_WEIGHT,
        quantity: data.quantity,
        tags: tags.join(', '),
        secretPhrase: data.passphrase,
        publicKey: currentUser.publicKey,
        description: image,
      }

      const response = await jupiterAPI.createNFTToken(params)
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.CREATE_NFT_ERROR })
        changeLoadingStatus(false)
        return;
      }

      setPopUp({ text: MESSAGES.CREATE_NFT_SUCCESS })
      resetHandler();
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.CREATE_NFT_ERROR })
    }
    changeLoadingStatus(false)
  }, [tag1, tag2, router, fileBuffer, currentUser, resetHandler, setPopUp, changeLoadingStatus]);

  return (
    <>
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
          <Grid item xs={12} sm={6}>
            <Controller
              as={<MagicTextField />}
              name='price'
              label='Price (JUP)'
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
            <Controller
              as={<MagicTextField />}
              type='password'
              name='passphrase'
              label='Passphrase'
              placeholder='Passphrase'
              error={errors.passphrase?.message}
              control={control}
              defaultValue=''
            />
          </Grid>
        </Grid>
        <div>
          <ContainedButton
            type='submit'
            className={classes.button}
          >
            Create NFT
          </ContainedButton>
          <ContainedButton
            onClick={resetHandler}
            className={clsx(classes.button, classes.resetButton)}
          >
            Reset
          </ContainedButton>
        </div>
      </form>
    </>
  )
}

export default memo(CreateForm)