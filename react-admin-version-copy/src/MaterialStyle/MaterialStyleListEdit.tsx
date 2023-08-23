import * as React from 'react';
import { Create, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../ProductList/CategoryLayout';
export const MaterialStyleListEdit = (props: any) => {
    const navigate = useNavigate()
    const StyleContext:any=React.useContext(UserContext)
    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Edit mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <ReferenceInput source="style_id" reference="t_prod_style" >
                    <SelectInput disabled></SelectInput>
                </ReferenceInput>
                <ReferenceInput source="mat_id"  filter={{ mat_type: StyleContext.typeId }} reference="t_base_materiel" >
                <SelectInput></SelectInput>
                </ReferenceInput>
                <TextInput source="count" />
                <TextInput source="description" />
            </SimpleForm>
        </Edit>
    )

}