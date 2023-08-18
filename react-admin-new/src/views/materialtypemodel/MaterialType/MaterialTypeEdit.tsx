import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, Edit, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const MaterialTypeEdit = (props: any) => {
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
                <TextInput source="code" />
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Edit>
    )

}