import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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
      setOrder(items);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <p>Заказ: {id}</p>
      {order &&
        order.map((item) => (
          <div className="itemContainer">
            <p>
              {item.label} - {item.quantity}
            </p>
          </div>
        ))}
    </DashboardLayout>
  );
}

export default Test;
