import { Stack, Typography } from "@mui/material";
import { Edit, SaveButton, SimpleForm, TextInput, Toolbar, Button, DeleteButton, ReferenceField, TextField, Labeled, useRecordContext } from "react-admin"
import { useNavigate } from "react-router-dom";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

const EditToolbar = (props: any) => {
    const navigate = useNavigate();
    return(
        <Toolbar {...props}>
            <SaveButton label = '保存'/>
            <Button
                sx = {{paddingTop: '8px', width: '86px', fontSize: '16px', color: 'white', 
                    backgroundColor: 'rgb(28, 118, 210)', marginLeft: '8px'
                }}
                onClick={()=> navigate(-1)}
                label = "返回"
            >
                <AssignmentReturnIcon />
            </Button>
            <DeleteButton 
                sx = {{padding: '6px', width: '86px', fontSize: '16px', color: 'white', 
                    backgroundColor: 'red', marginLeft: '8px'
                }}
                label = '删除'
                onClick={() => navigate(-1)}
            />
        </Toolbar>
    )
}

const SkillName = () => {
    const record = useRecordContext();
    return(
        <div>
            <Typography>
                {record.skill_level}
            </Typography>
        </div>
    )
}

const LineEmpEdit = () => {
    const navigate = useNavigate();
    const handleSuccess = () => {
        navigate(-1);
    }

    return(
        <Stack>
            <Typography sx = {{alignSelf: 'center', mt: '8px', fontWeight: 'bold'}}>产线员工编辑</Typography>
            <Edit resource="t_lps_line_emp" mutationOptions={{onSuccess: handleSuccess}} mutationMode= 'pessimistic'>
                <SimpleForm
                    sx = {{'& .MuiTextField-root': {width: '100%'}}}
                    toolbar = {<EditToolbar />}
                >
                    <Labeled label = '产线编号'>
                        <TextField source = 'line_id' disabled/>
                    </Labeled>
                    <Labeled label = '技能类别'>
                        <ReferenceField source = 'skill_id' reference= 't_lps_emp_skill' >
                            <SkillName/>
                        </ReferenceField>
                    </Labeled>
                    <TextInput source = 'count' label = '技能人数' />
                </SimpleForm>
            </Edit>
        </Stack>
    )
}

export default LineEmpEdit;