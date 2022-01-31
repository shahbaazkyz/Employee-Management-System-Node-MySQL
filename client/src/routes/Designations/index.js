import { Button } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { reRender } from "../../appRedux/actions/Common";
import AddDesignation from "./NewDesignation";
import { EditableTable } from "./Table";
const Designations = () => {
  const [designations, setDesignations] = React.useState(null);
  const [state, setState] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();

  const render = useSelector((state) => state.common.render);

  const addDesignation = async (data) => {
    try {
      if (data.designationName && data.salary) {
        await axios.post(`http://localhost:5000/api/designations/insert`, {
          name: data.designationName,
          salary: data.salary,
        });
        setState(false);
        setShow(true);
        setTimeout(() => {
          dispatch(reRender());
        }, 1000);
      }
    } catch (error) {
      console.log("Try later.!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/designations");
      setDesignations(res.data);
    };
    fetchData();
  }, [render]);

  const onConfirm = () => {
    setShow(false);
  };

  const closeModal = () => setState(false);
  return (
    <div>
      <h2 className="title gx-mb-4">Designations</h2>
      <div className="gx-module-add-task ">
        <Button
          className="gx-btn-block ant-btn"
          type="primary"
          aria-label="add"
          onClick={() => setState(!state)}
        >
          <i className="icon icon-add gx-mr-2" />
          <span>New Designation</span>
        </Button>
      </div>
      {<EditableTable designations={designations} />}

      {state && (
        <AddDesignation
          open={state}
          onSaveContact={addDesignation}
          onModalClose={closeModal}
          onDeleteContact={false}
        />
      )}

      {show && (
        <SweetAlert
          show={show}
          success
          title={"Designation Added!"}
          onConfirm={onConfirm}
        ></SweetAlert>
      )}
    </div>
  );
};

export default Designations;
