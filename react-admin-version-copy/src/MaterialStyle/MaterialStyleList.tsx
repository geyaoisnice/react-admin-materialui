/*
  单个款式的展示页面
*/
import { List, useDataProvider, GetListParams, GetOneParams, TopToolbar, CreateButton } from "react-admin"
import { useParams } from "react-router-dom";
import { ListItem, ListItemText, Tab, List as MuiList, Card, CardContent, Divider, Paper, Stack } from '@mui/material';
import { useEffect, useState } from "react";
import { MaterialTab } from "./MaterialTab";
import { MaterialStyleTitle } from "./MaterialStyleTitle";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
const MaterialTabChange = (props: any) => {
    const { value, typeId } = props
    return (
        <div>
            {value == "1" && (
                <MaterialTab typeId={typeId}></MaterialTab>
            )
            }
            {value == "2" && <div>工时管理</div>}
        </div>
    )
}
const ListActions = (props: any) => {
    const { typeId } = props
    return (
        < TopToolbar >
            <CreateButton disabled={!typeId ? true : false}></CreateButton>
        </TopToolbar >
    )

}
const MaterialStyleList = (props: any) => {
    const { params: id } = useParams();
    const [styleRecord, setStyleRecord] = useState<any>({})
    const [typeList, setTypeList] = useState<any>([])
    const [value, setValue] = useState<string>("1")
    const [typeId, setTypeId] = useState<any>("")
    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };
    const dataprovider = useDataProvider();
    useEffect(() => {
        const params: GetOneParams = { id: id } as GetOneParams;
        dataprovider.getOne("t_prod_style", params).then((res: any) => {
            console.log(res, "res is")
            setStyleRecord(res.data)
        })
    }, [])
    useEffect(() => {
        const params: GetOneParams = { id: id } as GetOneParams;
        dataprovider.getOne("t_prod_style", params).then((res: any) => {
            console.log(res, "res is")
            setStyleRecord(res.data)
        })
    }, [])
    useEffect(() => {
        const params: GetListParams = { pagination: { page: 1, perPage: 99999 }, sort: { field: 'name', order: 'DESC' }, filter: {} } as GetListParams;
        dataprovider.getList("t_base_materiel_type", params).then((res: any) => {
            const {data}=res
            let arr=data.unshift({id:"",name:"全部"})
            setTypeList(data)
        })
    }, [])
    const handleSelectType = (typeId: any) => {
        console.log(id, "ididididd")

        setTypeId(typeId)
        props.handleType && props.handleType(typeId, id)
    };
    return (
        <div>
            <MaterialStyleTitle styleRecord={styleRecord}></MaterialStyleTitle>
            <CardContent>
                <Divider>产品信息</Divider>
            </CardContent>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="物料管理" value="1" />
                    <Tab label="工艺管理" value="2" />
                </TabList>
            </TabContext>
            <Card>
                <Stack direction="row" style={{ margin: 0, padding: 0, display: "flex" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <Paper elevation={5} style={{ margin: "4px 0 4px 12px" }} >
                        {typeList && typeList.map((item: any, index: any) => (
                            <MuiList key={index} component="div">
                                <ListItem button style={typeId == item.id ? { background: '#ccc', height: "30px" } : { height: "30px" }} onClick={() => handleSelectType(item.id)}>
                                    <ListItemText>{item.name}</ListItemText>
                                </ListItem>
                            </MuiList>
                        ))}
                    </Paper>
                    <Paper style={{ flexGrow: "1", margin: "4px" }}>
                        <List actions={<ListActions typeId={typeId}></ListActions>} hasCreate={!typeId ? false : true} filter={!typeId ? {  style_id: id } : { style_id: id,mat_id: typeId }} exporter={false} hasEdit={true} resource="t_base_style_materiel">
                            <MaterialTabChange typeId={typeId} value={value}></MaterialTabChange>
                        </List>
                    </Paper>
                </Stack>
            </Card>
        </div>
    )
}
export default MaterialStyleList;