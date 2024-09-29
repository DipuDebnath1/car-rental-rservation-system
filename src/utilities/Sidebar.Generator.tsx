// import { ReactNode } from "react";
// import { NavLink } from "react-router-dom";

// type TUserData = {
//   name: string;
//   index?: boolean;
//   path?: string;
//   element?: ReactNode;
//   ignore?: boolean;
//   children?: TUserData[];
// };
// type TSidebarItem = {
//   key?: string;
//   label?: ReactNode;
//   children?: TSidebarItem[] | undefined;
// };

// export const SidebarNavigationGenerator = (
//   routeData: TUserData[],
//   role: string
// ): TSidebarItem[] => {
//   const navigationItems = routeData.reduce((acc: TSidebarItem[], item) => {
//     if (item.index && item.element && !item.ignore) {
//       acc.push({
//         label: <NavLink to={`/${role}`}>{item.name}</NavLink>,
//         key: item.name,
//       });
//     }
//     if (item.path && item.element && !item.ignore) {
//       acc.push({
//         label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
//         key: item.name,
//       });
//     }
//     // children handle
//     if (item.children) {
//       const childResponse = item?.children.map((child) => {
//         if (!child.ignore) {
//           return {
//             label: (
//               <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
//             ),
//             key: child.name,
//           };
//         }
//       });
//       if (childResponse.length > 0) {
//         acc.push({
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           // @ts-ignore
//           children: childResponse,
//           key: item.name,
//           label: item.name,
//         });
//       }
//     }

//     return acc;
//   }, []);
//   return navigationItems;
// };

import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import type { MenuProps } from "antd";

// // Define TSidebarItem to match Ant Design's structure
// type TSidebarItem = {
//   key: string; // Key is required by Ant Design's Menu
//   label: ReactNode; // Label for the menu item
//   children?: TSidebarItem[]; // Optional children for nesting
//   type?: "group"; // Type for grouping
// };

type TUserData = {
  name: string;
  index?: boolean;
  path?: string;
  element?: ReactNode;
  ignore?: boolean;
  children?: TUserData[];
};

// Function to generate sidebar items for navigation
export const SidebarNavigationGenerator = (
  routeData: TUserData[],
  role: string
): MenuProps["items"] => {
  return routeData.reduce<MenuProps["items"]>(
    (acc: MenuProps["items"], item) => {
      // Handle index routes
      if (item.index && item.element && !item.ignore) {
        acc!.push({
          label: <NavLink to={`/${role}`}>{item.name}</NavLink>,
          key: item.name,
        });
      }

      // Handle normal routes with a path
      if (item.path && item.element && !item.ignore) {
        acc!.push({
          label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
          key: item.name,
        });
      }

      // Handle children (nested routes)
      if (item.children) {
        const childResponse = SidebarNavigationGenerator(item.children, role); // Recursively handle children
        if (childResponse!.length > 0) {
          acc!.push({
            key: item.name, // Parent key
            label: item.name, // Parent label
            children: childResponse, // Nested child items
            type: "group", // Explicitly set type to "group" for parent items
          });
        }
      }

      return acc;
    },
    []
  );
};
