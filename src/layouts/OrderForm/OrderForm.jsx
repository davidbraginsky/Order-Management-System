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
import { collection, getDocs } from "firebase/firestore";
import DB from "../../utils/firebase";

function OrderForm() {
  // const { columns, rows } = orderTableData();

  const [items, setItems] = useState([]);

  const colRef = collection(DB, "items");

  const getData = async () => {
    const response = await getDocs(colRef);
    response.docs.forEach((doc) => {
      const newObj = { ...doc.data(), id: doc.id };
      setItems((prevArray) => [...prevArray, newObj]);
    });
  };

  useEffect(getData, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const inputArray = Array.from(e.target);
    inputArray.pop();
    const filteredArray = inputArray.filter((input) => input.value !== "");
    console.log(filteredArray);

    const orderArray = [];

    filteredArray.forEach((input) => {
      orderArray.push({ title: input.dataset.title, quantity: input.value, id: input.id });
    });

    console.log(orderArray);
  };

  // const [data, setData] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={submitHandler}>
        {items.map((item) => (
          <div key={item.id} className="formBlock">
            <span>{item.title}</span>
            <input data-title={item.title} type="number" id={item.id} />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </DashboardLayout>
  );
}

export default OrderForm;
