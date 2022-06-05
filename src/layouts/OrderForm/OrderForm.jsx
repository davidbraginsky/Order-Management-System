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
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";

// Data
// import orderTableData from "layouts/Order/data/orderTableData";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import DB from "../../utils/firebase";
// import { object } from "prop-types";

function OrderForm() {
  // const { columns, rows } = orderTableData();

  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({});

  const itemsColRef = collection(DB, "items");
  const ordersColRef = collection(DB, "orders");

  const getData = async () => {
    const response = await getDocs(itemsColRef);
    response.docs.forEach((doc) => {
      const newObj = { ...doc.data(), id: doc.id };
      setItems((prevArray) => [...prevArray, newObj]);
    });
  };

  useEffect(getData, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = { items: order, isCompleted: false, date: Date() };
    addDoc(ordersColRef, obj);
    setOrder({});
  };

  const changeHandler = (e, id, title) => {
    setOrder({ ...order, [id]: { quantity: e.target.value, title, id } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={submitHandler}>
        {items.map((item) => (
          <div key={item.id} className="formBlock">
            <span>{item.title}</span>
            <input
              onChange={(e) => changeHandler(e, item.id, item.title)}
              value={order.id}
              type="number"
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </DashboardLayout>
  );
}

export default OrderForm;
