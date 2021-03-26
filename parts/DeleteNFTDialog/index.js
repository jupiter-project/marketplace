
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter'
import MagicDialog from 'components/MagicDialog'
import GradientButton from 'components/UI/Buttons/GradientButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import usePopUp from 'utils/hooks/usePopUp'
import useLoading from 'utils/hooks/useLoading'
import { PASSPHRASE_VALID } from 'utils/constants/validations'
import MESSAGES from 'utils/constants/messages'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'

const schema = yup.object().shape({
  passphrase: PASSPHRASE_VALID
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    height: 150,
    maxWidth: '100%',
    objectFit: 'contain',
    borderRadius: 16,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0)
  },
  button: {
    marginTop: theme.spacing(3)
  }
}));

const DeleteNFTDialog = ({
  open,
  setOpen,
  item,
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();
  const { currentUser } = useSelector(state => state.auth);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data) => {
    changeLoadingStatus(true)
    try {
      const params = {
        goods: item.goods,
        secretPhrase: data.passphrase,
        publicKey: currentUser.publicKey,
      }

      const response = await jupiterAPI.deleteNFTToken(params)
      if (response?.errorCode) {
        setPopUp({ text: response?.errorDescription || MESSAGES.PURCHASE_NFT_ERROR })
        changeLoadingStatus(false)
        return;
      }

      setPopUp({ text: MESSAGES.DELETE_NFT_SUCCESS })
      setOpen(false);
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.DELETE_NFT_ERROR })
    }
    changeLoadingStatus(false)
  }, [item, currentUser, setOpen, setPopUp, changeLoadingStatus]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog
      open={open}
      title='Delete NFT token'
      onClose={handleClose}
    >
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <img
          alt='nft image'
          src={item.description || IMAGE_PLACEHOLDER_IMAGE_PATH}
          className={classes.image}
        />
        <Typography color='primary' className={classes.title}>
          {item.name}
        </Typography>
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
        <GradientButton
          type='submit'
          className={classes.button}
        >
          Delete
        </GradientButton>
      </form>
    </MagicDialog>
  );
}

export default memo(DeleteNFTDialog)