import { Create, SimpleForm, TextInput } from "react-admin"

const EmpSkillCreate = () => {
    return(
        <Create>
            <SimpleForm>
                <TextInput source = 'skill_level' label = '技能级别' />
                <TextInput source = 'skill_rate' label = '技能效率' />
                <TextInput source = 'description' label = '技能说明' />
            </SimpleForm>
        </Create>
    )
}

export default EmpSkillCreate;