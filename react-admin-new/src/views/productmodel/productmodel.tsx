import { Paper } from '@mui/material';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import React, { Key, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useGetTree from '../../components/usegettree/usegettree';
import { useRedirect } from 'react-admin';

const 
ProductModel = () => {
    return(
        <div style = {{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div style = {{width: '200px', marginRight: '10px'}}>
                <PlantTree />
            </div>
            <div style = {{width: '80%'}}>
                <Outlet/>
            </div>
        </div>
    )
}

interface ITreeData extends Record<string, any> {
    key: string;
    title: string;
    children?: ITreeData[];
}

const PlantTree = () => {
    const [treeData, setTreeData] = useState<ITreeData[]>([]);
    const [keys, setKeys] = useState<Key[]>([]);

    const {data} = useGetTree('t_prod_category', 't_prod_style');

    useEffect(() => {
        if(data !== undefined) {
            let temp: ITreeData[] = [{key: '0', title: '品类管理', children: new Array<ITreeData>()}];

            //向从数据库查询到的数据中添加Tree结构所需要的字段，key使用id，title使用name;
            data.forEach(it => {
                it['key'] = `${it.id}`;
                it['title'] = it.category_name;
                it['isPlant'] = true;
                it.children && it.children.forEach((item: any)=>{
                    item['key'] = `${it.id}-${item.id}`;
                    item['title'] = item.style_name
                    item['isLine'] = true;
                })
            });

            temp[0].children = data;
            setTreeData(temp);
        }
    }, [data]);

    const redirect = useRedirect();
    const handleTreeItemSelect = (keys: Key[]) => {
        setKeys(keys);
        const key = keys[0];

        if(key === '0') {
            redirect('categoryList');
        }

        let result = undefined;
        treeData[0].children && treeData[0].children.forEach((it: any) => {
            if(it.key === keys[0]) {
                result = it;
                return;
            }
            it.children?.forEach((child: any) => {
                if(child.key === keys[0]) {
                    result = child;
                    return;
                }
            })
        });
        if(result !== undefined) {
            if(Object.prototype.hasOwnProperty.call(result, 'isPlant')){
                redirect(`/product/styleList/${result['id']}`);
            }else{
                redirect(`/product/styleShow/${result['id']}/show`)
            }
        };
    }

    return(
        <Paper sx = {{height: '100vh'}}>
            <Tree
                treeData={treeData}
                 selectable = {true}
                selectedKeys={keys}
                onSelect={handleTreeItemSelect}
            />
        </Paper>
    )
}
export default ProductModel;