import { Datagrid, EditButton, List, TextField, ReferenceManyCount } from "react-admin"
const MaterialList = () => {
    return (
        <List exporter={false} hasCreate={true} resource="t_base_materiel"
        >
            <Datagrid>
                <TextField source='id' />
                <TextField source='code' />
                <TextField source='name' />
                <TextField source='mat_type' />
                <TextField source='description' />
                <EditButton></EditButton>
            </Datagrid>
        </List>
    )
}
export default MaterialList