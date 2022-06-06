import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from "react-router-dom";
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
                    <Link to={`/order/${order.id}`}>Заказ от {order.date}</Link>
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
