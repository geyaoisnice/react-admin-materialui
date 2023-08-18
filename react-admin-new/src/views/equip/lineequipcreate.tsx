import { Create, ReferenceInput, SimpleForm, TextInput } from "react-admin";

const LineEquipCreate = () => {
    return ( 
        <Create>
            <SimpleForm>
                <TextInput source = 'line_id'  />
                <ReferenceInput source = 'equip_type_id' reference="t_lps_equip_type" />
                <TextInput source = 'count' />
                <TextInput source = 'description' />
            </SimpleForm>
        </Create>
     );
}
 
export default LineEquipCreate;