import { Box, Card, CardContent, Chip, Divider, Tab, Grid, Stack, Paper, TextField as MuiTextField, 
    Button, useTheme, ThemeProvider, Autocomplete, Typography} from "@mui/material";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from '@mui/material/Dialog';
import { Datagrid, Labeled, List, ReferenceField, Show, TextField, useCreate, useGetList, useNotify, useRefresh, Button as RaButton, 
    useRecordContext, TopToolbar, SimpleForm, TextInput, useUpdate, WithRecord, RaRecord, SaveButton } from "react-admin"
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import _ from 'lodash';
import { useParams } from "react-router-dom";
import { ChangeCircleOutlined} from "@mui/icons-material";
import asyncCommon from "../../components/asynccommon/asynccommon";

const StyleShow = () => {
    const {id} = useParams();

    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    return(
        <Show resource = 't_prod_style'>
            <Box sx={{width: 'calc(100vw - 450px)'}} >
                <Card elevation={0}>
                    <CardContent>
                        <Divider textAlign="left">款式基本信息</Divider>
                        <Grid container spacing={1} >
                            <Grid item xs ={12} sm = {6} md = {3} >
                                <Labeled source = '编码'>
                                    <TextField source = 'code'/>
                                </Labeled>
                            </Grid>
                            <Grid item xs ={12} sm = {6} md = {3} >
                                <Labeled source = '名称'>
                                    <TextField source = 'style_name' />
                                </Labeled>
                            </Grid>
                            <Grid item xs ={12} sm = {6} md = {3} >
                                <Labeled source = '品类编号'>
                                    <TextField source = 'category_id' />
                                </Labeled>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Divider>
                            <Chip label = '产线资源配置' />    
                    </Divider>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="物料管理" value="1" />
                            <Tab label="工艺管理" value="2" />
                        </TabList>
                        </Box>
                        <TabPanel value="1"><LineEmpInfo  line_id={id}/></TabPanel>
                        <TabPanel value="2"><LineEquipInfo line_id = {id} />维护工艺相关的信息</TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Show>
    )
}

//#region 设备配置相关
const ListAction: React.FC<{line_id: string | number }> = (props) => {
    const {line_id } = props;
    
    const [create] = useCreate();
    const refresh = useRefresh();
    const notify = useNotify();
    const theme = useTheme();
    
    //useRef can find in async function
    const countRef = useRef<number>();
    const descRef = useRef<string>();
    const equipTypeIdRef = useRef<number>();

    const [equipTypeList, setEquipTypeList] = useState<{id: number, label: string, name: string}[]>([]);

    const {data} = useGetList('t_lps_equip_type');
    useEffect(() => {
        if(data !== undefined) {
            data.forEach(it => {
                it['label'] = it['code'];
            });

            setEquipTypeList(data);
        }
    }, [data]);
 

    const handleClick =  async (event: React.MouseEvent<HTMLButtonElement>) => {
        //创建动态页面
        const result = await asyncCommon(({onSubmit, onDismiss, show}) => {
            const onOk = () => {
                //可以在这里实现数据插入操作
                onSubmit({line_id, desc: descRef.current, count: countRef.current, equipType_Id: equipTypeIdRef.current});
            }

            const onCancel = () => {
                onDismiss();
            }

            const handleEquipCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                countRef.current = Number(event.target.value);
            }

            const handleEquipDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                descRef.current = event.target.value;
            }

            return(
                <ThemeProvider theme = {theme}>
                    <Paper sx = {{display: 'flex', flexDirection: 'column', marginTop: '25px', height: '560px'}}>
                        <MuiTextField sx = {{ width: '400px', alignSelf: 'center' , marginTop: '16px'}} label = '产线编号' variant= 'outlined' 
                            defaultValue={line_id}
                            disabled
                        />
                        <Autocomplete
                            sx = {{ width: '400px', alignSelf: 'center' , marginTop: '16px'}}
                            disablePortal
                            id = 'equip_type'
                            options={equipTypeList}
                            getOptionLabel={(option: any) => option.name}
                            onInputChange={(event: any, newValue: string | null) =>{
                                //按照名称查找ID
                                const item = equipTypeList.filter(it => it['name'] === newValue);
                                if(item.length > 0) {
                                    equipTypeIdRef.current = item[0].id;
                                }
                            }}
                            renderInput={(params) => <MuiTextField {...params} label = '设备类型' />}
                        />
                        <MuiTextField sx = {{ml: '8px', width: '400px', alignSelf: 'center'}} label = '设备数量' variant= 'outlined' 
                            onChange = {handleEquipCountChange}
                        />
                        
                        <MuiTextField sx = {{ml: '8px', width: '400px', alignSelf: 'center'}} label = '说明' variant= 'outlined' 
                            onChange={handleEquipDescChange}
                        />
                        <div style = {{alignSelf: 'center', marginBottom: '16px', marginTop: '16px', position: 'relative'}}>
                            <RaButton sx = {{mr: '16px'}} variant="outlined" onClick={onOk} label = '确认' />
                            <RaButton variant="outlined" onClick={onCancel} label="退出"/>
                        </div>
                    </Paper>
                </ThemeProvider>
            )
        }) as {line_id: number, desc: string, count: number, equipType_Id: number};

        if(result !== undefined) {
            create('t_lps_line_equip', 
                {data: {line_id: result.line_id, equip_type_id: result.equipType_Id, count: result.count, description: result.desc}}, {
                    onSuccess: () => {
                        refresh();
                    },
                    onError: (error) => {
                        notify('插入错误', {type: 'error'});
                    }
                }
            );
        }

        countRef.current = undefined;
        descRef.current = undefined;
        equipTypeIdRef.current = undefined;
    }

    return(
        <TopToolbar>
            <RaButton
                label="新建"
                onClick={handleClick}
            />
        </TopToolbar>
    )
}

const LineEquipInfo: React.FC<{line_id: string | undefined}> = (props) => {
    const {line_id = 0} = props;

    const Empty = () => (
        <Paper>
            <Typography>尚未配置设备，点击新建配置</Typography>
            <ListAction line_id = {line_id}/>
        </Paper>
    )

    return(
        <Stack sx = {{minHeight: '300px'}}>
            <List resource="t_lps_line_equip" filter={{line_id}} exporter = {false}
                actions = {<ListAction line_id = {line_id}/>}
                empty = {<Empty />}
            >
                <Datagrid>
                    <TextField source = 'line_id' label = '产线编号' />
                    <ReferenceField source = 'equip_type_id' reference="t_lps_equip_type" label = '设备类型' />
                    <TextField source = 'count' label = '设备数量' />
                    <TextField source = 'description' label = '说明' />
                </Datagrid>
            </List>
        </Stack>
    )
}
//#endregion

//#region 配置产线员工相关
const SkillLi = styled('li')({
    '&:hover': {
        backgroundColor: '#cdcdcd'
    }    
})

interface IConfirmatinDialogProps {
    record_id: string;
    record: RaRecord;
    keepMounted: boolean;
    open: boolean;
    onClose: () => void;
}

const ConfirmationDialog: React.FC<IConfirmatinDialogProps> = (props) => {
    const {record_id, record, open, onClose, ...other} = props;

    // const handleOk = () => {
    //     onClose();
    // };

    const handleClose = (ev: React.SyntheticEvent, reason: string) => {
        // console.log('handleClose ev: ', ev, 'reason: ', reason);
    }

    const [update] = useUpdate();
    // const handleSuccess = (data: any) => {
    //     update('t_lps_line_emp', {id: record_id, data}, {
    //         onSuccess: ()=> onClose(),
    //     });
    // }

    const handleSubmit = (data: Record<string, any>) => {
        update('t_base_style_materiel', {id: record_id, data}, {
            onSuccess: ()=> onClose(),
        });
    }
    return(
        <Dialog 
            open = {open}
            onClose={handleClose}
            sx = {{ '& .MuiDialog-paper': {width: '20%', maxHeight: '435'}}}
            {...other}
        >
            <DialogTitle>修改产线员工记录</DialogTitle>
            <DialogContent dividers>
                {/* <Edit resource = 't_lps_line_emp' id = {record_id} 
                    mutationOptions={{onSuccess: handleSuccess}}
                > */}
                    <SimpleForm record={record}
                        onSubmit={handleSubmit}
                        toolbar = {
                            <>
                                <SaveButton/>
                                <RaButton variant="contained" label = '返回' 
                                    sx = {{ml: '45px', fontSize: '15px', px: '16px', py: '7px'}} 
                                    onClick = {() => onClose()}
                                >
                                    <AssignmentReturnIcon/></RaButton>
                            </>
                        }
                    >
                        <WithRecord label = '员工人数'
                            render={rec => (<div style = {{display: 'flex', flexDirection: 'row'}}>
                                    <Typography>产线ID</Typography>
                                    {rec.line_id}
                                </div>
                            )}
                        />
                        <TextInput source = 'count' label = '数量' />
                        <TextInput source = 'description' label = '说明' />
                    </SimpleForm>
                {/* </Edit> */}
            </DialogContent>
            {/* <DialogActions>
                <Button onClick = {handleOk}>取消</Button>
            </DialogActions> */}
        </Dialog>
    )
}

const ChangeButton = () => {
    const [open, setOpen] = useState<boolean>(false);
    const record = useRecordContext();

    return(
        <div>
            <RaButton label = '修改'
                onClick={()=>setOpen(true)}
            >
                <ChangeCircleOutlined/>
            </RaButton>

            <ConfirmationDialog 
                record_id = {record.id.toString()}
                record={record}
                open = {open} onClose={()=>setOpen(false)} keepMounted = {true} 
            />
        </div>
    )
}

const LineEmpInfo: React.FC<{line_id: string | undefined}> = (props) => {
    const [skillList, setSkillList] = useState<any[]>([]);
    const [matId, setMatId] = useState<number>(0);
    const [count, setCount] = useState<string>('');     //作为TextField的value属性的值，一定要初始化，否则会出现如下错误
                                                        // A component is changing an uncontrolled input to be controlled. 
                                                        // This is likely caused by the value changing from undefined to a defined value
    const [desc, setDesc] = useState<string>('');

    const {data} = useGetList(
        't_base_materiel',
        {
            sort: {field: 'id', order: 'ASC'}
        }  
    );

    useEffect(() => {
        if(data !== undefined) {
            if(data.length === skillList.length) {      //数据相同，不用覆盖，否则会失列表的选择失效
                return;
            }

            data.forEach(it => {
                it['isSelected'] = false;
            });

            setSkillList(data);
        }
    }, [data]); //eslint-disable-line

    const handleClick = (idx: number,matId:number) => {
        setMatId(matId)
        console.log(idx,"idx is")
        let temp = _.cloneDeep(skillList);

        if(temp[idx]['isSelected'] === true) {
            temp[idx]['isSelected'] = false;
            setSkillList(temp);

            return;
        }
        temp.forEach(it => it['isSelected'] = false);
        temp[idx]['isSelected'] = true;

        setSkillList(temp);
    }

    const [create] = useCreate();
    const refresh = useRefresh();
    const notify = useNotify();
    const handleSave = () => {
        //获得选择的员工技能ID
        const skill = skillList.filter(it => it.isSelected === true);
        if(skill.length !== 0){
            const skill_id = skill[0].id;
            const line_id = props.line_id;

            if(count === undefined) {
                notify('请填入数量', {type: 'warning'});
                return;
            }
            //获得输入的数据插入数据
            create('t_base_style_materiel', {data: {mat_id:matId, count: Number(count), description: desc}}, {
                onSuccess: () => {
                    setDesc('');
                    setCount('');
                    refresh();
                },
                onError: () => {
                    notify('违反唯一约束', {type: 'error'});
                }
            });
        }else {
            notify('请先选择技能级别', {type: 'warning'});
        }
    }

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(event.target.value);
    }

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    }

    const Empty = () => (
        <Paper>
            <Typography sx = {{m: 4}}>尚未配置设备，在右边输入信息并点击保存新建配置</Typography>
        </Paper>
    )

    return(
        <Stack direction= 'row'>
            <Paper sx = {{width: '20%'}} elevation={1}>
                <ul style = {{marginBottom: '0px', marginTop: '0px', padding: '0 8px 0 8px'}}>
                    <li style = {{backgroundColor: '#cdcdcd', listStyle: 'none', textAlign: 'center', fontWeight: 'bold'}}>物料列表</li>
                </ul>
                <ul style = {{listStyle: 'none', padding: '8px', margin: '0 0 0 0'}}>
                    {
                        skillList && skillList.map((item, idx) => {
                            const bgcolor = item['isSelected']? {backgroundColor: 'lightgreen'}: {backgroundColor: ''};
                            return (
                                <SkillLi style = {bgcolor} key = {idx} onClick={()=>handleClick(idx,item.id)}>{ item['name']} </SkillLi>
                            )
                        })
                    }
                </ul>
            </Paper>
            <Paper sx = {{width: '60%', marginLeft: '4px', marginRight: '4px'}} elevation={1}>
                <List resource = 't_base_style_materiel'
                    exporter = {false} hasCreate = {true}
                    filter={{mat_id: matId}}
                    empty = {<Empty />}
                >
                    <Datagrid>
                        <ReferenceField source = 'mat_id' label = '物料类型' reference="t_base_materiel" />
                        <TextField source = 'count' label = '数量'  />
                        <TextField source = 'description' label = '说明' />
                        <ChangeButton />
                    </Datagrid>
                </List>
            </Paper>
            <Paper sx = {{width: '20%', position: 'relative'}} elevation={1} >
                <div style = {{position: 'absolute', bottom: '20px'}}>
                    <MuiTextField sx = {{ml: '8px'}} label = '输入说明' variant= 'standard' type="number"
                        value={desc}
                        onChange={handleDescChange}
                    />
                    <MuiTextField sx = {{ml: '8px'}} label = '输入数量' variant= 'standard'
                        value={count}
                        onChange={handleFieldChange}
                    />
                    <Button variant= 'outlined' sx = {{marginTop: '12px', marginLeft: '60px'}} 
                        onClick={handleSave}
                    >
                        保存
                    </Button>
                </div>
            </Paper>
        </Stack>
    )
}
//#endregion

export default StyleShow;