import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const SchoolCreate = (props: any) => {
    const navigate = useNavigate()
    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <TextInput source="school_name" />
            </SimpleForm>
        </Create>
    )

}