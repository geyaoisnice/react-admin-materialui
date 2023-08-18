import { Edit, SimpleForm, TextInput } from "react-admin"


const EmpSkillEdit = () => {
    return(
        <Edit>
            <SimpleForm
            >
                <TextInput source = 'skill_level' label = '技能级别' />
                <TextInput source = 'skill_rate' label = '技能效率' />
                <TextInput source = 'description' label = '技能说明' />
            </SimpleForm>
        </Edit>
    )
}

export default EmpSkillEdit;