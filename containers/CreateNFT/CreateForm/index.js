
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
  TITLE_VALID,
  STRING_VALID,
  NFT_DESCRIPTION_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import usePopUp from 'utils/hooks/usePopUp'
import useLoading from 'utils/hooks/useLoading'
import toFixedIfNecessary from 'utils/helpers/toFixedIfNecessary'
import MESSAGES from 'utils/constants/messages'
import { FILE_TYPES, FILE_TYPES_ARRAY } from 'utils/constants/file-types'
import { NQT_WEIGHT } from 'utils/constants/common'

const schema = yup.object().shape({
  title: TITLE_VALID,
  description: NFT_DESCRIPTION_VALID,
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
  },
  feeContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  feeButton: {
    marginLeft: theme.spacing(2)
  }
}));

const CreateForm = () => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();

  const { currentUser } = useSelector(state => state.auth);
  const [fileBuffer, setFileBuffer] = useState('');
  const [fee, setFee] = useState(0);

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
      title: '',
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
        type: data.type,
        fileBuffer
      }
      const { image = '' } = await cloudinaryAPI.uploadFileCloudinary(params);

      params = {
        name: 'nftleda',
        description: data.title,
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

  const feeHandler = async () => {
    try {
      const params = {
        name: 'nftleda',
        description: watchAllFields?.title,
        quantity: 1,
        message: JSON.stringify({
          image: 'https://res.cloudinary.com/leda/image/upload/v1620164283/rz5w0emtkbfbmts16wuv.png',
          type: watchAllFields?.type,
          description: watchAllFields?.description
        }),
        publicKey: currentUser.publicKey,
      }
      const response = await jupiterAPI.getIssueAssetFee(params)
      setFee(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      noValidate
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={3}>
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
        <Grid item xs={12} sm={6} md={5}>
          <UploadMedia
            type={FILE_TYPES[watchAllFields?.type || FILE_TYPES.IMAGE.VALUE]}
            setFileBuffer={setFileBuffer}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <PreviewCard
            type={watchAllFields?.type || FILE_TYPES.IMAGE.VALUE}
            fileBuffer={fileBuffer}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<MagicTextField />}
            name='title'
            label='Title'
            placeholder='Title'
            error={errors.title?.message}
            control={control}
            defaultValue=''
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<MagicTextField />}
            multiline
            rows={6}
            name='description'
            label='Description (max 800 characters)'
            placeholder='Description'
            error={errors.description?.message}
            control={control}
            defaultValue=''
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
        <Grid item xs={12}>
          <div className={classes.feeContainer}>
            <MagicTextField
              name='fee'
              label='Fee (JUP)'
              placeholder='Fee'
              readOnly
              value={toFixedIfNecessary(fee / NQT_WEIGHT)}
            />
            <ContainedButton
              className={classes.feeButton}
              onClick={feeHandler}
            >
              Calculate
            </ContainedButton>
          </div>
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
  )
}

export default memo(CreateForm)