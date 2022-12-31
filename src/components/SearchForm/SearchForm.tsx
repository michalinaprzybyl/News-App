// 1. Import i wywołanie useForm
// 2. Stwórz pustą funkcję submitHandler
// JSX:
// 3. <form> (HTML) z onSubmit tak jak w każdym innym, style display flex, flexDirection column
// W środku form:
// 4. Textfield (MUI) placeholder Keyword, zarejestrować pod nazwą keyword, my .5rem, display block, mx auto
// 5. Button (MUI) variant contained, type submit, display block, mx auto, textContent Search

import { TextField, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import "./SearchForm.css";

const SearchForm = () => {
    const { register, handleSubmit } = useForm();

    const submitHandler = () => { };

    return (
        <form onSubmit={handleSubmit(submitHandler)} id='formStyle'>
            <TextField placeholder='Keyword' sx={{ my: '.5rem', display: 'block', mx: 'auto' }} {...register("keyword", { required: true })} />
            <Button variant='contained' type='submit' sx={{ display: 'block', mx: 'auto' }}>Search</Button>
        </form>
    )
}

export default SearchForm