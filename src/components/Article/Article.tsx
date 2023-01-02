import { useState, useContext } from 'react';
import { ArticleProps } from '../../helpers/interfaces';
import { Card, ListItem, ListItemText } from '@mui/material';
import "./Article.css";
import { authContext } from '../../helpers/authContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { auth, firestore } from '../../helpers/firebaseConfig';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

const Article: React.FC<ArticleProps> = ({ art }) => {
    console.log(art);

    // 1. Stwórz obiekt ze stylami dla ikonek, w obiekcie zawrzyj float right, mr 3px, my 3px, color w zależności od stanu liked, jeżeli liked jest true to color red, jeżeli false to color black
    // 2. Stwórz stan liked, wartość początkowa false, będzie przechowywać booleans
    // 3. Ściągnij context loggedIn
    // 4. Za <a> między linią 16-17, stwórz renderowanie warunkowe z zależności od stanu loggedIn
    // 5. Prawą stroną operatora && z renderowania warunkowego z poprzedniego pkt, będzie react fragment z kolejnym renderowaniem warunkowym, tym razem typu drugiego (turnary operator). W tym renderowaniu warunkowym:
    // sprawdzamy czy stan liked (pkt 2) jest true, jeżeli tak, to wyświetl ikonkę FavoriteIcon i nałóż na nią sx'y przy wykorzystaniu obiektu z pkt 1. Jeżeli stan liked jest false, to wyświetl FavoriteBorderIcon i nałóż na nią sx'y przy wykorzystaniu obiektu z pkt 1.
    // 6. Przy kliknięciu na FavoriteBorderIcon, ustaw stan liked na true, przy kliknięciu na FavoriteIcon ustaw stan liked na false

    const [liked, setLiked] = useState(false);

    const loggedIn = useContext(authContext);

    const iconStyle = {
        float: 'right',
        mr: '3px',
        my: '3px',
        color: liked ? 'red' : 'black'
    };

    const likeTheArticle = async () => {
        // 1. Sprawdź czy loggedIn i auth.currentUser są prawdziwe
        // w ifie:
        // 2. Wywołaj funkcję setDoc (z awaitem, funkcja z firebase/firestore), funkcja przyjmuje 2 argumenty, 1 argument to wywołanie funkcji doc (firebase/firestore). Funkcja doc przyjmuje 3 argumenty: obiekt referencyjny do firestore (firebaseConfig.ts), nazwę kolekcji (w naszym przypadku będzie to uid aktualnie zalogowanego użytkownika) oraz tytuł dokumentu (w naszym przypadku tytuł artykułu (art.title)), a drugi argument to art.
        // 3. Po wywołaniu setDoc, w nowej linii, ustaw stan liked na false

        if (loggedIn && auth.currentUser) {
            await setDoc(doc(firestore, auth.currentUser.uid, art.title), art);
            setLiked(true);
        }
    }

    const unlikeTheArticle = async () => {
        // 4. Sprawdź czy loggedIn i auth.currentUser są prawdziwe
        // w ifie:
        // 5. Wywołaj funkcję deleteDoc (z awaitem, funkcja z firebase/firestore), funkcja przyjmuje 1 argument, wywołanie funkcji doc (firebase/firestore). Funkcja doc przyjmuje 3 argumenty: obiekt referencyjny do firestore (firebaseConfig.ts), nazwę kolekcji (w naszym przypadku będzie to uid aktualnie zalogowanego użytkownika) oraz tytuł dokumentu (w naszym przypadku tytuł artykułu (art.title)).
        // 6. Po wywołaniu deleteDoc, w nowej linii, ustaw stan liked na true

        if (loggedIn && auth.currentUser) {
            await deleteDoc(doc(firestore, auth.currentUser.uid, art.title));
            setLiked(false);
        }
    }

    return (
        <ListItem>
            <Card variant="outlined" sx={{ mb: "10px" }}>
                <a href={art.url} target="__blank" id="aStyle">
                    <img src={art.urlToImage} alt={art.title} id="imgStyle" />
                    <ListItemText sx={{ color: "black" }}>{art.title}</ListItemText>
                </a>
                {loggedIn &&
                    <>
                        {liked ? <FavoriteIcon sx={iconStyle} onClick={unlikeTheArticle} /> : <FavoriteBorderIcon sx={iconStyle} onClick={likeTheArticle} />}
                    </>
                }
            </Card>
        </ListItem >
    )
}

export default Article