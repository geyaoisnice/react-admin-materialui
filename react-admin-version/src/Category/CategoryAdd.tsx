import * as React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Create, useNotify, Toolbar, SaveButton, SimpleForm, TextInput, DateInput, required, TopToolbar } from 'react-admin';
import { useNavigate } from 'react-router-dom';
export const CategoryAdd = () => {
    const navigate = useNavigate()
    const onSuccess = () => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <TextInput source="tenant_id" />
                <TextInput source="code" />
                <TextInput source="category_name" />
            </SimpleForm>
        </Create>
    )

}