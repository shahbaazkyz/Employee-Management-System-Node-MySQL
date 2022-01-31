import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import UpdateEmployee from "./updateEmployee";
import axios from "axios";
import { useDispatch } from "react-redux";
import { reRender } from "../../appRedux/actions/Common";

function CardsListItem({ styleName, data }) {
  const { id, name, age, email, gender, phone, designationName } = data;
  const [earning, setEarning] = useState(null);
  const [show, setShow] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (designationName) {
        const result = await axios.get(
          `http://localhost:5000/api/employees/findSalary/${designationName}`
        );
        setEarning(result.data.salary);
      } else {
        await axios.delete(`http://localhost:5000/api/employees/delete/${id}`);
      }
    }
    fetchData();
  }, [data]);

  let avatar =
    gender === "male"
      ? "https://www.vivir.com.au/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBald5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d8fad8cf72609eac615dd81d027492eaca8295f9/user-profile-default.png"
      : "https://www.vhv.rs/dpng/d/511-5119247_girl-male-and-female-avatar-hd-png-download.png";

  const handleDelete = () => {
    setShow(true);
  };

  const deleteEmployee = async () => {
    try {
      const deleteRes = await axios.delete(
        `http://localhost:5000/api/employees/delete/${id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (deleteRes.status === 200) {
        dispatch(reRender());
        setDelete(true);
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelDelete = () => {
    setShow(false);
  };

  const onConfirm = () => {
    setDelete(false);
  };

  const saveChanges = async (data) => {
    try {
      console.log(data);
      const res = await axios.put(
        `http://localhost:5000/api/employees/update/${id}`,
        data
      );
      console.log(res);
      message.success("Employee Updated Successfully");
      setState(false);
      dispatch(reRender());
    } catch (error) {
      message.error("Email and phone number must be unique");
    }
  };

  return (
    <>
      {earning && (
        <div className={`gx-user-list ${styleName}`}>
          <img alt="..." src={avatar} className="gx-avatar-img gx-border-0" />
          <div className="gx-description">
            <div className="gx-flex-row">
              <h4>{name.toUpperCase()}</h4>
              <span className="gx-d-inline-block gx-toolbar-separator">
                &nbsp;
              </span>
              <span>{designationName}</span>
            </div>
            <p className="gx-text-grey gx-mb-2">
              {email}{" "}
              <span className="gx-d-inline-block gx-toolbar-separator">
                &nbsp;
              </span>
              {phone}
            </p>

            <p>
              <span className="gx-text-grey">Age : </span>
              <span className="gx-mr-3">
                {age} <span className="gx-text-grey">yrs</span>
              </span>
              <span className="gx-d-inline-block gx-toolbar-separator">
                &nbsp;
              </span>
              <span className="gx-mr-3">
                <span className="gx-text-grey">Salary : </span>
                Rs. {earning}/=
              </span>
            </p>
          </div>
          <div className="gx-card-list-footer">
            <Button type="primary" onClick={() => setState(true)}>
              Update
            </Button>
            <Button type="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>

          {/* On delete , confirmation alert */}
          {showDelete && (
            <SweetAlert
              show={showDelete}
              success
              title={"Deleted Successfully"}
              onConfirm={onConfirm}
            ></SweetAlert>
          )}

          {/* Confirm before delete */}
          {show && (
            <SweetAlert
              show={show}
              warning
              showCancel
              confirmBtnText={"Yes , delete it!"}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={"Are you sure?"}
              onConfirm={deleteEmployee}
              onCancel={onCancelDelete}
            >
              You will not be able to recover this!
            </SweetAlert>
          )}

          {/* Employee Update model. */}

          {state && (
            <UpdateEmployee
              open={state}
              data={data}
              onModalClose={() => setState(false)}
              onSave={saveChanges}
            />
          )}
        </div>
      )}
    </>
  );
}

export default CardsListItem;
