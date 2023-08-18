import { Create, ReferenceInput, SimpleForm, TextInput, useRefresh } from "react-admin"
import { useNavigate, useParams } from "react-router-dom"

const StyleCreate = () => {
    const { id } = useParams();
    console.log('id', id);
    const navigate = useNavigate();
    const refresh = useRefresh();

    return (
        <Create resource="t_prod_style"
            mutationOptions={{ onSuccess: () => { navigate(-1); refresh() } }}
        >
            <SimpleForm>
                <ReferenceInput source="tenant_id" reference="t_sys_tenant" />
                <TextInput source='code' />
                <TextInput source='style_name' />
                <TextInput source='category_id' label='品类编号' defaultValue={id} disabled />
            </SimpleForm>
        </Create>
    )
}

export default StyleCreate;