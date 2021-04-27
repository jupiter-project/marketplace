
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter'
import MagicDialog from 'components/MagicDialog'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import usePopUp from 'utils/hooks/usePopUp'
import useLoading from 'utils/hooks/useLoading'
import { PASSPHRASE_VALID } from 'utils/constants/validations'
import MESSAGES from 'utils/constants/messages'
import ORDER_TYPE from 'utils/constants/order-type'

const schema = yup.object().shape({
  passphrase: PASSPHRASE_VALID
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
        order: item.order,
        secretPhrase: data.passphrase,
        publicKey: currentUser.publicKey,
      }

      let response;
      if (ORDER_TYPE.ASK === item.type) {
        response = await jupiterAPI.cancelAskOrder(params)
      } else {
        response = await jupiterAPI.cancelBidOrder(params)
      }
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.DELETE_NFT_ERROR })
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
      title='Delete Asset Order'
      onClose={handleClose}
    >
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography color='primary' className={classes.title}>
          {item.description}
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
        <ContainedButton
          type='submit'
          className={classes.button}
        >
          Delete
        </ContainedButton>
      </form>
    </MagicDialog>
  );
}

export default memo(DeleteNFTDialog)