// const adminPaths = [
//     {
//         name:"Dashboard Overview",
//         path:'/',
//         element:'<DashboardOverview />'
//     },
//     {
//         name:"Manage Cars",
//         path:'manage-cars',
//         element:'<ManagedCars />'
//     },
//     {
//         name:"Manage Booking",
//         path:'manage-booking',
//         element:'<ManageBookings />'
//     },
//     {
//         name:"Manege Return",
//         children:[
//             {
//                 name:"View Booked Cars",
//                 path:"booked-cars",
//                 element:'<ViewBookedCars />'
//             },
//             {
//                 name:"Return Options",
//                 path:"return",
//                 element:'<ReturnOptions />'
//             },
//         ]
//     },
//     {
//         name:"User Management",
//         path:"user-management",
//         element:'<UserManagement />'
//     }
// ]

// const routeGenerator = (routeData) =>{
//     const generateRoutes  =  routeData.reduce((acc, item)=>{
//      if (item.path && item.element) {
//          acc.push({path:item.path, element:item.element})
//      }

//     if (item.children) {
//         const childRes = item.children.map(child => ({
//             path:child.path,
//             element:child.element
//         }));
        
//         acc.push({children:childRes})
//     }
 
//      return acc
//     },[])
//     return generateRoutes 
 
//  }
 

//  console.log(routeGenerator(adminPaths))
 