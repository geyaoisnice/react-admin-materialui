import * as React from 'react';
import { Create, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const TeacherAdd = (props: any) => {
    const navigate = useNavigate()
    const onSuccess = (data: any) => {

        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <TextInput source="teacher_name" />
                <ReferenceInput source="class_id" reference="t_geyao_class" />
            </SimpleForm>
        </Create>
    )

}