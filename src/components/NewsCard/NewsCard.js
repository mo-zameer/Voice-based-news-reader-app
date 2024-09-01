import React, {useState, useEffect, createRef} from 'react';
import useStyles from './style';
import classNames from 'classnames';
import { Card, CardActions, CardActionArea, CardMedia, CardContent, Button, Typography } from '@material-ui/core';

function NewsCard({article:{ description, publishedAt, source, title, url, urlToImage},i, activeArticle}){
    const classes=useStyles();
    const [elRefs, setElRefs]=useState([]); //element references
    const scrollTORef=(ref)=>window.scroll(0, ref.current.offsetTop-50); //scrolling

    useEffect(()=>{
        setElRefs((refs)=>Array(20).fill().map((_, j)=>refs[j] || createRef()));
    }, []); //called only at start to setup references

    useEffect(()=>{
        if(i===activeArticle && elRefs[activeArticle]){
            scrollTORef(elRefs[activeArticle]);
        }
    }, [i,activeArticle, elRefs]); //called each time when i,activeArticle, elRefs changes

    return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle===i? classes.activeCard:null)}>
        <CardActionArea href={url} target='_blank'>
            <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}/>
                <div className={classes.details}>
                    <Typography variant='body2'color='textSecondary' component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2'color='textSecondary' component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2'color='textSecondary' component="p">{description}</Typography>
                </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
            <Button size='small' color='primary' href={url} target='_blank'>Learn More</Button>
            <Typography variant='h5' color='textSecondary'>{i+1}</Typography>
        </CardActions>
    </Card>
  );
}

export default NewsCard;