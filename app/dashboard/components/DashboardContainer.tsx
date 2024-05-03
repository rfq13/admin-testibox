"use client";

import React, { useEffect, useState } from "react";
import _ from "lodash";

import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
  SearchOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tooltip, Input } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loader from "../../../components/Loader";
import BottomNav from "./BottomNav";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../../../constants/vars";

const { Header, Sider, Content } = Layout;

function createMenu(
  key: string,
  label: string,
  iconUrl?: string | JSX.Element,
  link?: string,
  children?: MenuItemType[],
  dis?: string
): ItemType<MenuItemType> & {
  link: string;
  rawLabel?: string;
  dis?: string;
} {
  return {
    key,
    link: link || "/",
    rawLabel: label,
    dis,
    label: (
      <div className="font-semibold">
        {link ? (
          <Link href={link}>
            {label.length > 20 ? (
              <Tooltip title={label}>{label.slice(0, 20)}...</Tooltip>
            ) : (
              label
            )}
          </Link>
        ) : (
          <>
            {label.length > 20 ? (
              <Tooltip title={label}>{label.slice(0, 20)}...</Tooltip>
            ) : (
              label
            )}
          </>
        )}
      </div>
    ),
    icon:
      typeof iconUrl === "string" ? <img src={iconUrl} alt="icon" /> : iconUrl,
    className: "text-base",
    children,
  };
}

export const SIDE_MENU = _.filter(
  _.map(
    [
      {
        label: "Home",
        icon: <HomeOutlined />,
        link: "/dashboard",
        dis: "translate-x-0",
      },
      {
        label: "User",
        icon: <UserOutlined />,
        link: "/dashboard/user",
        dis: "translate-x-16",
      },
      {
        label: "Product",
        icon: <AppstoreOutlined />,
        link: "/product",
        dis: "translate-x-32",
      },
      {
        label: "Order",
        icon: <ShoppingCartOutlined />,
        link: "/order",
        dis: "translate-x-48",
      },
      {
        label: "Setting",
        icon: <SettingOutlined />,
        link: "/setting",
        dis: "translate-x-64",
      },
    ],
    (menu: any, i) => {
      const key = `menu-${i + 1}`;
      return createMenu(
        key,
        menu.label,
        menu.icon,
        menu.link,
        menu?.children,
        menu?.dis
      );
    }
  ),
  (menu: any) => {
    if (!_.isEmpty(menu?.children)) {
      return (
        menu.children.filter((child: any) => {
          return child !== undefined;
        }).length > 0
      );
    }

    return menu;
  }
);

const DashboardContainer = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>("");
  const [collapsed, setCollapsed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const utok = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = utok.token;
  const pathname = usePathname();
  const { md } = useBreakpoint();
  const token = Cookies.get(TOKEN_KEY);

  useEffect(() => {
    if (!token) return router.push("/auth/login");
    console.log("amigdfala token", token);
    setMounted(true);
  }, [token]);

  useEffect(() => {
    const findActiveMenu = _.find(SIDE_MENU, (menu: any) => {
      if (menu.children) {
        return _.find(menu.children, (child: any) => {
          return child?.link === pathname;
        });
      }

      return menu?.link === pathname;
    }) as MenuItemType;

    if (findActiveMenu) {
      setActiveKey(findActiveMenu?.key?.toString());
    }
  }, [pathname]);

  if (!mounted) return <Loader />;

  return (
    <Layout className="h-screen overflow-hidden">
      {md && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          className="overflow-y-auto"
        >
          {collapsed ? (
            <img
              src="/icon.svg"
              alt="ubox-u-white"
              className="mx-auto mb-16 mt-8"
            />
          ) : (
            <div className="mx-auto mb-8 mt-8 flex flex-col justify-center text-center align-middle">
              <img src="/icon.png" alt="ubox-white" className="mx-auto" />
            </div>
          )}
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            items={SIDE_MENU as any}
          />
        </Sider>
      )}
      <Layout>
        <Header className="flex items-center">
          {md && (
            <Button
              type="text"
              icon={
                !collapsed ? <LeftCircleOutlined /> : <RightCircleOutlined />
              }
              onClick={() => setCollapsed(!collapsed)}
              className="-ml-12 rounded-xl h-12"
              size="large"
            />
          )}

          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="md:w-1/4 mx-2 rounded-xl h-12"
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        {/* Bottom Nav */}
        {!md && <BottomNav activeKey={activeKey} />}
      </Layout>
    </Layout>
  );
};

export default DashboardContainer;
