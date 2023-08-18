import { Button, Create, SaveButton, SimpleForm, TextInput, Toolbar } from "react-admin";
import { useNavigate } from "react-router-dom";

const CreateToolbar = (props: any) => {
    const navigatge = useNavigate();
    return(
        <Toolbar {...props}>
            <SaveButton label = '保存' />
            <Button 
                style = {{padding: '6px', width: '86px', fontSize: '16px', color: 'white', 
                    backgroundColor: 'rgb(28, 118, 210)', marginLeft: '8px'
                }}    
                label = '返回' onClick = {() => navigatge(-1)} 
            />
        </Toolbar>
    )
}

const EquipCreate = () => {
    const navigate = useNavigate();

    return ( 
        <Create mutationOptions={{onSuccess: () => navigate(-1)}}>
            <SimpleForm
                toolbar = {<CreateToolbar />}
            >
                <TextInput source = 'code' label = '设备类型编号' />
                <TextInput source = 'name' label = '类型名称' />
                <TextInput source = 'description' label = '设备类型说明' />
            </SimpleForm>
        </Create>
     );
}
 
export default EquipCreate;