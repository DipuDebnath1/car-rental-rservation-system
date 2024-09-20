import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

type TUserData ={
        name:string,
        index?:boolean,
        path?:string,
        element?:ReactNode,
        ignore?:boolean,
        children?:TUserData[]
}
type TSidebarItem ={
        key?:string,
        label?:ReactNode,
        children?:TSidebarItem[]
}

export const SidebarNavigationGenerator = (routeData:TUserData[], role:string):TSidebarItem[] =>{
   const navigationItems  =  routeData.reduce((acc:TSidebarItem[], item)=>{

    if (item.index && item.element && !item.ignore ) {
        acc.push({
            label:<NavLink to={`/${role}`}>{item.name}</NavLink>,
            key:item.name,  
        })
    }
    if (item.path && item.element && !item.ignore) {
        acc.push({
            label:<NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
            key:item.name,
        })
    }
    // children handle 
    if (item.children) {
        const childResponse = item?.children.map(child => ({
            label:<NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
            key:child.name,
        }));
        if (childResponse.length>0) {
            acc.push({
                children:childResponse, 
                key:item.name, 
                label:item.name,
            })
        }
    }

    return acc
   },[])
   return navigationItems 

}
