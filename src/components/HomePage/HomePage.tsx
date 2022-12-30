import { useState, useEffect } from 'react'
import { Typography, List } from "@mui/material";
import { API_KEY } from '../../helpers/helpers';
import axios from 'axios';
import Article from '../Article/Article';
import { ArticleObj } from '../../helpers/interfaces';

const HomePage = () => {
    const [todaysArticles, setTodaysArticles] = useState([]);

    // tu ściągam dane z API: chcę z niego pobrać tylko dzisiejsze artykuły, więc muszę je gdzieś przechowywać, gdy zostaną zaciągnięte z API - do tego służy hook useState powyżej

    useEffect(() => {
        const today = new Date();
        console.log(today);
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const date = `${year}-${month < 9 ? `0${month + 1}` : month + 1}-${day - 1}`;
        // console.log(date);

        // fetch...
        axios.get(`https://newsapi.org/v2/everything?q=world&from=${date}&language=en&sortBy=popularity&apiKey=${API_KEY}`)
            .then((response) => {
                // console.log(response.data.articles);
                setTodaysArticles(response.data.articles);
            })
            .catch((err) => console.error(err.message));

    }, []);

    return (
        <>
            {/* Stwórz nagłówek z tekstem "Today's hottest news:", pobaw się propem variant, wyśrodkuj napis (align="center"), w propie sx ustaw odpowiedni rozmiar czcionki oraz margines w osi y (my) ustawcie tak, żeby było ładnie */}
            <Typography
                variant="h3"
                align="center"
                sx={{
                    my: "0.8rem",
                    fontSize: "2rem",
                    fontWeight: "400",
                }}>
                Today's hottest news:
            </Typography>

            {/* {todaysArticles.length !== 0 && <Article art={todaysArticles[0]} key={1} />} */}
            {/* JSowe wyrażenie logiczne, dlatego w klamrach */}

            <List
                sx={{ width: "100%", alignContent: "center" }}>
                {/* {[<li>123</li>, <li>321</li>]} */}
                {todaysArticles.length !== 0 && todaysArticles.map((art: ArticleObj) => {
                    return <Article art={art} key={art.title} />
                })}
            </List>
        </>
    )
}

export default HomePage