import { Datagrid, List, TextField } from "react-admin"
const StyleList = () =>{
    return(
        <List  exporter = {false}
            hasEdit = {true}
        >
            <Datagrid>
                <TextField source = 'id'/>
                <TextField source = 'code' />
                <TextField source = 'style_name' />
                <TextField source = 'category_id' />
            </Datagrid>
        </List>
    )
}
export default StyleList