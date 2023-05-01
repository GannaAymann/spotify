import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import BodyContent from "./BodyContent";
import Navbar from "./Navbar";
import Footer from "./Footer";
import style from "./Main.module.css";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
const Main = () => {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const UserGetData = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      const userInfo = {
        ID: data.id,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };

    UserGetData();
  }, [dispatch, token]);
  return (
    <div className={style.TheContainer}>
      <div className={style.Main_body}>
        <Sidebar />
        <div className={style.the_body}>
          <Navbar />
          <div className="content">
            <BodyContent />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
