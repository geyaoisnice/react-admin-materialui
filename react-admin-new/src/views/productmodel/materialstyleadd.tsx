import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const MaterialStyleListAdd = (props: any) => {
    const navigate = useNavigate()

    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <ReferenceInput source="mat_id" reference="t_base_materiel" >
                    <SelectInput></SelectInput>
                </ReferenceInput>
                <TextInput source="count" />
                <TextInput source="description" />

            </SimpleForm>
        </Create>
    )
}