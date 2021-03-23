
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import FeedbackCard from './FeedbackCard'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: theme.spacing(8, 0)
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 1020,
    width: '100%'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      marginBottom: theme.spacing(5),
    },
  }
}));

const responsive = {
  480: { items: 2 },
  680: { items: 3 },
  960: { items: 4 },
  1280: { items: 5 }
}

const UserFeedback = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Typography variant='h1' className={classes.title}>
        How users feel about Leda
      </Typography>
      <AliceCarousel
        mouseDragEnabled
        autoPlay
        infinite
        animationDuration={5000}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
      >
        {
          USERS.map((user, index) => (
            <FeedbackCard
              key={index}
              item={user}
            />
          ))
        }
      </AliceCarousel>
    </section>
  );
};

export default memo(UserFeedback);

const USERS = [
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'A big shout-out to the @Leda team. Designing a platform like this is no easy task, but they have done an incredible job & continue to be the best in the NFT Space. 🏆',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'You guys have changed so many lives, and are on track to change many more! 🙌',
    avatar: 'https://images.unsplash.com/photo-1553845911-9e88516bdcbe?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW5zJTIwZGF5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'A big shout-out to the @Leda team. Designing a platform like this is no easy task, but they have done an incredible job & continue to be the best in the NFT Space. 🏆',
    avatar: 'https://images.unsplash.com/photo-1553845870-99f749f80e3c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVucyUyMGRheXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'Easy to use, beautiful looking platform! You can setup collections/series with exclusive sharable links, thats a big plus for me! Really fast development and updates',
    avatar: 'https://images.unsplash.com/photo-1520748799498-9c879574ec7b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fHdvbWVucyUyMGRheXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'Leda is where it’s at',
    avatar: 'https://images.unsplash.com/photo-1551997476-7788a5dd3fca?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzh8fHdvbWVucyUyMGRheXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'Amazing platform and a great intro to crypto where a lot of us cut our teeth. Thank you for the ongoing work with the community to make the platform great! 🔥',
    avatar: 'https://images.unsplash.com/photo-1551856593-6b804e113a18?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODB8fHdvbWVucyUyMGRheXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'I’m so interested in using your platform in 2020, I’m loving the UX and ease of use of Leda, keep it up',
    avatar: 'https://images.unsplash.com/photo-1606898089449-f811a830091f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA2fHx3b21lbnMlMjBkYXl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lux Expression®',
    subName: '@Lux',
    description: 'Yes, it is true that @Leda is innovating heavily in the space. Check them out!',
    avatar: 'https://images.unsplash.com/photo-1551551625-aa4a360c80d3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA5fHx3b21lbnMlMjBkYXl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
]