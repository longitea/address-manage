import React, { useEffect, useState } from "react";
import axios from "axios";

import AddressForm from "../../components/AddressForm/AddressForm";
import { GetProvince } from "../../services/addressAPI";
import { useRecoilState } from "recoil";
import { provinceListState } from "../../recoil/state";

export default function New() {
  return (
    <div id="new-address-page">
      <h1 className="address-title">Add Address</h1>
      <hr />

      <AddressForm />
    </div>
  );
}
