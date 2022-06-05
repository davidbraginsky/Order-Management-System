// /* eslint-disable react/prop-types */
// /* eslint-disable react/function-component-definition */
// /**
// =========================================================
// * Material Dashboard 2 React - v2.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2022 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import MDBox from "components/MDBox";
// // import MDTypography from "components/MDTypography";
// // import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";
// import { collection, getDocs } from "firebase/firestore";
// import { useState } from "react";
// import DB from "../../../utils/firebase";

// const ordersColRef = collection(DB, "orders");

// const [orders, setOrders] = useState([]);

// const getData = async () => {
//   const response = await getDocs(ordersColRef);
//   response.forEach((doc) => {
//     setOrders((prev) => [...prev, doc.id]);
//   });
//   // console.log(orders);
// };

// getData();

// export default function data() {
//   return {
//     columns: [
//       { Header: "ID", accessor: "id", width: "45%", align: "left" },
//       { Header: "status", accessor: "status", align: "center" },
//       { Header: "date", accessor: "date", align: "center" },
//     ],

//     rows: [
//       {
//         id: "1234324",
//         status: "completed",
//         date: "05.06.2022",
//       },
//       {
//         id: "testID",
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge badgeContent="Completed" color="success" variant="gradient" size="sm" />
//           </MDBox>
//         ),
//         date: "05.06.2022",
//       },
//     ],
//   };
// }
