import { ReactNode } from "react"

type TUserData ={
        name:string,
        index?:boolean,
        path?:string,
        element?:ReactNode,
        children?:TUserData[]
}
type TRoute ={
        path?:string,
        index?:boolean,
        element?:ReactNode,
        children?:TRoute[] | undefined
}

export const routeGenerator = (routeData:TUserData[]) =>{
   const generateRoutes  =  routeData.reduce((acc:TRoute[], item)=>{

    if (item.index && item.element) {
        acc.push({index:item.index, element:item.element})
    }
    if (item.path && item.element) {
        acc.push({path:item.path, element:item.element})
    }
    // children handle 
    if (item.children) {
        const childResponse = item?.children.map(child => ({
            path:child.path,
            element:child.element
        }));
        if (childResponse.length>0) {
            acc.push({children:childResponse})
        }
    }

    return acc
   },[])
   return generateRoutes 

}
