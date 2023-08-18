import * as React from 'react';
import { Create, ReferenceInput , SelectInput,SimpleForm, TextInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const MaterialTypeAdd = (props:any) => {
    const navigate = useNavigate()
    const onSuccess = (data:any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <TextInput source="code" />
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Create>
    )

}