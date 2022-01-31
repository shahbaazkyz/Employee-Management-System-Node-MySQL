import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  message,
} from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { reRender } from "../../appRedux/actions/Common";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const EditableTable = ({ designations }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      Salary: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...designations];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const id = designations[index].id;
        console.log(row);
        const res = await axios.put(
          `http://localhost:5000/api/designations/update/${id}`,
          {
            name: row.name,
            salary: Number(row.salary),
          }
        );
        if (res.status === 200) {
          console.log(res);
          setSuccess(true);
        }
        setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteDesignation = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/designations/delete/${id}`
      );
      if (res.status === 200) {
        message.success("Deleted Successfully");
        dispatch(reRender());
      }
    } catch (error) {
      console.log("Try later.!");
    }
  };

  useEffect(() => {
    if (success) {
      message.success("Designation updated successfully!");
      dispatch(reRender());
    }

    setTimeout(() => {
      setSuccess(false);
    }, 100);
  }, [success]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "45%",
      editable: true,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      width: "25%",
      editable: true,
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm
              title="Confirm Changes?"
              onConfirm={() => save(record.id)}
            >
              <a>Save</a>
            </Popconfirm>

            <Typography.Link
              onClick={() => cancel()}
              style={{
                marginLeft: 8,
              }}
            >
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
              <EditOutlined /> Edit
            </Typography.Link>

            <Popconfirm
              title="Are you sure?"
              onConfirm={() => deleteDesignation(record.id)}
            >
              <a>
                <DeleteOutlined /> Delete
              </a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {designations && (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={designations}
            rowKey={(designations) => designations.id}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      )}
    </>
  );
};
