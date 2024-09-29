// import { ReactNode } from "react";

// type TUserData = {
//   name: string;
//   index?: boolean;
//   path?: string;
//   element?: ReactNode;
//   children?: TUserData[];
// };
// type TRoute = {
//   path?: string;
//   index?: boolean;
//   element?: ReactNode;
//   children?: TRoute[] | undefined;
// };

// export const routeGenerator = (routeData: TUserData[]) => {
//   const generateRoutes = routeData.reduce((acc: TRoute[], item) => {
//     if (item.index && item.element) {
//       acc.push({ index: item.index, element: item.element });
//     }
//     if (item.path && item.element) {
//       acc.push({ path: item.path, element: item.element });
//     }
//     // children handle
//     if (item.children) {
//       const childResponse = item?.children.map((child) => ({
//         path: child.path,
//         element: child.element,
//       }));
//       if (childResponse.length > 0) {
//         acc.push({ children: childResponse });
//       }
//     }

//     return acc;
//   }, []);
//   return generateRoutes;
// };
import { RouteObject } from "react-router-dom"; // Import RouteObject
import { ReactNode } from "react";

// Update TUserData to reflect RouteObject structure
type TUserData = {
  name: string;
  index?: boolean;
  path?: string;
  element?: ReactNode;
  children?: TUserData[];
};

// Use RouteObject directly in the generator
export const routeGenerator = (routeData: TUserData[]): RouteObject[] => {
  const generateRoutes = routeData.reduce((acc: RouteObject[], item) => {
    // Handle index routes
    if (item.index && item.element) {
      acc.push({ index: item.index, element: item.element });
    }

    // Handle normal routes with a path
    if (item.path && item.element) {
      acc.push({ path: item.path, element: item.element });
    }

    // Handle nested routes (children)
    if (item.children) {
      const childResponse = routeGenerator(item.children); // Recursive call to handle nested routes
      if (childResponse.length > 0) {
        acc.push({
          path: item.path, // Add path to parent route
          element: item.element,
          children: childResponse, // Assign generated children
        });
      }
    }

    return acc;
  }, []);
  return generateRoutes;
};
