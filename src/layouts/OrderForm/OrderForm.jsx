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

// import { useState } from "react";

function OrderForm() {
  // const { columns, rows } = orderTableData();

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
        <div className="formBlock">
          <span>Супница с крышкой 300 мл</span>
          <input data-title="Супница с крышкой 300 мл" type="number" id="item-1" />
        </div>
        <div className="formBlock">
          <span>Супница с крышкой 700 мл</span>
          <input data-title="Супница с крышкой 700 мл" type="number" id="item-2" />
        </div>
        <div className="formBlock">
          <span>Супница с крышкой 1000 мл</span>
          <input data-title="Супница с крышкой 1000 мл" type="number" id="item-3" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </DashboardLayout>
  );
}

export default OrderForm;
