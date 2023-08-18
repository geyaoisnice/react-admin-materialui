import * as React from 'react';
import { Button, Typography, Box } from '@mui/material';
import {  Edit, SimpleForm, TextInput, useDataProvider, useListContext, UpdateParams, useResourceContext } from 'react-admin';
import { useParams, useNavigate } from "react-router-dom";
export const StyleEdit = (props: any) => {
    const navigate = useNavigate()
    const dataprovider = useDataProvider();
    const resource = useResourceContext();
    const onSuccess = (data: any) => {
        const { id, ...res } = data;
        const params: UpdateParams = { id: id, data: res } as UpdateParams;
        dataprovider.update(resource, params);
        navigate(-1)
    };
    return (
        <Edit mutationOptions={{ onSuccess }} resource=''
        >
            <SimpleForm>
                <TextInput source="category_id" disabled />
                <TextInput source="tenant_id" disabled />
                <TextInput source="code" />
                <TextInput source="style_name" />
            </SimpleForm>
        </Edit>
    )

}