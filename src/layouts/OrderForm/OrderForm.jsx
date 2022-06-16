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
  const [clientList, setClientList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    title: "bar2",
    value: "xVwEwAaqPhnL0ywm7vC8",
  });

  const itemsColRef = collection(DB, "items");
  const ordersColRef = collection(DB, "orders");
  const clientsColRef = collection(DB, "client");

  const getData = async () => {
    const response = await getDocs(itemsColRef);
    response.docs.forEach((doc) => {
      const newObj = { ...doc.data(), id: doc.id };
      setItems((prevArray) => [...prevArray, newObj]);
    });
    const clientResponse = await getDocs(clientsColRef);
    clientResponse.docs.forEach((doc) => {
      const newObj = { ...doc.data(), id: doc.id };
      setClientList((prevArray) => [...prevArray, newObj]);
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

    const obj = { items: elementList, isCompleted: false, date: timeStamp, client: selectedOption };
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

  const selectChangeHandler = (e) => {
    const { value, innerText } = e.target.selectedOptions[0];
    const optionObj = {
      value,
      title: innerText,
    };
    setSelectedOption(optionObj);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={submitHandler}>
        <span>Кто заказывает:</span>
        <select value={selectedOption.value} onChange={selectChangeHandler}>
          {clientList.map((item) => (
            <option value={item.id} key={item.id}>
              {item.title}
            </option>
          ))}
        </select>
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
