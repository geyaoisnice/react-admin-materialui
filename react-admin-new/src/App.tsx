import React, { useEffect, useMemo, useState, ElementType } from 'react';
import './App.css';
import { Grid } from '@mui/material';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { Admin, CustomRoutes, Layout, ListGuesser, Resource, fetchUtils } from 'react-admin';
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import ChineseMessages from '@haxqer/ra-language-chinese';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import NavListBar from './components/navlistbar/navlistbar';
import styled from '@emotion/styled';
import PlantModel from './views/plantmodel/plantmodel';
import axios from 'axios';
import PlantList from './views/plantmodel/plantlist';
import PlantCreate from './views/plantmodel/plantcreate';
import PlantEdit from './views/plantmodel/plantedit';
import PlantShow from './views/plantmodel/plantshow';
import LineList from './views/plantmodel/linelist';
import LineShow from './views/plantmodel/lineshow';
import LineCreate from './views/plantmodel/linecreate';
import LineEdit from './views/plantmodel/lineedit';
import TestPage from './views/ordermodel/testpage';
import EmpSkillList from './views/emp/empskilllist';
import EmpSkillCreate from './views/emp/empskillcreate';
import EmpSkillEdit from './views/emp/empskilledit';
import LineEmpEdit from './views/emp/lineempedit';
import EquipList from './views/equip/equiplist';
import EquipCreate from './views/equip/equipcreate';
import EquipEdit from './views/equip/equipedit';
import LineEquipCreate from './views/equip/lineequipcreate';
import OrderPool from './views/orderpool/orderpool';
import SharedModule from './shared/shared';
import OrderTypeList from './views/order/ordertypelist';
import OrderTypeCreate from './views/order/ordertypecreate';
import OrderTypeEdit from './views/order/ordertypeedit';
import CustomerList from './views/order/customerlist';
import CustomerCreate from './views/order/customercreate';
import MaterialTypeList from './views/materialtypemodel/MaterialType/MaterialTypeList';
import { MaterialTypeAdd } from './views/materialtypemodel/MaterialType/MaterialTypeAdd';
import { MaterialTypeEdit } from './views/materialtypemodel/MaterialType/MaterialTypeEdit';
import MaterialList from './views/materielmodel/MaterialList';
import { MaterialAdd } from './views/materielmodel/MaterialAdd';
import { MaterialEdit } from './views/materielmodel/MaterialEdit';
import ProductModel from './views/productmodel/productmodel';
import CategoryList from './views/productmodel/categorylist';
import CategoryCreate from './views/productmodel/categorycreate';
import  CategoryEdit from './views/productmodel/categoryedit';
import CategoryShow from './views/productmodel/categoryshow';
import StyleList from './views/productmodel/stylelist';
import StyleCreate from './views/productmodel/stylecreate';
import StyleEdit from './views/productmodel/styleedit';
import StyleShow from './views/productmodel/styleshow';
import { MaterialStyleListAdd } from './views/productmodel/materialstyleadd';
import StudentList from './views/students/studentlist';


const EmptyAppBar = (props: any) => {
  return (
    <></>
  )
}

const EmptyMenu = () => {
  return (
    <></>
  )
}

const EmptySideBar = () => {
  return (
    <></>
  )
}

const config: IDataProviderConfig = {
  apiUrl: '/postgrest',
  httpClient: fetchUtils.fetchJson,
  defaultListOp: 'eq',
  primaryKeys: defaultPrimaryKeys,
  schema: defaultSchema
}

const postgrestDataProvider = postgrestRestProvider(config);
const dataProvider = {
  ...postgrestDataProvider,
  getTree: (parentTable: string, childTable: string) => axios.get(
    `${config.apiUrl}/${parentTable}?select=*, isParent:id, children:${childTable}(*)`
  ).then((res: any) => {
    return res.data;
  })
}

const i18nProvider = polyglotI18nProvider(() => ChineseMessages, 'zh');


export interface ISubItem {
  label: React.ReactNode;
  path?: string;

  icon?: React.ReactElement;
}
export interface INavItem {
  id: number;
  open: boolean;
  title: string;
  children: ISubItem[];
}

const NoneDecorationLink = styled(Link)<{ component?: ElementType }>({
  textDecoration: 'none',
  color: 'white'
})

export interface IAppProps {
  shared: SharedModule;
}

const App: React.FC<IAppProps> = (props: any) => {
  const [appViewHeight, setAppViewHeight] = useState<string>('calc(100vh - 96px');

  const items = useMemo<INavItem[]>(() => {
    let navItems: INavItem[] = new Array<INavItem>();

    // let plantModel: INavItem = { id: 1, open: false, title: '工厂建模', children: new Array<ISubItem>() };
    // const plantmanager: ISubItem = { path: '/plantmodel/*', label: <NoneDecorationLink style={{ color: 'white' }} to='/'>工厂管理</NoneDecorationLink> }
    // plantModel.children.push(plantmanager);

    // const testpage: ISubItem = { path: '/testpage/*', label: <NoneDecorationLink style={{ color: 'white' }} to='/testpage'>测试路由</NoneDecorationLink> }
    // plantModel.children.push(testpage);
    // navItems.push(plantModel);
    // let baseItems: INavItem = { id: 2, open: false, title: '基础数据', children: new Array<ISubItem>() };
    // let empItem: ISubItem = { path: '/t_lps_emp_skill', label: <NoneDecorationLink style={{ color: 'white' }} to='/t_lps_emp_skill'>员工技能</NoneDecorationLink> }
    // let equitItem: ISubItem = { path: '/t_lps_equip_type', label: <NoneDecorationLink style={{ color: 'white' }} to='/t_lps_equip_type'>设备类型</NoneDecorationLink> };
    // baseItems.children.push(empItem);
    // baseItems.children.push(equitItem);
    // navItems.push(baseItems);
    // let orderPoolManItems: INavItem = { id: 3, open: false, title: '订单池管理', children: new Array<ISubItem>() };
    // let orderPoolItem: ISubItem = { path: '/orderpool', label: <NoneDecorationLink style={{ color: 'white' }} to='/orderpool'>订单池</NoneDecorationLink> }
    // orderPoolManItems.children.push(orderPoolItem);
    // let orderTypeItem: ISubItem = { path: 'ordertype', label: <NoneDecorationLink to='/t_lps_order_type'>订单类型</NoneDecorationLink> }
    // orderPoolManItems.children.push(orderTypeItem);
    // let customerItem: ISubItem = { path: 't_lps_customer', label: <NoneDecorationLink to='t_lps_customer'>订单客户</NoneDecorationLink> }
    // orderPoolManItems.children.push(customerItem);
    // navItems.push(orderPoolManItems);
    // let materialManItems: INavItem = { id: 4, open: false, title: '物料管理', children: new Array<ISubItem>() };
    // let materialTypeItem: ISubItem = { path: 'materialtype', label: <NoneDecorationLink style={{ color: 'white' }} to='/t_base_materiel_type'>物料类型管理</NoneDecorationLink> }
    // materialManItems.children.push(materialTypeItem);
    // let materialItem: ISubItem = { path: 'materialtype', label: <NoneDecorationLink style={{ color: 'white' }} to='/t_base_materiel'>物料管理</NoneDecorationLink> }
    // materialManItems.children.push(materialItem);
    // navItems.push(materialManItems);
    // let productManItems: INavItem = { id: 5, open: false, title: '产品管理', children: new Array<ISubItem>() };
    // const categoriesmanager: ISubItem = { path: '/categories/*', label: <NoneDecorationLink style={{ color: 'white' }} to='/product'>产品建模</NoneDecorationLink> }
    // productManItems.children.push(categoriesmanager);
    // navItems.push(productManItems);
    let studentItems: INavItem = { id: 6, open: false, title: '学生信息管理', children: new Array<ISubItem>() };
    const studentmanager: ISubItem = { path: '/school/*', label: <NoneDecorationLink style={{ color: 'white' }} to='/t_geyao_student'>学生信息</NoneDecorationLink> }
    studentItems.children.push(studentmanager);
    navItems.push(studentItems);
    return navItems;
  }, []);

  useEffect(() => {
    if (!window.__RICHON_SHELL__) {
      setAppViewHeight('100vh');
    }
  }, []);

  useEffect(() => {
    const handleAppViewHeight = (e: any) => {
      if (typeof e.data === 'object') {
        if (e.data.appHeight !== undefined) {
          setAppViewHeight(e.data.appHeight);
        }
      }
    };

    window.addEventListener('message', handleAppViewHeight);
    return () => window.removeEventListener('message', handleAppViewHeight);
  })

  return (
    <Grid sx={{ height: `${appViewHeight}`, margin: 0, padding: 0, display: 'flex' }}>
      <BrowserRouter basename={window.__RICHON_SHELL__ ? 'lpsapp' : ''}>
        <div>
          {
            !window.__RICHON_SHELL__ ?
              <div style={{ width: '200px' }}>
                <NavListBar items={items} />
              </div>
              : null
          }
        </div>
        <div style={{ flexGrow: 1 }}>
          <Admin
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            layout={(props) => (<Layout {...props}
              sx={{
                '& .RaLayout-appFrame': { marginTop: '0px' },
                '& .RaList-actions': { minHeight: 0, height: '48px' },
              }}
              appBar={EmptyAppBar}
              menu={EmptyMenu}
              sidebar={EmptySideBar}
            />)}
          >
            <Resource name='t_lps_plant' list={ListGuesser} recordRepresentation={'name'} />

            {/**产线产能相关 */}
            <Resource name='t_lps_emp_skill' list={EmpSkillList} create={EmpSkillCreate} edit={EmpSkillEdit} recordRepresentation={'skill_level'} />
            <Resource name='t_lps_equip_type' list={EquipList} create={EquipCreate} edit={EquipEdit} recordRepresentation={'name'} />
            <Resource name='t_lps_line_equip' list={ListGuesser} create={LineEquipCreate} />

            {/**订单及订单池相关 */}
            <Resource name='t_lps_order_type' list={OrderTypeList} create={OrderTypeCreate} edit={OrderTypeEdit} recordRepresentation={'type_name'} />
            <Resource name='t_lps_customer' list={CustomerList} create={CustomerCreate} recordRepresentation={'name'} />
            <Resource name='t_lps_order' />
            {/**物料类型相关 */}
            <Resource name='t_base_materiel_type' list={MaterialTypeList} recordRepresentation="name" create={MaterialTypeAdd} edit={MaterialTypeEdit} />
            <Resource name='t_base_materiel' recordRepresentation="name" list={<MaterialList />} create={<MaterialAdd />} edit={<MaterialEdit />} />
            {/**产品品类款式相关 */}
            <Resource name='t_prod_category' recordRepresentation="category_name" />
            <Resource name='t_sys_tenant' recordRepresentation="name" />

            <Resource name='t_base_style_materiel' recordRepresentation="name" create={<MaterialStyleListAdd />}  />
      
            {/* 学生信息管理 */}
            <Resource name='t_geyao_student' list={StudentList} recordRepresentation="name" />
            <CustomRoutes>
              {/* <Route path='/' element={<PlantModel />}>
                <Route path='plantList' element={<PlantList />} />
                <Route path='plantCreate' element={<PlantCreate />} />
                <Route path='plantEdit/:id/*' element={<PlantEdit />} />
                <Route path='plantShow/:id/show/*' element={<PlantShow />} />
                <Route path='lineList/:id/*' element={<LineList />} />
                <Route path='lineCreate/:id/*' element={<LineCreate />} />
                <Route path='lineEdit/:id/*' element={<LineEdit />} />
                <Route path='lineShow/:id/show' element={<LineShow />} />
                <Route path='lineeditedit/:id' element={<LineEmpEdit />} />
              </Route>
              <Route path='/product' element={<ProductModel />}>
                <Route path='categoryList' element={<CategoryList />} />
                <Route path='categoryCreate' element={<CategoryCreate />} />
                <Route path='categoryEdit/:id/*' element={<CategoryEdit />} />
                <Route path='categoryShow/:id/show/*' element={<CategoryShow />} />
                <Route path='styleList/:id/*' element={<StyleList />} />
                <Route path='styleCreate/:id/*' element={<StyleCreate/>} />
                <Route path='styleEdit/:id/*' element={<StyleEdit/>}/>
                <Route path='styleShow/:id/show' element={<StyleShow />} />
              </Route>
              <Route path='/testpage/*' element={<TestPage />} />
              <Route path='/orderpool/*' element={<OrderPool />} /> */}
              <Route path='/school/*' element={<StudentList />} />
            </CustomRoutes>
          </Admin>
        </div>
      </BrowserRouter>
    </Grid>
  )
}

export default App;
