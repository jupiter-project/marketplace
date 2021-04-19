import { memo } from 'react'

import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'
import { FILE_TYPES } from 'utils/constants/file-types'

const ProductContent = ({
  info,
  className
}) => {

  return info?.type === FILE_TYPES.VIDEO.VALUE
    ? (
      <video muted autoPlay loop controls className={className}>
        <source src={info?.image} />
      </video>
    ) : (
      <img
        alt='carousel'
        src={info?.image || IMAGE_PLACEHOLDER_IMAGE_PATH}
        className={className}
      />
    )
};

export default memo(ProductContent);