// 1. Stwórz nowy koponent SearchPage
// 2. W tym komponenecie (pkt 1) stwórz stan keyword
// 3. Wyświetl w JSX komponent SearchForm, funkcję aktualizującą stan keyword przekaż propsem do SearchForm
// 4. Stwórz interface dla SearchForm, otypuj submitHandler i useForm
// 5. Wywołaj funkcję aktualizującą stan keyword, do stanu keyword wysyłaj wartość keyword z SearchForma

import { List } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { API_KEY } from '../../helpers/helpers';
import Article from '../Article/Article';
import SearchForm from '../SearchForm/SearchForm';
import { ArticleObj } from '../../helpers/interfaces';

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");

    // 1. Stwórz stan articles, wartość początkowa: []
    // 2. Wywołaj useEffect, ma reagować na zmianę stanu keyword
    // W UE
    // 3. Jeżeli keyword jest prawdziwy, wywołaj axios.get dla urla:
    // https://newsapi.org/v2/everything?  i nadaj mu parametry z wartościami:
    // a) q, q jest parametrem odpowiadającym za filtrowanie artykułów wg słowa kluczowego, q=jakasWartosc
    // b) from, from jest parametrem odpowiadającym za datę od której mają być ściągane artykuły, np. from=2022-10-01, format yyyy-mm-dd
    // c) language, language jest parametrem odpowiadającym za język pobieranych artykułów (angielski to en)
    // d) sortBy, w zależności od wartości sortuje artykuły w odpowiedni sposób, np. "popularity"
    // e) apiKey, tutaj podajemy nasz klucz do API
    // 4. Na axios.get przypnij thena, w thene wrzuć do stanu articles zwrócone przez axiosa artykuły (uwaga, lista artykułów jest zagnieżdżona na 2 poziomach w zwróconym obiekcie)
    // 5. Na zmiennej stanowej (tak naprawdę liście) articles wywołaj metodę .map(), w niej zwracaj komponent Article przekazując jako props artykuł po którym aktualnie iterujesz (renderowanie w pętli, czyli musi być w JSX w returnie)

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (keyword) {
            axios.get(`https://newsapi.org/v2/everything?q=${keyword}&from=2023-01-01&language=en&sortBy=popularity&apiKey=${API_KEY}`)
                .then((response) => {
                    // console.log(response);
                    setArticles(response.data.articles);
                })
                .catch((err) => console.error(err.message));
        }
    }, [keyword]);

    return (
        <>
            <SearchForm setKeyword={setKeyword} />
            <List sx={{ width: '100%', bgcolor: 'background.paper', alignContent: 'center' }}>
                {articles.map((art: ArticleObj) => {
                    return <Article art={art} key={art.title} />
                })}
            </List>
        </>
    )
}

export default SearchPage