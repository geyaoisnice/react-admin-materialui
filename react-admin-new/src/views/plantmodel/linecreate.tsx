import { Create, SimpleForm, TextInput, useRefresh } from "react-admin"
import { useNavigate, useParams } from "react-router-dom"

const LineCreate = () => {
    const {id} = useParams();
    console.log('id', id);
    const navigate = useNavigate();
    const refresh = useRefresh();

    return(
        <Create resource="t_lps_line"
            mutationOptions={{onSuccess: ()=>{navigate(-1); refresh()}}}
        >
            <SimpleForm>
                <TextInput source = 'code' />
                <TextInput source = 'name' />
                <TextInput source = 'plant_id' label = '工厂编号' defaultValue={id} disabled />
                <TextInput source = 'description' />
            </SimpleForm>
        </Create>
    )
}

export default LineCreate;