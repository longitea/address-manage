import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
const { Option } = Select;
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import placeIcon from "/place.svg";
import { useNavigate } from "react-router-dom";
import { provinceListState } from "../../recoil/state";
import { useRecoilState } from "recoil";
import {
  validateTrimExists,
  validateTrimmedFirstAndLast,
} from "../../utils/customValidate";
import {
  GetProvince,
  addNewAddress,
  callEditAddress,
} from "../../services/addressAPI";
import { ADDRESS_PATH } from "../../constants/PATH";

/* ------------------------ START HERE ------------------------*/
export default function AddressForm({ editAddress }) {
  /* -------- DEFINE HOOK --------*/
  const nav = useNavigate();
  //Use Hook of Ant design to control form
  const [form] = Form.useForm();
  // Get Province State From Recoil
  const [provinceList, setProvinceList] = useRecoilState(provinceListState);

  // Vừa vào Component này lấy danh sách quận huyện
  useEffect(() => {
    // Nếu mà chưa có trong recoil thì call API set state vào recoil
    if (provinceList.length === 0) {
      GetProvince().then((provinces) => {
        setProvinceList(provinces);
      });
    }
    // Handle Edit Quận huyện Khi người dùng người Edit Form
    if (editAddress) {
      let temp = [];
      if (editAddress?.city === "Hồ Chí Minh") {
        temp = provinceList.filter(
          (province) => province?.name == "Thành phố Hồ Chí Minh"
        );
      } else {
        temp = provinceList.filter(
          (province) => province?.name == editAddress?.city
        );
      }

      temp.length !== 0 && setDistrictList(temp[0]?.districts);
    }
  }, [provinceList]);

  // Hanlde Loading Button when submit form
  const [loading, setLoading] = useState(false);

  /* -------- HANDLE SUBMIT FROM ACTION --------*/
  const onFinish = (values) => {
    setLoading(true);
    // Nếu là chỉnh sử địa chỉ
    if (editAddress) {
      callEditAddress(editAddress.xid, values).then((response) => {
        if (response === "Resource updated successfully") {
          message.success("Bạn đã cập nhật địa chỉ thành công");
          nav(ADDRESS_PATH);
        }
      });
    } else {
      // nếu là thêm mới địa chỉ
      addNewAddress(values).then((response) => {
        if (response === "Resource created successfully") {
          message.success("Bạn đã thêm địa chỉ thành công");
          nav(ADDRESS_PATH);
        }
      });
    }
  };

  // Nếu như là chỉnh sửa form thì handle chọn danh sách quận / huyện
  const [districtList, setDistrictList] = useState([]);
  // Khi chọn thành phố thì xuất hiện danh sách tỉnh thành
  const HandleSelectedCity = (value) => {
    // Set state for District Field even city selected
    let temp = provinceList.filter((province) => province.name == value);
    setDistrictList(temp[0].districts);

    form.setFieldsValue({ district: "" });
  };

  //   Return Validate Form Component
  return (
    <div id="new-address-page">
      <Card title="Thêm mới địa chỉ">
        {/* -------- FORM ANTD --------*/}
        <Form
          name="addressForm"
          layout="vertical"
          //   Hook controled form of antd
          form={form}
          // Handle Submit Form
          onFinish={onFinish}
          // Default
          initialValues={{
            fullName: editAddress?.name,
            phoneNumber: editAddress?.phone,
            email: editAddress?.email,
            city: editAddress?.city,
            district: editAddress?.state,
            detailAddress: editAddress?.shipping_address,
          }}
        >
          {/* --------- 1. fullName --------- */}
          <Form.Item
            // className for input field
            name="fullName"
            //CSS Mark Required Field
            required
            // Label Name Info and Icon for input field
            label={
              <p>
                <UserOutlined /> <span>Họ và tên</span>
              </p>
            }
            // validate messages
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
              {
                min: 3,
                message: "Họ và tên phải có tối thiểu 3 ký tự!",
              },
              {
                // Validate Trim()
                validator: validateTrimmedFirstAndLast,
              },
            ]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          {/* --------- 2. phoneNumber --------- */}
          <Form.Item
            name="phoneNumber"
            required
            label={
              <p>
                <PhoneOutlined /> <span>Số điện thoại</span>
              </p>
            }
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
              {
                // Regex Min 10 Numbers
                pattern: /^[0-9]{10,}$/,
                message: "Số điện thoại không đúng định dạng!",
              },
              {
                min: 10,
                message: "Điện thoại phải có tối thiểu 10 số!",
              },
              {
                // Validate Trim
                validator: validateTrimExists,
                message: "Số điện thoại không thể chứa khoảng trắng",
              },
            ]}
          >
            <Input placeholder="0 xxx xxx xxx" />
          </Form.Item>

          {/* --------- 3. Email --------- */}
          <Form.Item
            name="email"
            required
            label={
              <p>
                <MailOutlined /> <span>Địa chỉ Email</span>
              </p>
            }
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng",
              },
              {
                validator: validateTrimExists,
                message: "Email không thể chứa khoảng trắng",
              },
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          {/* --------- 4. City --------- */}
          <Form.Item
            name="city"
            required
            label={
              <p>
                <img src={placeIcon} width={12} />
                <span>Tỉnh, Thành Phố</span>
              </p>
            }
            rules={[
              {
                required: true,
                message: "Vui lòng lựa chọn thành phố !",
              },
            ]}
          >
            <Select
              placeholder="Chọn tỉnh / thành phố"
              // Handle Filed District when choose
              onChange={HandleSelectedCity}
            >
              {provinceList?.map((province) => {
                return (
                  <Option value={province.name} key={province.codename}>
                    {province.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* --------- 5. District --------- */}
          <Form.Item
            name="district"
            required
            label={
              <p>
                <img src={placeIcon} width={12} />
                <span style={{ marginLeft: 5 }}>Quận, huyện</span>
              </p>
            }
            rules={[
              {
                required: true,
                message: "Vui lòng lựa chọn quận",
              },
            ]}
          >
            <Select placeholder="Chọn quận / huyện">
              {districtList?.map((district) => {
                return (
                  <Option value={district.name} key={district.codename}>
                    {district.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* --------- 6. Address Detail --------- */}
          <Form.Item
            required
            name="detailAddress"
            label={
              <p>
                <img src={placeIcon} width={12} />
                <span style={{ marginLeft: 5 }}>Địa chỉ cụ thể</span>
              </p>
            }
            tooltip="Địa chỉ bao gồm số nhà,tên đường, phường/hẻm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
              {
                min: 10,
                message: "Địa chỉ phải có tối thiểu 10 ký tự",
              },
              {
                validator: validateTrimmedFirstAndLast,
              },
            ]}
          >
            <Input placeholder="22 đường số 8, phường Linh Trung" />
          </Form.Item>

          {/* --------- SUBMIT BUTTON --------- */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              <strong>Lưu thông tin</strong>
            </Button>
            {/* return home button */}
            <Button
              type="text"
              danger
              style={{ marginLeft: 20 }}
              onClick={() => nav("/address")}
            >
              <strong>Huỷ</strong>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
