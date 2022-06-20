import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
// import { v4 as uuidv4 } from "uuid";
import { DB, storage } from "../../utils/firebase";
import "./Item.css";

function Item() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);

  const docRef = doc(DB, "items", id);
  const imageListRef = ref(storage, `images/item/${id}`);
  // const singleImageListRef = ref(storage, `images/${item.imagePathRef}`);

  useEffect(() => {
    const document = getDoc(docRef);
    document.then((content) => {
      setItem(content.data());
    });
    // listAll(imageListRef).then((response) => {
    //   response.items.forEach((img) => {
    //     getDownloadURL(img).then((url) => setImageList((prev) => [...prev, url]));
    //     // getDownloadURL(img).then((url) => setImageList(prev => []));
    //     // console.log(img);
    //   });
    // });
    listAll(imageListRef).then((response) => {
      response.items.forEach((img) => {
        getDownloadURL(img).then((url) => setImageUrl(url));
      });
    });
  }, []);

  // useEffect(() => {
  //   if (item) {
  //     console.log("item was downloaded");
  //     console.log(item);
  //     console.log(item.imagePathRef);
  //     // const singleImageListRef = ref(storage, `${item.imagePathRef}`);
  //     const singleImageListRef = ref(
  //       storage,
  //       "https://firebasestorage.googleapis.com/v0/b/order-management-system-1b9d9.appspot.com/o/images%2F123.png"
  //     );
  //     listAll(singleImageListRef).then((response) => console.log(response));
  //   }
  // }, [item]);

  // eslint-disable-next-line consistent-return
  const submitHandler = (e) => {
    e.preventDefault();
    if (imageUpload == null) {
      return "";
    }
    const imageRef = ref(storage, `images/item/${id}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("image uploaded");
    });
  };

  const imageInputChangeHandler = (e) => {
    setImageUpload(e.target.files[0]);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <p>{id}</p>
      {item ? (
        <>
          <form>
            <span>title:</span>
            <input type="text" id="test1" placeholder={item.label} />
            <input type="file" onChange={imageInputChangeHandler} />
            <MDButton onClick={submitHandler} color="info" variant="gradient">
              Отправить
            </MDButton>
          </form>
          <img className="itemImage" src={imageUrl} alt="item" />
        </>
      ) : (
        "loading..."
      )}
    </DashboardLayout>
  );
}

export default Item;
