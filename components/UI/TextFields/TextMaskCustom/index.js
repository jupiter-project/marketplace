
import { memo } from 'react'
import MaskedInput from 'react-text-mask'

const TextMaskCustom = ({
  inputRef,
  ...rest
}) => {
  return (
    <MaskedInput
      {...rest}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={true}
      placeholderChar={'\u005F'}
      showMask
    />
  )
};

export default memo(TextMaskCustom);