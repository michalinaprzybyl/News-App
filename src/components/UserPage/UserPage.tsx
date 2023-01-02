// 1. Typography variant h2, fontSize 2rem, my 1rem, borderBottom 1px solid jasnoniebieski, pb .5rem, wysrodkuj element, textCotnent Your profile
// 2. Typography variant h5, fontsize 1rem, my 1rem, mx auto, wysrodkuj, textContent "Your email: *tutaj email aktualnie zalogowanego uzytkownika*" (spójrz na obiekt auth.currentUser, auth trzeba zaimportowac z firebaseConfig)
// Button variant outlined, na kliknięcie wywołaj funkcję signOut (firebase/auth), display block, mx auto, my 1rem, textContent Log out
// 3. Typography variant h3, wysrodkowane, fontSize 1.7rem, fontWeight 100, borderTop 1px solid jasnyniebieski, pt .3rem, textContent Liked posts
// 4. Stwórz Route ("/user") w App.tsx, wyświetlaj w nim ten komponent
// 5. Do tego komponentu, z App.tsx, przekaż stan loggedIn propsami.
// 6. Renderowaniem warunkowym obwiń cały JSX, jeżeli loggedIn i auth.currentUser istnieją (są prawdziwe) to wyświetl elementy
// x && y && <p>123</p>

import { useContext, useState } from 'react'
import { Typography, Button } from "@mui/material";
import { auth, firestore } from '../../helpers/firebaseConfig';
import { signOut } from 'firebase/auth';
import { UserPageProps } from '../../helpers/interfaces';
import ProfilePhotoForm from '../ProfilePhotoForm/ProfilePhotoForm';
import { authContext } from '../../helpers/authContext';
import { onSnapshot, collection } from 'firebase/firestore';
import { ArticleObj } from '../../helpers/interfaces';
import Article from '../Article/Article';

const UserPage = () => {
    const loggedIn = useContext(authContext);
    const [likedArticles, setLikedArticles] = useState<ArticleObj[] | []>([]);

    if (loggedIn && auth.currentUser) {
        onSnapshot(collection(firestore, auth.currentUser.uid), (querySnapshot) => {
            const articles: ArticleObj[] = [];
            querySnapshot.forEach((doc) => articles.push(doc.data() as ArticleObj));
            setLikedArticles(articles);
        });
    }

    return (
        <>
            {loggedIn && auth.currentUser &&
                <>
                    <Typography variant="h2" sx={{ fontSize: "2rem", my: "1rem", borderBottom: "1px solid #1976d2", pb: ".5rem" }} align="center">Your profile</Typography>
                    <Typography variant="h5" sx={{ fontSize: "1rem", my: "1rem", mx: "auto" }} align="center">Your email: {auth.currentUser.email}</Typography>
                    <ProfilePhotoForm />
                    <Button variant="outlined" onClick={() => signOut(auth)} sx={{ display: "block", mx: "auto", my: "1rem" }}>Log out</Button>
                    <Typography variant="h3" align="center" sx={{ fontSize: "1.7rem", fontWeight: 100, borderTop: "1px solid #1976d2", pt: ".3rem" }}>Liked posts</Typography>
                    {likedArticles.map((article: ArticleObj) => {
                        return <Article art={article} key={article.title} />
                    })}
                </>
            }
        </>
    )
}

export default UserPage