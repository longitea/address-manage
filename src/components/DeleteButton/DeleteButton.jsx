import { Button, Popconfirm, message } from "antd";
import React from "react";
// Handle Deleted Address
const confirm = (e) => {
  message.info("Chức năng xoá sẽ sớm hoàn thiện");
};
export default function DeleteButton() {
  return (
    <Popconfirm
      placement="topRight"
      title="Xoá địa chỉ"
      description="Bạn có chắc chắn xóa địa chỉ này?"
      onConfirm={confirm}
      okText="Xoá"
      cancelText="Huỷ"
    >
      <Button type="text" danger>
        Xoá
      </Button>
    </Popconfirm>
  );
}
