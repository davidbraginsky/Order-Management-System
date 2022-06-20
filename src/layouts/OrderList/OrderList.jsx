import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DB } from "../../utils/firebase";
import "./OrderList.css";

function OrderList() {
  const ordersColRef = collection(DB, "orders");
  const clientsColRef = collection(DB, "client");

  const [orders, setOrders] = useState([]);
  const [ordersCopy, setOrdersCopy] = useState([]);
  const [clientList, setClientList] = useState([]);

  const getData = async () => {
    const response = await getDocs(ordersColRef);
    response.forEach((doc) => {
      const obj = {
        ...doc.data(),
        id: doc.id,
      };
      setOrders((prev) => [...prev, obj]);
      setOrdersCopy((prev) => [...prev, obj]);
    });
    const clientResponse = await getDocs(clientsColRef);
    clientResponse.docs.forEach((doc) => {
      const newObj = { ...doc.data(), id: doc.id };
      setClientList((prevArray) => [...prevArray, newObj]);
    });
  };

  useEffect(getData, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const { value } = e.target[0].selectedOptions[0];
    const copiedData = [...ordersCopy];
    const filteredOrders = copiedData.filter((item) => item.client.value === value);
    setOrders(filteredOrders);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="orderListContainer">
        <div className="orderList">
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
                        <Link to={`/order/${order.id}`}>
                          Заказ от {order.date} для {order.client.title}
                        </Link>
                        {order.isCompleted ? (
                          <MDBadge color="success" badgeContent="готов" container />
                        ) : (
                          <MDBadge color="info" badgeContent="в работе" container />
                        )}
                        <br />
                      </div>
                    ))}
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </div>
        <div className="filter">
          Filter by:
          <form onSubmit={submitHandler}>
            <select>
              {clientList.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <button type="submit">Filter</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrderList;
