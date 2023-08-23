import * as React from 'react';
import { Create, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const StudentAdd = (props: any) => {
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
                <TextInput source="id" disabled />
                <TextInput source="sno" />
                <TextInput source="sage" />
                <TextInput source="sname" />
                <TextInput source="ssex" />
                <TextInput source="sdept" />
            </SimpleForm>
        </Edit>
    )

}