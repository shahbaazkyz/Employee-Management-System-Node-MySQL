import React from "react";
import { Input, message, Modal } from "antd";

const AddDesignation = (props) => {
  const [designationName, setDesignation] = React.useState("");
  const [salary, setSalary] = React.useState(0);
  const { onSaveContact, onModalClose, open } = props;
  return (
    <Modal
      title={"New Designation"}
      toggle={onModalClose}
      visible={open}
      closable={false}
      onOk={() => {
        if (!designationName || !salary) {
          return message.error("Please fill all the fields");
        }
        onModalClose();
        onSaveContact({
          designationName,
          salary,
        });
        setDesignation("");
        setSalary("");
      }}
      onCancel={onModalClose}
    >
      <div className="gx-modal-box-row">
        <div className="gx-modal-box-form-item">
          <div className="gx-form-group">
            <Input
              required
              placeholder="Designation"
              onChange={(event) => setDesignation(event.target.value)}
              margin="none"
            />
          </div>

          <div className="gx-form-group">
            <Input
              type={"number"}
              placeholder="Salary"
              onChange={(event) => setSalary(event.target.value)}
              margin="normal"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddDesignation;
