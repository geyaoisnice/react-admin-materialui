import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const ClassCreate = (props: any) => {
    const navigate = useNavigate()
    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <ReferenceInput source="school_id" reference="t_geyao_school" />
                <TextInput source="class_name" />
            </SimpleForm>
        </Create>
    )

}
