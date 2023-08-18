// 定义全局的数据类型
export interface IChildren{
    id?:number,
    category_name?:string,
    code?:string,
    key?:number,
    title?:string,
    t_prop_type?:IStyle[]
}
interface IStyle{
    id?:number,
    style_name?:string,
    code?:string
}
export interface ITreeDataList{
    key?:number,
    title?:string
    children?:IChildren
}