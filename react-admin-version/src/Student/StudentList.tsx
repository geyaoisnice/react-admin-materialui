import { Box, Button, Typography } from "@mui/material";
import { Datagrid, EditButton, List, TextField, ReferenceManyCount } from "react-admin"
import { useNavigate, useParams } from "react-router-dom";
const Empty = () => {
    const {id: plant_id} = useParams();
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/t_geyao_student/create`);
    }
    
    return(
        <Box textAlign={'center'} m = {1}>
            <Typography variant="h4" paragraph>
                当前没有学生
            </Typography>
            <Typography variant="body1">
                新加入一个学生信息
            </Typography>
            <Button onClick={handleClick}>新建学生</Button>
        </Box>
    )
}
const StudentList = () => {
    return (
        <List empty={<Empty/>} exporter={false} hasCreate={true} resource="t_geyao_student"
        >
            <Datagrid >
                <TextField source='sno' />
                <TextField source='sname' />
                <TextField source='ssex' />
                <TextField source='sage' />
                <TextField source='sdept' />
                <EditButton></EditButton>
            </Datagrid>
        </List>
    )
}
export default StudentList