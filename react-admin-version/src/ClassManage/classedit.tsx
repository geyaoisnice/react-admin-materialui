import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, Edit, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const SchoolEdit = (props: any) => {
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
                <ReferenceInput source="class_id" reference="geyao_school" />
                <TextInput source="class_name" />
            </SimpleForm>
        </Edit>
    )
}