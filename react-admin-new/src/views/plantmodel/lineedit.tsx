import { Edit, RaRecord, ReferenceField, SimpleForm, TextInput, useRefresh, useUpdate } from "react-admin"
import { useNavigate } from "react-router-dom";

const LineEdit = () => {
    const navigate = useNavigate();
    const refresh = useRefresh();
    const [update] = useUpdate();
    const handleLineEditSuccess = (params: RaRecord) => {
        update('t_lps_line', {id: params.id, data: params},{
            onSuccess: () => {
                refresh();
                navigate(-1);
            }
        })
    }

    return(
        <Edit resource="t_lps_line" mutationOptions={{onSuccess: handleLineEditSuccess}}
        >
            <SimpleForm>
                <TextInput source = 'code' />
                <TextInput source = 'name' />
                <ReferenceField source = 'plant_id' reference="t_lps_plant" label = '所属工厂'/>
                <TextInput source = 'description' />
            </SimpleForm>
        </Edit>
    )
}

export default LineEdit;