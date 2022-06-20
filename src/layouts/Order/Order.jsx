import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useParams, Link } from "react-router-dom";
import { getDoc, doc, updateDoc, query, where, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { DB } from "../../utils/firebase";
import "./Order.css";

function Test() {
  const { id } = useParams();

  const [order, setOrder] = useState("");
  const [midItemsList, setMidItemList] = useState([]);
  const [newItemList, setNewItemList] = useState([]);

  const docRef = doc(DB, "orders", id);

  const colRef = collection(DB, "items");
  // const q = query(colRef, where('label', '=',  ));

  useEffect(() => {
    const document = getDoc(docRef);
    document.then((content) => {
      setOrder(content.data());
    });
  }, []);

  useEffect(() => {
    if (order) {
      console.log("order was loaded");
      const itemLabelsArr = order.items.map((item) => item.label);
      const itemQuantityArr = order.items.map((item) => item.quantity);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < itemLabelsArr.length; i++) {
        const obj = {
          label: itemLabelsArr[i],
          quantity: itemQuantityArr[i],
        };
        setMidItemList((prev) => [...prev, obj]);
      }

      console.log(itemLabelsArr);
      console.log(itemQuantityArr);

      // setItemLabels(itemLabelsArr);
    }
  }, [order]);

  useEffect(() => {
    if (midItemsList.length > 1) {
      console.log("midItemsList was loaded");
      // const q = query(colRef, where("label", "==", itemLabels[0]));
      // const querySnapshot = getDocs(q);
      // querySnapshot.then((response) => {
      //   response.forEach((itemDoc) => setItemIDs((prev) => [...prev, itemDoc.id]));
      // });
      // itemLabels.forEach((itemLabel) => {
      //   const q = query(colRef, where("label", "==", itemLabel));
      //   const querySnapshot = getDocs(q);
      //   querySnapshot.then((response) => {
      //     response.forEach((itemDoc) => {
      //       console.log(itemDoc);
      //       const newObj = {
      //         label: itemLabel,
      //         id: itemDoc.id,
      //       };
      //       setNewItemList((prev) => [...prev, newObj]);
      //     });
      //   });
      // });

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < midItemsList.length; i++) {
        console.log(midItemsList);
        console.log(i);
        console.log(midItemsList[i].label);
        const q = query(colRef, where("label", "==", midItemsList[i].label));
        const querySnapshot = getDocs(q);
        querySnapshot.then((response) => {
          response.forEach((itemDoc) => {
            console.log(itemDoc);
            const newObj = {
              label: midItemsList[i].label,
              id: itemDoc.id,
              quantity: midItemsList[i].quantity,
            };
            setNewItemList((prev) => [...prev, newObj]);
          });
        });
      }
    }
  }, [midItemsList]);
  // useEffect(() => {
  //   if (itemLabels) {
  //     console.log("item labels were loaded");
  //     // const q = query(colRef, where("label", "==", itemLabels[0]));
  //     // const querySnapshot = getDocs(q);
  //     // querySnapshot.then((response) => {
  //     //   response.forEach((itemDoc) => setItemIDs((prev) => [...prev, itemDoc.id]));
  //     // });
  //     itemLabels.forEach((itemLabel) => {
  //       const q = query(colRef, where("label", "==", itemLabel));
  //       const querySnapshot = getDocs(q);
  //       querySnapshot.then((response) => {
  //         response.forEach((itemDoc) => {
  //           console.log(itemDoc);
  //           const newObj = {
  //             label: itemLabel,
  //             id: itemDoc.id,
  //           };
  //           setNewItemList((prev) => [...prev, newObj]);
  //         });
  //       });
  //     });

  //   }
  // }, [itemLabels]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateDoc(docRef, {
      isCompleted: true,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <p>Заказ от {order.date}</p>
      <form onSubmit={submitHandler}>
        <div className="itemsWrapper">
          {newItemList &&
            newItemList.map((item) => (
              <div key={item.label} className="itemContainer">
                <Link to={`/item/${item.id}`}>{item.label}</Link>
                <MDInput type="number" label="Количество" value={item.quantity} />
              </div>
            ))}
        </div>
        <MDButton sx={{ marginTop: "16px" }} type="submit" color="info">
          Пометить как завершенный
        </MDButton>
      </form>
      {/* <form onSubmit={submitHandler}>
        <div className="itemsWrapper">
          {order.items &&
            order.items.map((item) => (
              <div key={item.label} className="itemContainer">
                <Link to={`/item/${item.id}`}>{item.label}</Link>
                <MDInput type="number" label="Количество" value={item.quantity} />
              </div>
            ))}
        </div>
        <MDButton sx={{ marginTop: "16px" }} type="submit" color="info">
          Пометить как завершенный
        </MDButton>
      </form> */}
    </DashboardLayout>
  );
}

export default Test;
