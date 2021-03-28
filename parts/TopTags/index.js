import { memo, useEffect, useState } from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import { isEmpty } from 'utils/helpers/utility'
import COLORS from 'utils/constants/colors'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: theme.spacing(2, 0)
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  list: {
    width: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2)
  },
  square: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 15,
    opacity: 0.2,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  }
}));

const TopTags = () => {
  const classes = useStyles();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
  }, [])

  const getTags = async () => {
    try {
      const params = {
        first: 1,
        last: 12
      }
      const { tags = [] } = await jupiterAPI.getTags(params);
      setTags(tags)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    !isEmpty(tags) &&
    <div className={classes.container}>
      <Typography className={classes.title} >
        Top Tags
      </Typography>
      <Grid container spacing={3} className={classes.list}>
        {
          tags.map((item, index) => (
            <Grid key={index} item xs={4} sm={6} md={4} className={classes.item}>
              <div className={classes.iconContainer}>
                <div className={classes.square} style={{ backgroundColor: COLORS[index] }} />
                <Typography className={classes.text} style={{ color: COLORS[index] }}>
                  {item.totalCount}
                </Typography>
              </div>
              <Typography className={classes.text}>
                {item.tag}
              </Typography>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default memo(TopTags);