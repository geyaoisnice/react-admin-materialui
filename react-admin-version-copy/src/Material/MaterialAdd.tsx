import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const MaterialAdd = (props: any) => {
    const navigate = useNavigate()
    const onSuccess = (data: any) => {

        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <ReferenceInput source="mat_type" reference="t_base_materiel_type" />
                <TextInput source="code" />
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Create>
    )

}