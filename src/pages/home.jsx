import { Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FakeLogin } from "../services/addressAPI";
import { ADDRESS_PATH } from "../constants/PATH";

export default function Home() {
  // redirect to adress-page
  const nav = useNavigate();
  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));
    if (!loginToken) {
      FakeLogin();
    }
    nav(ADDRESS_PATH);
  }, []);

  return (
    <>
      <h1 className="address-title">Home Page</h1>
      <hr />
      <Result
        icon={<SmileOutlined />}
        title="It will be completed soon!"
        extra={
          <Button type="primary" onClick={() => nav(ADDRESS_PATH)}>
            Visit Address Page
          </Button>
        }
      />
    </>
  );
}
