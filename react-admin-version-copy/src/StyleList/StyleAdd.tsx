import * as React from 'react';
import { Create, ReferenceInput , SelectInput,SimpleForm, TextInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../ProductList/CategoryLayout';
export const StyleAdd = (props:any) => {
    const navigate = useNavigate()
    const StyleContext:any=React.useContext(UserContext)
    const onSuccess = (data:any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <ReferenceInput source="tenant_id" reference="t_sys_tenant" />
                <ReferenceInput source="category_id" reference="t_prod_category" >
                    <SelectInput disabled defaultValue={StyleContext.categoryId}></SelectInput>
                </ReferenceInput>
                <TextInput source="code" />
                <TextInput source="style_name" />
            </SimpleForm>
        </Create>
    )

}