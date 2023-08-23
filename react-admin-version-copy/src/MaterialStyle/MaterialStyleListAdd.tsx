import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../ProductList/CategoryLayout';
export const MaterialStyleListAdd = (props: any) => {
    const navigate = useNavigate()
    const StyleContext:any=React.useContext(UserContext)
    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }} 
        >
            <SimpleForm>
                <ReferenceInput source="style_id" reference="t_prod_style" >
                    <SelectInput disabled defaultValue={StyleContext.styleId}></SelectInput>
                </ReferenceInput>
                <ReferenceInput filter={{ mat_type: StyleContext.typeId }} source="mat_id" reference="t_base_materiel" >
                    <SelectInput></SelectInput>
                </ReferenceInput>
                <TextInput source="count" />
                <TextInput source="description" />
              
            </SimpleForm>
        </Create>
    )
}