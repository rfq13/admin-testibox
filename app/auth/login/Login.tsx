"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import CallAPI from "../../../services/CallAPI";
import { useMutation } from "react-query";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const login = useMutation((data: any) => {
    return CallAPI.authLogin(data);
  });

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
      login.mutate(values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  return (
    <Form form={form} name="dynamic_rule" className="w-1/2">
      <Form.Item
        {...formItemLayout}
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input placeholder="Please input your email" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="password"
        label="password"
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input placeholder="Please input your password" />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={onCheck} loading={login.isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
