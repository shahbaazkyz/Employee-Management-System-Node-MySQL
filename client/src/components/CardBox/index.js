import React, { useEffect, useState } from "react";
import { Button, Col, Empty, message, Row, Select, Spin } from "antd";
import CardsListItem from "./CardsListItem";
import axios from "axios";
import NewEmployee from "./NewEmployee";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { filterDesignationData, reRender } from "../../appRedux/actions/Common";

const CardBox = () => {
  const [state, setState] = useState(false);
  const [noData, setNo] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [designations, setDesignations] = useState([]);
  const render = useSelector((state) => state.common.render);
  const dispatch = useDispatch();
  const [flag , setFlag] = useState(false);
  const filterDesignation = useSelector(
    (state) => state.common.filterDesignation
  );

  useEffect(() => {
    setTimeout(() => {
      setNo(true);
    }, 5000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filterDesignation === "All") {
          const response = await axios.get(
            "http://localhost:5000/api/employees"
          );
          console.log(response.data);
          setFlag(true);
          return setData(response.data);
        }
        const result = await axios.get(
          `http://localhost:5000/api/employees/findByDesignation/${filterDesignation}`
        );
        setFlag(true);
        setData(result.data);

        console.log(result.data);
      } catch (error) {}
    };
    if (filterDesignation) {
      fetchData();
    }
  }, [filterDesignation]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:5000/api/employees");
      setFlag(true);
      setData(result.data);
    }

    fetchData();
  }, [render]);

  const handleFilter = (e) => {
    dispatch(filterDesignationData(e));
    console.log(e);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/designations");
        
        setDesignations(res.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const addEmployee = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/employees/insert", {
        name: data.name,
        age: data.age,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        designationName: data.designation,
        shift: data.shift,
      });
      setState(false);
      setShow(true);
      dispatch(reRender());
    } catch (error) {
      message.error("Email and phone number already exists");
    }
  };

  const onConfirm = () => {
    setShow(false);
  };

  return (
    <div className="gx-main-content gx-pb-sm-4">
      <Row>
        <Col span={24}>
          <Button
            className="gx-btn-block ant-btn"
            type="primary"
            aria-label="add"
            onClick={() => setState(!state)}
          >
            <i className="icon icon-add gx-mr-2" />
            <span>New Employee</span>
          </Button>

          {flag && (
            <div className="gx-form-group gx-flex-row justify-content-center">
              <h1>Filter by Designation :</h1>
              <span className="gx-d-inline-block gx-toolbar-separator">
                &nbsp;
              </span>
              <Select
                size="medium"
                required
                style={{ width: 200 }}
                placeholder="Select Designation"
                onChange={handleFilter}
              >
                <Select.Option value="All">All</Select.Option>
                {designations.map((designation) => {
                  return (
                    <Select.Option
                      key={designation.id}
                      value={designation.name}
                    >
                      {designation.name.toUpperCase()}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          )}
        </Col>
        <Col span={24}>
          {data.length > 0 ? (
            data.map((data, index) => (
              <CardsListItem key={index} data={data} styleName="gx-card-list" />
            ))
          ) : (
            <>
              {!noData && (
                <div className="spinInside">
                  <Spin size="large" />
                </div>
              )}
              {noData && (
                <Empty
                  description={<span>Currently there's no Employees.</span>}
                >
                  <b>Click above to add employees.</b>
                </Empty>
              )}
            </>
          )}
        </Col>

        {state && (
          <NewEmployee
            open={state}
            onModalClose={() => setState(false)}
            onSave={addEmployee}
          />
        )}

        {show && (
          <SweetAlert
            show={show}
            success
            title={"Employee Added!"}
            onConfirm={onConfirm}
          ></SweetAlert>
        )}
      </Row>
    </div>
  );
};

export default CardBox;

CardBox.defaultProps = {
  styleName: "",
  childrenStyle: "",
};
