import React, { useEffect, useState } from "react";
import { Input, message, Modal, Radio, Select } from "antd";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import isEmail from "validator/lib/isEmail";
import "react-phone-number-input/style.css";

const UpdateEmployee = (props) => {
  const [value, setValue] = useState(props.data.phone);
  const [err, setErr] = useState(false);
  const [desigantions, setDesignations] = useState([]);
  const [employee, setEmployee] = useState({
    name: props.data.name,
    age: props.data.age,
    designation: props.data.designationName,
    gender: props.data.gender,
    email: props.data.email,
    shift: props.data.shift,
  });

  const { onSave, onModalClose, open, data } = props;
  const { phone, email, designationName, name, age, gender, shift } = data;

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const handleDesignationChange = (value) => {
    setEmployee({ ...employee, designation: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/designations");
      setDesignations(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (err) {
      message.error("Please fill all fields!");
    }
    setTimeout(() => {
      setErr(false);
    }, 100);
  }, [err]);

  return (
    <>
      <Modal
        title="Update Employee Details"
        toggle={onModalClose}
        visible={open}
        closable={true}
        onOk={() => {
          const { name, email, age, designation, gender, shift } = employee;
          if (
            !name ||
            !email ||
            !value ||
            !age ||
            !designation ||
            !gender ||
            !shift
          )
            return setErr(true);
          if (!isEmail(email)) {
            return message.error("Please input valid email!");
          }
          onModalClose();
          const newObj = { ...employee, phone: value };
          onSave(newObj);
          setEmployee({});
        }}
        onCancel={onModalClose}
      >
        <div className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
              <Input
                required
                defaultValue={name}
                placeholder="Name"
                name="name"
                onChange={handleChange}
                margin="none"
              />
            </div>

            <div className="gx-form-group">
              <Input
                required
                defaultValue={email}
                name="email"
                placeholder="Email"
                onChange={handleChange}
                margin="normal"
              />
            </div>

            <div className="gx-form-group">
              {/* <Input
                required
                defaultValue={phone}
                type={"number"}
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                margin="normal"
              /> */}

              <PhoneInput
                className="react-phone-number-input"
                placeholder="Enter phone number"
                value={phone}
                defaultCountry="PK"
                onChange={setValue}
                rules={{ required: true }}
              />
            </div>

            <div className="gx-form-group">
              <Radio.Group
                onChange={handleChange}
                name="gender"
                required
                defaultValue={gender}
              >
                <Radio value={"male"}>Male</Radio>
                <Radio value={"female"}>Female</Radio>
              </Radio.Group>
            </div>

            <div className="gx-form-group">
              <Input
                required
                type={"number"}
                defaultValue={age}
                name="age"
                placeholder="Age"
                onChange={handleChange}
                margin="normal"
              />
            </div>

            <div className="gx-form-group">
              <Radio.Group
                onChange={handleChange}
                name="shift"
                required
                defaultValue={shift}
              >
                <Radio value={"morning"}>Morning</Radio>
                <Radio value={"evening"}>Evening</Radio>
                <Radio value={"night"}>Night</Radio>
              </Radio.Group>
            </div>

            <div className="gx-form-group">
              <Select
                defaultValue={designationName}
                required
                style={{ width: 200 }}
                placeholder="Select Designation"
                onChange={handleDesignationChange}
              >
                {desigantions.map((designation) => (
                  <Select.Option key={designation.id} value={designation.name}>
                    {designation.name.toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateEmployee;
