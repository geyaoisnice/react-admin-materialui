

import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "rc-tree/assets/index.css"
import Tree from 'rc-tree';
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
interface IItem {
    key: number,
    title: string,
    children?: any
}
interface ITreeList {
    TreeDataList?: any,
    handleNavigate: (data: any) => void
}
const STYLE = `
.rc-tree-child-tree {
  display: block;
}
.node-motion {
  transition: all .3s;
  overflow-y: hidden;
}
`;
const motion = {
    motionName: 'node-motion',
    motionAppear: false,
    onAppearStart: () => ({ height: 0 }),
    onAppearActive: (node: any) => ({ height: node.scrollHeight }),
    onLeaveStart: (node: any) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
};
const RcTreeList = (props: ITreeList) => {
    const { TreeDataList } = props
    const navigate = useNavigate()
    const onSelect = (selectedKeys: any, info: any) => {
        let type = changeType(selectedKeys)
        if (type == "0") {
            const url = `CatagoryTitle`
            navigate(url)
        } else if (type == "1") {
            const url = `CategoryLists/${selectedKeys[0]}`
            navigate(url)
            props.handleNavigate && props.handleNavigate({ categoryId: selectedKeys[0] })
        } else {
            const url = `StyleListView/${selectedKeys[0]}`
            navigate(url)
            props.handleNavigate && props.handleNavigate({})
        }
    };
    const changeType = (data: any) => {
        const { TreeDataList } = props
        let type = "2"
        TreeDataList && TreeDataList.map((item: IItem, index: number) => {
            if (item.key == data[0]) {
                type = "0"
                return type
            }
            item.children && item.children.map((item1: IItem, index: number) => {
                if (item1.key == data[0]) {
                    type = "1"
                    return type
                }
            })
        })
        return type
    }
    return (
        <Grid style={{ width: "200px", margin: "24px 0 0 24px" }} >
            <div>
                <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                {TreeDataList.length>0?(
                     <Tree
                     defaultExpandAll={true}
                     defaultExpandedKeys={[]}
                     motion={motion}
                     onSelect={onSelect}
                       treeData={TreeDataList}
                 />
                ):null}
            </div>
        </Grid>
    )
}
export default RcTreeList;