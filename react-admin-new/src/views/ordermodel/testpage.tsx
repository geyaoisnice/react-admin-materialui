import { Paper } from "@mui/material";
import { Key, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import useGetTree from "../../components/usegettree/usegettree";
import Tree from "rc-tree";
import { TextField, Datagrid, List, Identifier, RaRecord } from "react-admin";


const TestPage = () => {
    return(
        <div style = {{display: 'flex', flexDirection: 'row'}}>
            <div style = {{width: '200px'}}>
                <MainPage/>
            </div>
            <div>
                <Routes>
                    <Route path = 'firstpage' element = {<FirstPage/>} />
                    <Route path = 'secondpage/:id' element = {<SecondPage/>} />
                </Routes>
            </div>
        </div>
    )
}

interface ITreeData extends Record<string, any> {
    key: string;
    title: string;
    children?: ITreeData[];
}

const MainPage = () => {
    const [treeData, setTreeData] = useState<ITreeData[]>([]);
    const [keys, setKeys] = useState<Key[]>([]);

    const {data} = useGetTree('t_lps_plant', 't_lps_line');

    useEffect(() => {
        if(data !== undefined) {
            let temp: ITreeData[] = [{key: '0', title: '测试树结构', children: new Array<ITreeData>()}];
            data.forEach(it => {
                it['key'] = `${it.id}`;
                it['title'] = it.name;
                it['isPlant'] = true;

                it.children && it.children.forEach((item: any) => {
                    item['key'] = `${it.id}-${item.id}`;
                    item['title'] = item.name;
                    item['isLine'] = true;
                })
            });

            temp[0].children = data;
            setTreeData(temp);
        }
    }, [data])

    const navigate = useNavigate();
    const handleSelect = (keys: Key[]) => {
        setKeys(keys);
        const key = keys[0];
        if(key === '0') {
            navigate('firstpage');
        }
    }

    return(
        <Paper sx = {{height: '100vh'}}>
            <Tree
                treeData={treeData}
                selectable = {true}
                selectedKeys={keys}
                onSelect={handleSelect}
            />
        </Paper>
    )
}

const FirstPage = () => {
    const navigate = useNavigate();
    const handleRowClick = (id: Identifier, resource: string, record: RaRecord): false => {
        navigate(`../secondpage/${id}`);
        return false;
    }

    return(
        <List resource="t_lps_plant">
            <Datagrid rowClick = {handleRowClick}>
                <TextField source = 'name'/>
                <TextField source = 'code' />
            </Datagrid>
        </List>
    )
}

const SecondPage = () => {
    const {id} = useParams();
    
    console.log('id is: ', id);

    return(
        <div>
            This is second page;  {id}
        </div>
    )
}



export default TestPage;