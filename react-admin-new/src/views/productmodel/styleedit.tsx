import { Edit, RaRecord, ReferenceField, ReferenceInput, SimpleForm, TextInput, useRefresh, useUpdate } from "react-admin"
import { useNavigate } from "react-router-dom";

const StyleEdit = () => {
    const navigate = useNavigate();
    const refresh = useRefresh();
    const [update] = useUpdate();
    const handleLineEditSuccess = (params: RaRecord) => {
        update('t_prod_style', { id: params.id, data: params }, {
            onSuccess: () => {
                refresh();
                navigate(-1);
            }
        })
    }
    return (
        <Edit resource="t_prod_style" mutationOptions={{ onSuccess: handleLineEditSuccess }}
        >
            <SimpleForm>
                <ReferenceInput source="tenant_id" reference="t_sys_tenant" />
                <TextInput source='code' />
                <TextInput source='style_name' />
                <ReferenceField source='category_id' reference="t_prod_category" label='所属品类' />
            </SimpleForm>
        </Edit>
    )
}

export default StyleEdit;