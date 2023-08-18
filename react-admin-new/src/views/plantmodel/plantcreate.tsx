import { AssignmentReturn } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Create, SaveButton, SimpleForm, TextInput, Toolbar, useRefresh } from "react-admin"
import { useNavigate } from "react-router-dom"

const PlantCreate = () => {
    const navigate = useNavigate();
    const refresh = useRefresh();

    const CreateToolbar = () => {
        return(
            <Toolbar>
                <SaveButton />
                <Button variant="contained" sx = {{ml: '16px'}} onClick = {()=>navigate(-1)}><AssignmentReturn/> 返回</Button>
            </Toolbar>
        )
    }
    return(
        <Create resource="t_lps_plant" 
            mutationOptions={{onSuccess: ()=>{navigate(-1); refresh()}}} 
        >
            <SimpleForm toolbar = {<CreateToolbar/>}>
                <TextInput source = 'code' label = '工厂编号' />
                <TextInput source = 'name' label = '工厂名称' />
                <TextInput source = 'description' label = '工厂说明' />
            </SimpleForm>
        </Create>
    )
}

export default PlantCreate;
