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

import { useContext } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";

import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import UserContext from "../../context/UserContext";

function Overview() {
  const { user } = useContext(UserContext);

  const logoutHandler = () => {
    console.log("clicked logout");
    signOut(auth).then(() => console.log("user logged out"));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          {user ? user.email : "nothing to show"}
          <MDButton onClick={logoutHandler} color="info">
            Logout
          </MDButton>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
