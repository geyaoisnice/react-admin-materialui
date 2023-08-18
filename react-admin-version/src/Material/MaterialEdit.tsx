import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, Edit, useDataProvider, useResourceContext, UpdateParams } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const MaterialEdit = (props: any) => {
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
        <Edit mutationOptions={{ onSuccess }} 
        >
            <SimpleForm>
                <TextInput source="id" />
                <ReferenceInput source="mat_type" reference="t_base_materiel_type" />
                <TextInput source="code" />
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Edit>
    )

}