"use client";

import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../../store/auth";
import ContentBlanket from "../../components/ContentBlanket";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import _ from "lodash";
import Link from "next/link";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type TableRowSelection<T> = TableProps<T>["rowSelection"];

enum BusinessPlan {
  FREE = 0,
  BASIC = 1,
  PREMIUM = 2,
}

const BusinessPlanLabel = {
  0: "Free",
  1: "Basic",
  2: "Premium",
};

interface DataType {
  isActive?: any;
  key: string;
  name: string;
  plan: BusinessPlan;
  businessName?: string;
  email?: string;
  phone?: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    plan: BusinessPlan.FREE,
    businessName: "John Brown's Burger",
    email: "john@mail.com",
    phone: "+628123456789",
  },
  {
    key: "2",
    name: "Jim Green",
    plan: BusinessPlan.BASIC,
    businessName: "Jim Green's Pizza",
    email: "jg@mail.com",
    phone: "+628123456789",
  },
  {
    key: "3",
    name: "Joe Black",
    plan: BusinessPlan.PREMIUM,
    businessName: "Joe Black's Coffee",
    email: "jb@mail.com",
    phone: "+628123456789",
  },
  {
    key: "4",
    name: "Jim Red",
    plan: BusinessPlan.FREE,
    businessName: "RM Restu Tatangga",
    email: "jr@mail.com",
    phone: "+628123456789",
  },
];

export default function Page() {
  const auth = useAuth() as any;
  const [form] = Form.useForm();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [customData, setCustomData] = useState<DataType[]>(
    _.map(data, (d) => ({ ...d, isActive: true }))
  );
  const [openAddModal, setOpenModalAdd] = useState(false);

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    const maxKey = Math.max(...customData.map((d) => parseInt(d.key))) + 1;

    setCustomData((prev) => [
      ...prev,
      {
        key: maxKey.toString(),
        ...values.user,
        isActive: true,
      },
    ]);

    setOpenModalAdd(false);

    notification.success({
      message: "Success",
      description: "Member has been added",
    });

    form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Business",
      dataIndex: "businessName",
      key: "businessName",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      sorter: (a, b) => a.plan - b.plan,
      sortOrder: sortedInfo.columnKey === "plan" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record, i) => BusinessPlanLabel[record.plan],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.isActive - b.isActive,
      sortOrder: sortedInfo.columnKey === "isActive" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record, i) => (record.isActive ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record, i) => (
        <div className="flex gap-1 items-center justify-center">
          <Button
            type="link"
            onClick={() => {
              Modal.confirm({
                title: `Are you sure want to ${
                  record.isActive ? "de" : ""
                }activate this member?`,
                content: (
                  <>
                    <div className="flex flex-col gap-2">
                      <span>Name: {record.name}</span>
                      <span>Business Name: {record.businessName}</span>
                      <span>Email: {record.email}</span>
                      <span>Plan: {record.email}</span>
                    </div>
                    <br />
                    <p>
                      you can {!record.isActive ? "deactivate" : "reactivate"}{" "}
                      this member soon.
                    </p>
                  </>
                ),
                okText: "Yes, sure",
                onOk() {
                  console.log("OK");
                  setCustomData((prev) =>
                    prev.map((p) =>
                      p.key === record.key ? { ...p, isActive: !p.isActive } : p
                    )
                  );
                },
                onCancel() {
                  console.log("Cancel");
                },
              });
            }}
          >
            {record.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                title: `Are you sure want to delete this member?`,
                content: (
                  <>
                    <div className="flex flex-col gap-2">
                      <span>Name: {record.name}</span>
                      <span>Business Name: {record.businessName}</span>
                      <span>Email: {record.email}</span>
                      <span>Plan: {record.email}</span>
                    </div>
                    <br />
                    <p>this action is permanent and can't be undone. </p>
                  </>
                ),
                okText: "Yes, sure",
                onOk() {
                  console.log("OK");
                  setCustomData((prev) =>
                    prev.filter((p) => p.key !== record.key)
                  );
                  notification.success({
                    message: "Success",
                    description: "Member has been deleted",
                  });
                },
                onCancel() {
                  console.log("Cancel");
                },
              });
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ContentBlanket
      breadcrumb={{
        style: { margin: "16px 0" },
        items: [
          {
            title: "Dasbor",
          },
          {
            title: <Link href="/dashboard/user">Member</Link>,
          },
          {
            title: "John Brown",
          },
        ],
      }}
      header={
        <>
          <div className="flex gap-2 p-4 justify-between bg-transparent">
            <div className="flex gap-2">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                className="rounded-md"
                onClick={() => {
                  Modal.confirm({
                    title: `Are you sure want to delete these members?`,
                    content: (
                      <>
                        <p>this action is permanent and can't be undone. </p>
                      </>
                    ),
                    okText: "Yes, sure",
                    onOk() {
                      console.log("OK");
                      setCustomData((prev) =>
                        prev.filter((p) => !selectedRowKeys.includes(p.key))
                      );
                      notification.success({
                        message: "Success",
                        description: "Member has been deleted",
                      });
                    },
                    onCancel() {
                      console.log("Cancel");
                    },
                  });
                }}
              >
                Delete
              </Button>
              <Button
                type="primary"
                ghost
                className="rounded-md"
                icon={<ExportOutlined />}
              >
                Expor
              </Button>
              <Button
                type="primary"
                className="rounded-md"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  setOpenModalAdd(true);
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <hr />
        </>
      }
    >
      <div className="flex gap-2">
        <div className="w-1/3 flex flex-col gap-1">
          <Card
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
        <div className="w-2/3 flex-col gap-1">
          <Card
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </ContentBlanket>
  );
}
