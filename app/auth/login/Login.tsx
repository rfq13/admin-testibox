"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Input } from "antd";
import CallAPI from "../../../services/CallAPI";
import { useMutation } from "react-query";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../store/auth";
import { TOKEN_KEY } from "../../../constants/vars";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const auth = useAuth() as any;

  const login = useMutation(
    (data: any) => {
      return CallAPI.authLogin(data);
    },
    {
      onSuccess: (data: any) => {
        localStorage.setItem(TOKEN_KEY, data?.data?.token);
        auth.setUser(data?.data?.user);
        router.push("/dashboard");
      },
    }
  );

  return (
    <Card
      title="Masuk ke Panel Admin"
      className="w-1/4 rounded-md"
      bordered={false}
      loading={login.isLoading}
    >
      <Form
        name="normal_login"
        className="login-form gap-3"
        initialValues={{ remember: true }}
        form={form}
        onFinish={(values) => {
          console.log("Received values of form: ", values);
          login.mutate(values);
        }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot ml-auto" href="">
              Forgot password
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <div className="flex flex-col gap-2 items-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
              loading={login.isLoading}
            >
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
