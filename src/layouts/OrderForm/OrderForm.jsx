import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./OrderForm.css";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MDButton from "components/MDButton";
import DB from "../../utils/firebase";

function OrderForm() {
  const [items, setItems] = useState([]);
  const [elementList, setElementList] = useState([{ label: "", quantity: "" }]);

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
    const currentDate = Date();
    const timeStamp = currentDate.substring(4, 24);

    if (elementList.length === 1 && elementList[0].label === "") {
      return;
    }

    const obj = { items: elementList, isCompleted: false, date: timeStamp };
    addDoc(ordersColRef, obj);
    setElementList([{ label: "", quantity: "" }]);
  };

  const addNewLine = () => {
    setElementList((prevArray) => [...prevArray, { label: "", quantity: "" }]);
  };

  const handleElementChange = (e, index) => {
    const { id, innerText, value } = e.target;

    if (id.includes("label")) {
      const prop = id.substring(0, 5);
      const list = [...elementList];
      list[index][prop] = innerText;
      setElementList(list);
    } else if (id.includes("quantity")) {
      const prop = id.substring(0, 8);
      const list = [...elementList];
      list[index][prop] = value;
      setElementList(list);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={submitHandler}>
        {elementList.map((element, index) => (
          <div key={element.label} className="itemElement">
            <Autocomplete
              disablePortal
              value={element.label}
              onChange={(e) => handleElementChange(e, index)}
              id="label"
              options={items}
              sx={{ width: 400, marginRight: "16px", marginBottom: "16px" }}
              renderInput={(params) => <TextField {...params} label="Товар" />}
            />
            <TextField
              onChange={(e) => handleElementChange(e, index)}
              id={`quantity-${index}`}
              value={element.quantity}
              label="Количество"
              variant="outlined"
              sx={{ height: "50px" }}
              type="number"
            />
          </div>
        ))}
        <MDButton
          onClick={addNewLine}
          color="info"
          variant="gradient"
          sx={{ display: "block", marginBottom: "16px" }}
        >
          Добавить строку
        </MDButton>
        <MDButton onClick={submitHandler} color="info" variant="gradient">
          Отправить
        </MDButton>
      </form>
    </DashboardLayout>
  );
}

export default OrderForm;
