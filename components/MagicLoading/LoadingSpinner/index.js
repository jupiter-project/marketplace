
import { memo } from 'react'
import ReactLottie from 'react-lottie'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: require('public/assets/lotties/green-progress.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  },
};

const LoadingSpinner = ({ loading, size = 100 || size, ...rest }) => {
  if (!loading)
    return null;
  return (
    <ReactLottie
      isPaused={false}
      isStopped={false}
      options={defaultOptions}
      style={{ width: size, height: size }}
      {...rest}
    />
  );
};

export default memo(LoadingSpinner);