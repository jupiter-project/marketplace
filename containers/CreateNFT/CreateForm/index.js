
import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import clsx from 'clsx'

import * as cloudinaryAPI from 'services/api-cloudinary'
import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicSelect from 'components/UI/MagicSelect'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import UploadMedia from '../UploadMedia'
import PreviewCard from '../PreviewCard'
import {
  STRING_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import usePopUp from 'utils/hooks/usePopUp'
import useLoading from 'utils/hooks/useLoading'
import MESSAGES from 'utils/constants/messages'
import { FILE_TYPES, FILE_TYPES_ARRAY } from 'utils/constants/file-types'

const schema = yup.object().shape({
  name: STRING_VALID,
  description: STRING_VALID,
  type: STRING_VALID,
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
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();

  const { currentUser } = useSelector(state => state.auth);
  const [fileBuffer, setFileBuffer] = useState(null);

  const { control, handleSubmit, errors, watch, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const watchAllFields = watch();

  useEffect(() => {
    setFileBuffer(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchAllFields.type]);

  const resetHandler = useCallback(() => {
    setFileBuffer(null)
    reset({
      name: '',
      description: '',
      quantity: 1,
    })
  }, [reset, setFileBuffer])

  const onSubmit = useCallback(async (data) => {
    if (!fileBuffer) {
      setPopUp({ text: MESSAGES.IMAGE_NOT_FOUND })
      return;
    }

    changeLoadingStatus(true)
    try {
      let params = {
        fileBuffer
      }
      const { image = '' } = await cloudinaryAPI.uploadFileCloudinary(params);

      params = {
        name: 'nftleda',
        description: data.name,
        quantity: 1,
        message: JSON.stringify({
          image,
          type: data.type,
          description: data.description
        }),
        secretPhrase: data.passphrase,
        publicKey: currentUser.publicKey,
      }

      const response = await jupiterAPI.issueAsset(params)
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
  }, [fileBuffer, currentUser, resetHandler, setPopUp, changeLoadingStatus]);

  return (
    <>
      <Grid container spacing={3} className={classes.media}>
        <Grid item xs={12} sm={6} md={8}>
          <UploadMedia
            type={FILE_TYPES[watchAllFields?.type || FILE_TYPES.IMAGE.VALUE]}
            fileBuffer={fileBuffer}
            setFileBuffer={setFileBuffer}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PreviewCard
            type={watchAllFields?.type || FILE_TYPES.IMAGE.VALUE}
            item={watchAllFields}
            fileBuffer={fileBuffer}
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
              multiline
              rows={3}
              name='description'
              label='Description'
              placeholder='Description'
              error={errors.description?.message}
              control={control}
              defaultValue=''
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<MagicSelect />}
              name='type'
              label='Type'
              placeholder='Select Type'
              items={FILE_TYPES_ARRAY}
              error={errors.type?.message}
              control={control}
              defaultValue={FILE_TYPES.IMAGE.VALUE}
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