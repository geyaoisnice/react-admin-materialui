

import React,{  useState } from "react"
import {  List as ListM, fetchUtils } from "react-admin";
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import { Collapse, Grid, ListItem, ListItemText, Paper, List } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { ITreeDataList,IChildren } from "./common";
export interface ICategoryList {
    id: number,
    category_name: string
    t_prod_style: IProdList[]
}
export interface IProdList {
    id: number,
    style_name: string
}
export interface ICategory {
    categoryId: number,
  }
interface ITreeList{
    TreeDataList?:any,
    handleNavigate:(data:any)=>void
}
const TreeList = (props:ITreeList) => {
    const {TreeDataList}=props
    const navigate = useNavigate()
    const [openStyle, setOpenStyle] = useState(true);
    const [StyleSelect, setStyleSelect] = useState<String>("");
    const [CategorySelect, setCategorySelect] = useState<String>("");
    const [styleId, setStyleId] = useState<String>("");
    const [selectTitle, setSelectTitle] = useState(false);
    const handleCatagory = (dataId: String) => {
        setStyleId(dataId);
        setOpenStyle(!openStyle)
    };
    const handleSelectCatagory = ( categoryId: String) => {
        setCategorySelect(categoryId)
        setStyleSelect("")
        setSelectTitle(false)
        const url = `CategoryLists/${categoryId}`
        navigate(url)
        props.handleNavigate&&props.handleNavigate({ categoryId: categoryId })
    };
    const handleSelectTitle = () => {
        setSelectTitle(true)
        setStyleSelect("")
        setCategorySelect("")
        const url = `CatagoryTitle`
        navigate(url)
    };
    const handleStyleSelect = ( categoryId: any) => {
        setStyleSelect(categoryId)
        setCategorySelect("")
        setSelectTitle(false)
        const url = `StyleListView/${categoryId}`
        navigate(url)
        props.handleNavigate&&props.handleNavigate({})
    };
    return (
        <Grid style={{ width: "200px", margin: "24px 0 0 24px" }} >
            <Paper>
                <ListItem button style={selectTitle ? { background: '#ccc' } : {}} onClick={() => handleSelectTitle()}>
                    <ListItemText primary={TreeDataList?.name} />
                </ListItem>
                {TreeDataList.children && TreeDataList?.children.map((item: any, i: number) => (
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <List component="div" >
                            <ListItem style={CategorySelect == item.id ? { background: '#ccc' } : {}} button onClick={() => handleSelectCatagory( item.id)}>
                                <ListItemText primary={item.category_name} />
                                {openStyle&&styleId==item.id ? <ExpandLess onClick={() => handleCatagory(item.id)} /> : <ExpandMore onClick={() => handleCatagory(item.id)} />}
                            </ListItem>
                            {item.t_prod_style.map((detailItem: any, j: number) => (
                                <Collapse in={openStyle&&styleId==item.id} timeout="auto" unmountOnExit>
                                    <List style={{ margin: "0px 0px 0 24px" }} component="div">
                                        <ListItem style={StyleSelect == detailItem.id ? { background: '#ccc' } : {}} button onClick={() => handleStyleSelect( detailItem.id)}>
                                            <ListItemText primary={detailItem.style_name} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            ))}
                        </List>
                    </Collapse>
                ))}
            </Paper>
        </Grid>
    )
}
export default TreeList;