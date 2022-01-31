import { Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import CardBox from "../../components/CardBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reRender } from "../../appRedux/actions/Common";

const Employees = () => {
  return (
    <div>
      <h2 className="title gx-mb-4">Employees</h2>
      <div className="gx-d-flex justify-content-center">
        <CardBox />
      </div>
    </div>
  );
};

export default Employees;
