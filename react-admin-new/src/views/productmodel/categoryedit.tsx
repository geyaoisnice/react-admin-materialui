import { Button, Edit, SaveButton, SimpleForm, TextInput, Toolbar, useRefresh, useUpdate } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";

const EditToolbar = (props: any) => {
    const navigate = useNavigate();
    return(
        <Toolbar {...props}>
            <SaveButton label = '保存'/>
            <Button
                style = {{padding: '6px', width: '86px', fontSize: '16px', color: 'white', 
                    backgroundColor: 'rgb(28, 118, 210)', marginLeft: '8px'
                }}
                label = '返回'
                onClick={()=> navigate(-1)}
            />
        </Toolbar>
    )
}

const CategoryEdit = () => {
    const {id: recordId} = useParams();
    const navigate = useNavigate();
    const [update] = useUpdate();
    const refresh = useRefresh();

    const handleSuccess = (params: any) => {
        update('t_prod_category', {id: recordId, data: params}, {
            onSuccess: (data) => {
                refresh();
                navigate(-1);  
            }
        })
    }

    return(
        <Edit resource="t_prod_category" mutationOptions={{ onSuccess: handleSuccess}}
        >
            <SimpleForm 
                toolbar = {<EditToolbar/>}
            >
                 <TextInput source="id" disabled/>
                 <TextInput source="tenant_id" />
                <TextInput source="code" />
                <TextInput source="category_name" />
            </SimpleForm>
        </Edit>
    )
}

export default CategoryEdit;