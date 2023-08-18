import { List, Datagrid, TextField } from "react-admin"

const EmpSkillList = () => {
    return(
        <List exporter ={false}
            hasCreate
        >
            <Datagrid
                rowClick = {'edit'}
            >
                <TextField source = 'skill_level' label = '技能级别' />
                <TextField source = 'skill_rate' label = '技能生产率' />
                <TextField source = 'description' label = '技能说明' />
            </Datagrid>
        </List>
    )
}

export default EmpSkillList;