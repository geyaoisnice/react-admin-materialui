import { Button, Edit, SaveButton, SimpleForm, TextInput, Toolbar } from "react-admin";
import { useNavigate } from "react-router-dom";

const EditToolbar = (props: any) => {
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

const EquipEdit = () => {
    return ( 
        <Edit>
            <SimpleForm
                toolbar = {<EditToolbar/>}
            >
                <TextInput source = 'code' label = '设备类型编码' />
                <TextInput source = 'name' label = '设备类型名称' />
                <TextInput source = 'description' label = '设备类型说明' />
            </SimpleForm>
        </Edit>
     );
}
 
export default EquipEdit;