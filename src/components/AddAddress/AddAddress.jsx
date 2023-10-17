import React from "react";
import { Button } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./AddAddress.css";
import { useNavigate } from "react-router-dom";
import { ADDRESS_NEW_PATH } from "../../constants/PATH";

export default function AddAddress() {
  const nav = useNavigate();

  return (
    <div id="add-address">
      <Button
        className="add-btn-address"
        type="dashed"
        onClick={() => nav(ADDRESS_NEW_PATH)}
        block
        icon={<PlusOutlined />}
      >
        <span className="add-text">Thêm mới</span>
      </Button>
    </div>
  );
}
