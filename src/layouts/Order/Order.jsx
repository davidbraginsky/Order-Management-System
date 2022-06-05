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

import { useParams } from "react-router-dom";

import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import DB from "../../utils/firebase";

function Test() {
  const { id } = useParams();

  const [order, setOrder] = useState([]);

  const docRef = doc(DB, "orders", id);

  useEffect(() => {
    const document = getDoc(docRef);
    document.then((content) => {
      const { items } = content.data();
      const itemsArray = Object.entries(items);
      const newArr = [];
      itemsArray.forEach((item) => newArr.push(item[1]));
      const newObj = { ...content.data(), items: newArr };
      setOrder(newObj);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <p>test page</p>
      <p>{id}</p>
      {order.items &&
        order.items.map((item) => (
          <div key={item.id} className="itemContainer">
            <p>
              {item.title} - {item.quantity}
            </p>
          </div>
        ))}
    </DashboardLayout>
  );
}

export default Test;
