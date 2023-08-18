import { Datagrid, EditButton, List, TextField } from "react-admin"
const MaterialTypeList = () =>{
    return(
        <List  exporter = {false} resource="t_base_materiel_type"
        >
            <Datagrid>
                <TextField source = 'id'/>
                <TextField source = 'code' />
                <TextField source = 'name' />
                <TextField source = 'description' />
                <EditButton></EditButton>
            </Datagrid>
        </List>
    )
}
export default MaterialTypeList