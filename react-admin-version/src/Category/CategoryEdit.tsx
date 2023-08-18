import * as React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { UpdateParams, Edit, SimpleForm, TextInput, DateInput, required, TopToolbar, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from 'react-router-dom';

export const CategoryEdit = () => {
    const navigate = useNavigate()
    const dataprovider = useDataProvider();
    const resource = useResourceContext();
    const onSuccess = (data:any) => {
        const { id, ...res } = data;
        const params: any = { id: id, data: res } ;
        dataprovider.update(resource, params);
        navigate(-1)
    };
    return (
        <Edit mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="tenant_id" />
                <TextInput source="code" />
                <TextInput source="category_name" />
            </SimpleForm>
        </Edit>
    )

}