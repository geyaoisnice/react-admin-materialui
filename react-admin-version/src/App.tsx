import React, { useEffect, useState, useMemo } from 'react'
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import { Admin, CustomRoutes, Layout, LayoutProps, ListGuesser, Resource, fetchUtils, useCreatePath } from 'react-admin';
import CategoryList from './ProductList/CategoryLayout';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Menu } from "antd"
import axios from 'axios';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from '@haxqer/ra-language-chinese';
import MaterialTypeLayout from './MaterialType/MaterialTypeLayout';
import MaterialLayout from './Material/MaterialLayout';
import StudentList from './Student/StudentList';
import { StudentAdd } from './Student/StudentAdd';
const i18nProvider = polyglotI18nProvider(() => chineseMessages, 'zh');
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
  getStyleTree: (parentTable: string, childTable: string) => axios.get(`/postgrest/${parentTable}?select=id,category_name,code,${childTable}(id,style_name,code)&tenant_id=eq.1`)
    .then((res: any) => {
      return res.data;
    }
    )
}
export interface IMenuItem {
  label: React.ReactNode;
  title?: string;
  path?: string;
  key: string;
  icon?: React.ReactNode;
  children?: IMenuItem[];
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
const App = (props: any) => {
  const [appViewHeight, setAppViewHeight] = useState<string>('calc(100vh - 96px');
  useEffect(() => {
    if (!window.__RICHON_SHELL__) {
      setAppViewHeight('100vh');
    }
  }, []);
  useEffect(() => {
    const handleAppViewHeight = (e: any) => {
      if (typeof e.data === 'object') {
        if (e.data.appHeight !== undefined) {
          console.log(e.data.appHeight, "appHeight")
          const heigth = e.data.appHeight;
          setAppViewHeight(heigth);
        }
      }
    };
    window.addEventListener('message', handleAppViewHeight);
    return () => window.removeEventListener('message', handleAppViewHeight);
  }, []);
  const items = useMemo<IMenuItem[]>(() => {

    let menuItems: IMenuItem[] = new Array<IMenuItem>();
    // let categoryItem: IMenuItem = {
    //   key: 'categoryman',
    //   label: <Link to='/categoryman'>产品管理</Link>,
    //   path: '/categoryman'
    // }
    // let materialTypeItem: IMenuItem = {
    //   key: 'materialtype',
    //   label: <Link to='/materialtype'>物料类型管理</Link>,
    //   path: '/materialtype'
    // }
    // let materialItem: IMenuItem = {
    //   key: 'materiallist',
    //   label: <Link to='/materiallist'>物料管理</Link>,
    //   path: '/materiallist'
    // }
    let item: IMenuItem = {
      key: 'home',
      label: '功能测试',
      children: new Array<IMenuItem>(),
    }
    // item.children!.push(categoryItem);
    // item.children!.push(materialTypeItem);
    // item.children!.push(materialItem);
    let studentItem: IMenuItem = {
      key: 'studentman',
      label: <Link to='/studentman'>学生管理</Link>,
      path: '/studentman'
    }
    item.children!.push(studentItem);
    menuItems.push(item);
    return menuItems;
  }, [])
  return (
    <Grid style={{ height: `${appViewHeight}`, margin: 0, padding: 0, display: "flex" }}>
      <BrowserRouter basename={window.__RICHON_SHELL__ ? 'prodmanager' : ''}>
        <div>
          {
            !window.__RICHON_SHELL__ ?
              <div style={{ width: "200px" }}>
                <Menu
                  mode='inline'
                  theme='dark'
                  inlineCollapsed={false}
                  items={items}
                />
              </div>
              : null
          }
        </div>
        <div style={{ flexGrow: 1 }}>
          <Admin
            dataProvider={dataProvider}
            layout={appLayout}
            i18nProvider={i18nProvider}
          >
            {/* <Resource name='t_prod_style' list={ListGuesser} /> */}
            <Resource name='t_geyao_student' create={StudentAdd} list={ListGuesser} />
            <CustomRoutes>
              <Route path="studentman/*" element={<StudentList />} />
              {/* <Route path="categoryman/*" element={<CategoryList />} />
              <Route path="materialtype/*" element={<MaterialTypeLayout />} />
              <Route path="materiallist/*" element={<MaterialLayout />} /> */}
            </CustomRoutes>
          </Admin>
        </div>
      </BrowserRouter>
    </Grid>
  )
}
export default App