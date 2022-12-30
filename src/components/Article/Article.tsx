import React from 'react';
import { ArticleProps } from '../../helpers/interfaces';
import { Card, ListItem, ListItemText } from '@mui/material';
import "./Article.css";

// 2 propsy
const Article: React.FC<ArticleProps> = ({ art }) => {
    console.log(art);
    return (
        <ListItem>
            <Card variant="outlined" sx={{ mb: "10px" }}>
                <a href={art.url} target="__blank" id="aStyle">
                    <img src={art.urlToImage} alt={art.title} id="imgStyle" />
                    <ListItemText sx={{ color: "black" }}>{art.title}</ListItemText>
                </a>
            </Card>
        </ListItem >
    )
}

export default Article