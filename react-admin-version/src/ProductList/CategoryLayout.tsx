

import React from "react"
import { Admin, CustomRoutes, Datagrid, Layout, LayoutProps, ListGuesser, List as ListM, EditButton, Resource, TextField, fetchUtils, useDataProvider, useListContext, useRefresh, ShowGuesser } from "react-admin";
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { StyleAdd } from "../StyleList/StyleAdd";
import chineseMessages from '@haxqer/ra-language-chinese';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { StyleShow } from "../StyleList/StyleShow";
import TreeList from "./TreeList";
import { ITreeDataList } from "./common";
import CatagoryTitle from "../Category/CatagoryTitle";
import { MaterialStyleListAdd } from "../MaterialStyle/MaterialStyleListAdd";
import MaterialStyleList from "../MaterialStyle/MaterialStyleList";
import { MaterialStyleListEdit } from "../MaterialStyle/MaterialStyleListEdit";
import StyleList from "../StyleList/StyleList";
import { StyleEdit } from "../StyleList/StyleEdit";
import CategoryList from "../Category/CategoryList";
import { CategoryShow } from "../Category/CategoryShow";
import { CategoryAdd } from "../Category/CategoryAdd";
import { CategoryEdit } from "../Category/CategoryEdit";
import CategoryLists from "../Category/CategoryLists";
import MaterialList from "../Material/MaterialList";
import { MaterialAdd } from "../Material/MaterialAdd";
import { MaterialEdit } from "../Material/MaterialEdit";
import { MaterialTypeAdd } from "../MaterialType/MaterialTypeAdd";
import { MaterialTypeEdit } from "../MaterialType/MaterialTypeEdit";
import MaterialTypeList from "../MaterialType/MaterialTypeList";
import RcTreeList from "./RcTreeList";

const i18nProvider = polyglotI18nProvider(() => chineseMessages, 'zh');
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
const config: IDataProviderConfig = {
  apiUrl: '/postgrest',
  httpClient: fetchUtils.fetchJson,
  defaultListOp: 'eq',
  primaryKeys: defaultPrimaryKeys,
  schema: defaultSchema
}
const baseDataProvider = postgrestRestProvider(config);
const dataProvider = {
  ...baseDataProvider,
  //可以在这里添加越过dataProvider的数据访问
}
const appBar = (props: any) => {
  return (
    <></>
  )
}
const useAppMenu = () => {
  return (<></>)
}
const mySidebar = () => {
  return (<></>)
}
const appLayout = (props: LayoutProps) => {
  return (
    <Layout
      sx={
        {
          '& .RaLayout-appFrame': {
            minHeight: '100%',
            height: '100%',
            margin: 0,
            padding: 0
          },
          '& .RaList-actions': { minHeight: 0, height: '48px' },
          '& .RaLayout-content:': { marginTop: 0, marginBottom: 0, padding: 0, minHeight: '100%', height: '100%' },
          '& .RaLayout-contentWithSidebar': { margin: 0, padding: 0, minHeight: '100%', height: '100%' },
          minHeight: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
        }
      }
      {...props}
      appBar={appBar}
      menu={useAppMenu}
      sidebar={mySidebar}
    />
  )
}
export var UserContext: React.Context<{}> = React.createContext({})
const CategoryLyout = () => {
  const dataProviders = useDataProvider();
  const [TreeDataList, setTreeDataList] = useState<any>({  })
  const [styleConext, setStyleConext] = useState<ICategory>({ categoryId: 0 });

  useEffect(() => {
    dataProviders.getStyleTree('t_prod_category', 't_prod_style').then((res: any) => {
      console.log(res, "resssssssss")
      let arr: any = []
      let arr1: any = [{
        key: 0,
        title: "品类管理",
      }]
      res && res.map((item: any, index: number) => {
        arr.push({ key: item.id, title: item.category_name, children: [] })
        item.t_prod_style && item.t_prod_style.map((item1: any, index1: any) => {
          if (arr.children) {
            arr[index].children = []
          }
          arr[index].children.push({ key: item1.id, title: item1.style_name })
        })
      })
      console.log(arr, "arr")
      arr1[0].children = arr
      setTreeDataList(arr1)
    })
  }, []);
  const handleUpdateList = () => {
    handleTreeData()
  }
  const handleTreeData = () => {
    dataProviders.getStyleTree('t_prod_category', 't_prod_style').then((res: any) => {
      console.log(res, "resssssssss")
      let arr: any = []
      let arr1: any = [{
        key: 0,
        title: "品类管理",
      }]
      res && res.map((item: any, index: number) => {
        arr.push({ key: item.id, title: item.category_name, children: [] })
        item.t_prod_style && item.t_prod_style.map((item1: any, index1: any) => {
          if (arr.children) {
            arr[index].children = []
          }
          arr[index].children.push({ key: item1.id, title: item1.style_name })
        })
      })
      console.log(arr, "arr")
      arr1[0].children = arr
      setTreeDataList(arr1)
    })
  }
  const handleNavigate = (Contextual: ICategory) => {
    setStyleConext(Contextual)
  }
  const handleType = (typeId: String, styleId: string) => {
    console.log({ ...styleConext, ...{ typeId: typeId } }, "styleConext")
    setStyleConext({ ...styleConext, ...{ typeId: typeId, styleId: styleId } })
  }
  return (
    <Grid style={{ margin: 0, padding: 0, display: "flex" }} >
      {/* <TreeList TreeDataList={TreeDataList} handleNavigate={handleNavigate}></TreeList> */}
      <RcTreeList TreeDataList={TreeDataList} handleNavigate={handleNavigate}></RcTreeList>
      <Grid style={{ flexGrow: "1", margin: "24px 0 0 24px" }} >
        <UserContext.Provider value={styleConext}>
          <Admin
            dataProvider={dataProvider}
            basename='/categoryman'
            layout={appLayout}
            i18nProvider={i18nProvider}
          >
            <Resource name='t_base_materiel' recordRepresentation="name" list={MaterialList} create={<MaterialAdd />} edit={<MaterialEdit />} hasEdit />
            <Resource name='t_sys_tenant' recordRepresentation="name" />
            <Resource name='t_base_materiel_type' list={MaterialTypeList} recordRepresentation="name" create={MaterialTypeAdd} edit={MaterialTypeEdit} />
            <Resource name='t_prod_category' recordRepresentation="category_name" list={CategoryList} show={CategoryShow} create={CategoryAdd} edit={CategoryEdit} hasEdit />
            <Resource name='t_prod_style' recordRepresentation="style_name" list={StyleList} create={<StyleAdd />} edit={<StyleEdit />} show={StyleShow} hasEdit />
            <Resource name='t_base_style_materiel' recordRepresentation="name" create={<MaterialStyleListAdd />} edit={<MaterialStyleListEdit />} hasEdit />
            <CustomRoutes>
              <Route path="CatagoryTitle" element={
                <CatagoryTitle handleUpdateList={handleUpdateList}></CatagoryTitle>
              } />
              {/* 多哥款式的查看页面 */}
              <Route path="CategoryLists/:params" element={
                <CategoryLists handleUpdateList={handleUpdateList}></CategoryLists>
              } />
              {/* 单个款式的查看页面 */}
              <Route path="StyleListView/:params" element={<MaterialStyleList handleType={handleType} />}></Route>
            </CustomRoutes>
          </Admin>
        </UserContext.Provider>
      </Grid>
    </Grid>
  )
}

export default CategoryLyout;