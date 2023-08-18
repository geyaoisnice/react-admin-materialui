import { Button } from "@mui/material";
import { RaRecord, Show, SimpleShowLayout, TextField, WithRecord } from "react-admin";
import { useNavigate } from "react-router-dom";

const PlantShow = () => {
    const navigate = useNavigate();

    const handleClick = (record: RaRecord) => {
        console.log('record is: ', record);
    }


    return(
        <Show resource = 't_lps_plant'>
            <SimpleShowLayout>
                <TextField source = 'id' />
                <TextField source = 'code' />
                <TextField source = 'name' />
                <WithRecord
                    render={
                        (record) => (
                            <div>
                                <div style= {{color: 'red'}}>可以通过WithRecord组件把Record数据传递到自定义组件中，例如可以实现对话框式创建记录</div>
                                <Button onClick = {()=>handleClick(record)}>添加产线</Button>
                                <span>{record.name}</span>
                            </div>
                        )
                    }
                />
            </SimpleShowLayout>
            <Button onClick={()=>navigate(-1)}>返回</Button>
        </Show>
    )
}

export default PlantShow;