// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// function Order() {
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <h2>test</h2>
//     </DashboardLayout>
//   );
// }

// export default Order;

/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Link } from "react-router-dom";
// Data
// import orderTableData from "layouts/OrderList/data/orderTableData";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import DB from "../../utils/firebase";

function OrderList() {
  const ordersColRef = collection(DB, "orders");

  const [orders, setOrders] = useState([]);

  const getData = async () => {
    const response = await getDocs(ordersColRef);
    response.forEach((doc) => {
      const obj = {
        ...doc.data(),
        id: doc.id,
      };
      setOrders((prev) => [...prev, obj]);
    });
  };

  useEffect(getData, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Order List
                </MDTypography>
              </MDBox>
              {orders &&
                orders.map((order) => (
                  <div key={order.id} className="orderContainer">
                    <Link to={`/test/${order.id}`}>Click Me</Link>
                    <p>ID: {order.id}</p>
                    <p>Status: {order.isCompleted === false ? "in progress" : "completed"}</p>
                    <p>Date: {order.date}</p>
                    <br />
                  </div>
                ))}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderList;
