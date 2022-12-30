import React from 'react'
import { Card, Typography, TextField, Button } from "@mui/material";
import { auth } from '../../helpers/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./RegisterForm.css";
import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../../helpers/interfaces';

const RegisterForm = () => {
    const { register, handleSubmit } = useForm<RegisterFormData>();

    const submitHandler = ({ email, password, password2 }: RegisterFormData) => {
        console.log({ email, password, password2 });
        // 1. Zarejestrować resztę inputów (nadaj im nazwy rejestracyjne password i password2), zaktualizuj odpowiednio interface RegisterFormData
        // W submitHandler:
        // 2. Sprawdz czy password jest równy password2 (zrób to ifem)
        // 3. Jeżeli password jest password2, wywołaj funkcję createUserWithEmailAndPassword z odpowiednimi argumentami.
        // 4. Na funkcję createUser... dodaj thena w którym wykonaj console.log('Successfully registered') oraz catcha z console.log(err.message)
        // 5. Zamiast pisać data kilka razy, zrób destrukturyzację ;)
        if (password === password2) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Successfully registered"))
                .catch((err) => console.error(err.message));
        } else {
            console.log("Passwords are not the same");
        }
    }

    // ten sam zapis bez destrukturyzacji
    // const submitHandler = (data: RegisterFormData) => {
    //     console.log(data);
    //     if (data.password === data.password2) {
    //         createUserWithEmailAndPassword(auth, data.email, data.password)
    //             .then(() => console.log("Successfully registered"))
    //             .catch((err) => console.error(err.message));
    //     } else {
    //         console.log("Passwords are not the same");
    //     }
    // }

    return (
        // 1. Głównym elementem (elementem rodzicem wszystkich innych) będzie zwykły HTMLowy <form>, atrybutem style nadaj mu display: flex i flexDirection: column
        // W formularzu:
        // 2. <Typography>, propy: align center, variant h2, w sx'ach fontSize 1.5rem
        // 3. <TextField>, type email, placeholder email, w sx'ach: display block, margines w osi y: .5rem, margines w osi x na auto
        // 4. <TextField>, type password, placeholder password, w sx'ach: display block, margines w osi y: .5rem, margines w osi x na auto
        // 5. <TextField>, type password, placeholder repeat password, w sx'ach: display block, margines w osi y: .5rem, margines w osi x na auto
        // 6. <Button>, variant contained, type submit, w sx'ach display block, margines w osi x na auto, textContent Register
        <Card sx={{ mt: "1rem", display: "block", mx: "auto", p: "10px", width: "75%" }}>
            <form id="formStyle" onSubmit={handleSubmit(submitHandler)}>
                <Typography align="center" variant="h2" sx={{ fontSize: "1.5rem" }}>Register new account</Typography>
                <TextField type="email" placeholder='email' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("email", { required: true })} />
                <TextField type="password" placeholder='password' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("password", { required: true })} />
                <TextField type="password" placeholder='repeat password' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("password2", { required: true })} />
                <Button variant="contained" type="submit" sx={{ display: "block", mx: "auto" }}>Register</Button>
            </form>
        </Card>
    )
}

export default RegisterForm