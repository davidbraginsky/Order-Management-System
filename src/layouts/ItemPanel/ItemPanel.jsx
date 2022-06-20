import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { DB } from "utils/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemPanel.css";

function ItemPanel() {
  const itemColRef = collection(DB, "items");

  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState("");

  useEffect(() => {
    onSnapshot(itemColRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id };
        setItemList((prev) => [...prev, obj]);
      });
    });
  }, []);

  const changeHandler = (e) => {
    setItem(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      label: item,
    };

    addDoc(itemColRef, obj);

    setItem("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={submitHandler}>
        <input type="text" value={item} onChange={changeHandler} />
        <button type="submit">Submit</button>
      </form>
      {itemList &&
        itemList.map((itemElement) => (
          <Link className="itemLink" to={`/item/${itemElement.id}`}>
            {itemElement.label}
          </Link>
        ))}
    </DashboardLayout>
  );
}

export default ItemPanel;
