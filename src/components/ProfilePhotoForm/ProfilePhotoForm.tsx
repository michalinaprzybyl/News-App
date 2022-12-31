// 1. Import i wywołanie useForm
// JSX:
// 2. <form> onSubmit skofigurowany tak jak w innych przypadkach użycia useForm
// W środku <form>
// 3. Card (MUI), padding 1rem
// W środku Card:
// 4. Typography variant h6, fontSize 1rem, align center, textContent Upload your profile picture
// 5. Button (MUI) variant contained, display block, mx auto, my 1rem, alignContent center. Pamiętaj o component='label', bo ten button teraz zabiera event - on przyjmuje ten click i zarządza klikiem, dlatego to nie przechodzi dlaej do inputu!
// W środku Buttona:
// 6. Typography variant h6, fontSize 1rem, align center, textContent Select a file
// 7. input (zwykły HTML) type file, hidden, zarejestruj go przy użyciu useForm pod nazwą profilePhoto
/* <input hidden/> */
// koniec buttona
// 8. Button (MUI) variant contained, display block, mx auto, type submit, textContent Upload
// koniec Card
// koniec form
// 9. Stwórz funkcję submitHandler w której będzie console.log(data)
// Pamiętaj o stworzeniu interfejsu dla useForm i submitHandler (profilePhoto: typ FileList)

import React from 'react';
import { useForm } from "react-hook-form";
import { Button, Card, Typography } from '@mui/material';
import { ProfilePhotoFormData } from '../../helpers/interfaces';
import { auth, storage } from '../../helpers/firebaseConfig';
import { ref, uploadBytes } from "firebase/storage";

const ProfilePhotoForm = () => {
    const { register, handleSubmit } = useForm<ProfilePhotoFormData>();

    const submitHandler = (data: ProfilePhotoFormData) => {
        console.log(data);
        // 1. Wejdź w konsolę firebase i włącz storage, pamiętaj o tym żeby w zasadach zmienić false na true
        // 2. Wyciągnięcie zdjęcia z FileList'y (po prostu przez index i zapisz do zmiennej)
        // 3. Jeżeli użytkownik istnieje upload zdjęcia do storage (https://firebase.google.com/docs/storage/web/upload-files, paragraf Upload from a Blob or Filef, stwórz inną referencje niż w przykładzie, sam storage będzie miał więcej niż 1 poziom zagnieżdzenia, będzie więcej niż jeden slash w refie)
        // 4. Na funkcję wrzucającą pliki do storagu, podepnij then i catch
        const photo = data.profilePhoto[0];
        if (auth.currentUser) {
            const storageRef = ref(storage, `/users/${auth.currentUser.uid}/profilePhoto`);
            // Przykład z końcówką dynamiczną, gdybym chciała dodać kilka zdjęć:
            // const storageRef = ref(storage, '/users/${auth.currentUser.uid}/${photo.name}');

            uploadBytes(storageRef, photo)
                .then((snapshot) => {
                    console.log('Successfully uploaded the photo');
                })
                .catch((err) => console.error(err.message));
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Card sx={{ p: "1rem" }}>
                <Typography variant='h6' sx={{ fontsize: '1rem' }} align="center">Upload your profile picture</Typography>
                <Button variant='contained' component="label" sx={{ display: "block", mx: "auto", my: '1rem', alignContent: "center" }}>
                    <Typography variant='h6' sx={{ fontSize: '1rem' }} align='center'>Select a file</Typography>
                    <input type="file" accept="image/png, image/jpeg" hidden {...register("profilePhoto", { required: true })} />
                </Button>
                <Button variant='contained' sx={{ display: "block", mx: "auto" }} type='submit'>Upload</Button>
            </Card>
        </form>
    )
}

export default ProfilePhotoForm