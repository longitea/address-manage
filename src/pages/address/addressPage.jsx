import React, { useEffect, useState } from "react";
import AddAddress from "../../components/AddAddress/AddAddress";
import Address from "../../components/Address/Address";
import { FakeLogin, GetAddress } from "../../services/addressAPI";
import { useRecoilState } from "recoil";
import { addressListState } from "../../recoil/state";
import { Button, Skeleton, Space } from "antd";

export default function AddressPage() {
  const [addressList, setAddressList] = useRecoilState(addressListState);

  // Call API Get Address List
  useEffect(() => {
    // Set List Address to Recoil state
    GetAddress().then((data) => setAddressList(data.data));
  }, []);

  return (
    <>
      <h1 className="address-title">Address List</h1>
      <hr />
      <div id="address-page">
        {/* Add New Address Component */}
        <AddAddress />

        {/* Render Address Component Here */}
        {addressList.length ? (
          <Address />
        ) : (
          <div id="address-component">
            <Skeleton active />
          </div>
        )}
      </div>
    </>
  );
}
