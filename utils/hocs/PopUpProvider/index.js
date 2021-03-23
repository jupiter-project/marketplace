
import { memo } from 'react'

import MagicConfirmDialog from 'parts/MagicConfirmDialog'
import usePopUp from 'utils/hooks/usePopUp'

const PopUpProvider = () => {
  const { popUpInfo, closePopUpHandler } = usePopUp();

  return (
    <MagicConfirmDialog
      open={popUpInfo?.open}
      title={popUpInfo?.title}
      text={popUpInfo?.text}
      cancelLabel={popUpInfo?.cancelLabel}
      onCancel={closePopUpHandler}
      onClose={closePopUpHandler}
    />
  )
};

export default memo(PopUpProvider);
