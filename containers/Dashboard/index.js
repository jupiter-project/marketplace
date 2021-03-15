
import { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import NFTCard from './NFTCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4, 0)
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
      name: 'Leda'
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
    product: 'https://res.cloudinary.com/leda/image/upload/v1615822449/l1aqnas6az50aclrtgh6.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Leda'
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
    product: 'http://res.cloudinary.com/leda/image/upload/v1615822539/khmujdjrlbzheooatbuc.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Leda'
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
    product: 'http://res.cloudinary.com/leda/image/upload/v1615822566/lqsnli2fngdq6zxzlwgx.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Leda'
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
    product: 'http://res.cloudinary.com/leda/image/upload/v1615822586/xnq75myjljmeillbmwni.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Leda'
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
    product: 'http://res.cloudinary.com/leda/image/upload/v1615822618/gdacaffiuoh97d5l0xxm.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Leda'
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
    product: 'http://res.cloudinary.com/leda/image/upload/v1615822642/sjtwchysxq1kad9diya5.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  },
  {
    collection: {
      avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      name: 'Leda'
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
    product: 'http://res.cloudinary.com/leda/image/upload/v1615822663/ysaooyajkwt3exdlwl9n.gif',
    description: 'Beautiful Souls',
    price: 0.34,
    highestBid: 0.235,
    royalties: 20,
  }
]