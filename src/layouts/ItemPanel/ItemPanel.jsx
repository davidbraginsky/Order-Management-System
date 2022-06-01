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

import DB from "utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

function ItemPanel() {
  const colRef = collection(DB, "items");

  const [item, setItem] = useState("");
  const changeHandler = (e) => {
    setItem(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      title: item,
    };

    addDoc(colRef, obj).then(() => console.log("item added"));

    setItem("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={submitHandler}>
        <input type="text" value={item} onChange={changeHandler} />
        <button type="submit">Submit</button>
      </form>
    </DashboardLayout>
  );
}

export default ItemPanel;
