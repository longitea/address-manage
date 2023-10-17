import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressForm from "../../components/AddressForm/AddressForm";
import { ADDRESS_PATH } from "../../constants/PATH";
import { message } from "antd";

export default function Edit() {
  const nav = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (!data) {
      nav(ADDRESS_PATH);
      message.error("Vui lòng lựa chọn địa chỉ cần chỉnh sửa");
    }
  }, []);

  return (
    <div id="edit-address-page">
      <h1 className="address-title">Edit Address</h1>
      <hr />
      <AddressForm editAddress={data} />
    </div>
  );
}
