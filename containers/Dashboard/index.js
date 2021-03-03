
import { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import NFTCard from './NFTCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    padding: theme.spacing(2)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        {
          NFT_TOKENS.map((item, index) => (
            <Grid key={index} item xs={12} sm={4} md={3} lg={2}>
              <NFTCard item={item} />
            </Grid>
          ))
        }
      </Grid>
    </main>
  )
}

export default memo(Dashboard);

const NFT_TOKENS = [
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jupiter'
    },
    owner: {
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Andrey'
    },
    creator: {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Steve Jin'
    },
    name: '🎵 🎬 Beautiful Souls',
    product: 'https://media.giphy.com/media/l2JhL0Gpfbvs4Y07K/giphy.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jupiter'
    },
    owner: {
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Andrey'
    },
    creator: {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Steve Jin'
    },
    name: '🎵 🎬 Beautiful Souls',
    product: 'https://media.giphy.com/media/Ay2yAQgxhFD7a/giphy.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jupiter'
    },
    owner: {
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Andrey'
    },
    creator: {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Steve Jin'
    },
    name: '🎵 🎬 Beautiful Souls',
    product: 'https://media.giphy.com/media/M8ygVZBe5wNZC/giphy.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jupiter'
    },
    owner: {
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Andrey'
    },
    creator: {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Steve Jin'
    },
    name: '🎵 🎬 Beautiful Souls',
    product: 'https://media.giphy.com/media/3ov9k4e03yTNRWTgYM/giphy.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jupiter'
    },
    owner: {
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Andrey'
    },
    creator: {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Steve Jin'
    },
    name: '🎵 🎬 Beautiful Souls',
    product: 'https://media.giphy.com/media/v0YiARQxj1yc8/giphy.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jupiter'
    },
    owner: {
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Andrey'
    },
    creator: {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Steve Jin'
    },
    name: '🎵 🎬 Beautiful Souls',
    product: 'https://media.giphy.com/media/xUPGchzZ90zPLYwwTe/giphy.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Jupiter'
    },
    owner: {
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Andrey'
    },
    creator: {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Steve Jin'
    },
    name: '🎵 🎬 Beautiful Souls',
    product: 'https://media.giphy.com/media/l0O7NvDd6lifNaNuo/giphy.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  }
]