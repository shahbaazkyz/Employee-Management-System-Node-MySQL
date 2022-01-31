import React, { useEffect, useState } from "react";
import { Input, message, Modal, Radio, Select } from "antd";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import "react-phone-number-input/style.css";

const NewEmployee = (props) => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState(false);
  const [desigantions, setDesignations] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    age: 0,
    designation: "",
    gender: "",
    email: "",
    shift: "",
  });
  const { onSave, onModalClose, open } = props;

  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/designations");
      setDesignations(res.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const handleDesignationChange = (value) => {
    setEmployee({ ...employee, designation: value });
  };

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
        title="New Employee"
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
              return message.error("Please input valid email!")
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
                placeholder="Name"
                name="name"
                onChange={handleChange}
                margin="none"
              />
            </div>

            <div className="gx-form-group">
              <Input
                required
                name="email"
                placeholder="Email"
                onChange={handleChange}
                margin="normal"
              />
            </div>

            <div className="gx-form-group">
           

              <PhoneInput
                className="react-phone-number-input"
                placeholder="Enter phone number"
                value={value}
                defaultCountry="PK"
                onChange={setValue}
                rules={{ required: true }}
              />
            </div>

            <div className="gx-form-group">
              <Radio.Group onChange={handleChange} name="gender" required>
                <Radio value={"male"}>Male</Radio>
                <Radio value={"female"}>Female</Radio>
              </Radio.Group>
            </div>

            <div className="gx-form-group">
              <Input
                required
                type={"number"}
                name="age"
                placeholder="Age"
                onChange={handleChange}
                margin="normal"
              />
            </div>

            <div className="gx-form-group">
              <Radio.Group onChange={handleChange} name="shift" required>
                <Radio value={"morning"}>Morning</Radio>
                <Radio value={"evening"}>Evening</Radio>
                <Radio value={"night"}>Night</Radio>
              </Radio.Group>
            </div>

            <div className="gx-form-group">
              <Select
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
      {/* {err ? message.error("Please fill all fields!") : null} */}
    </>
  );
};

export default NewEmployee;
