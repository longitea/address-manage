import React from "react";
import "./Address.css";
import { Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import placeIcon from "/place.svg";
import { addressListState } from "../../recoil/state";
import { useRecoilValue } from "recoil";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import { ADDRESS_EDIT_PATH } from "../../constants/PATH";

export default function Address() {
  // Get Address List from Recoil State
  const addressList = useRecoilValue(addressListState);
  const nav = useNavigate();

  const HandleClick = (address) => {
    nav(ADDRESS_EDIT_PATH, { state: address });
  };

  // Render Component Address
  return addressList?.map((address, index) => {
    let addressDetail = `${address.shipping_address}, ${address.state}, ${address.city}`;
    return (
      <div id="address-component" key={index}>
        <div className="address-head">
          <h4>Họ và tên: {address.name}</h4>
          <DeleteButton />
        </div>

        <div className="address-content">
          <span>
            <img src={placeIcon} className="place-icon" />
          </span>
          <span>Địa Chỉ</span>
          <p>{addressDetail}</p>
          <PhoneOutlined />
          <span>Số điện thoại</span>
          <p>{address.phone}</p>

          <MailOutlined />
          <span>Địa chỉ email</span>
          <p>{address.email}</p>
        </div>

        <Button
          className="edit-btn-address"
          type="text"
          onClick={() => HandleClick(address)}
        >
          Chỉnh sửa
        </Button>
      </div>
    );
  });
}
