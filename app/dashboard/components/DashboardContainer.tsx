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
import {
  Layout,
  Menu,
  Button,
  theme,
  Tooltip,
  Input,
  BreadcrumbProps,
  Breadcrumb,
} from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loader from "../../../components/Loader";
import BottomNav from "./BottomNav";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../../../constants/vars";
import { useAuth } from "../../../store/auth";

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

function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts && parts.length === 2) {
    const lastPart = parts.pop();
    if (lastPart) {
      return lastPart.split(";").shift();
    }
  }
  return null;
}

const DashboardContainer = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: {
    title?: string;
    breadcrumb?: BreadcrumbProps;
  };
}) => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const utok = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = utok.token;
  const pathname = usePathname();
  const { md } = useBreakpoint();
  const token = localStorage.getItem(TOKEN_KEY);
  const auth = useAuth() as any;

  useEffect(() => {
    console.log("auth", auth);
  }, []);

  useEffect(() => {
    if (!token) return router.push("/auth/login");
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
          <div className="flex flex-col gap-3">
            <Button
              type="text"
              icon={
                !collapsed ? <LeftCircleOutlined /> : <RightCircleOutlined />
              }
              onClick={() => setCollapsed(!collapsed)}
              className="bg-white rounded-xl h-12 mr-auto"
              size="large"
            />
            {collapsed ? (
              <img
                src="/icon.png"
                alt="testibox-logo"
                className="mx-auto mb-16 mt-8"
              />
            ) : (
              <div className="mx-auto mb-8 mt-8 flex flex-col justify-center text-center align-middle">
                <img src="/icon.png" alt="ubox-white" className="mx-auto" />
              </div>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            items={SIDE_MENU as any}
          />
        </Sider>
      )}
      <Layout>
        <Content style={{ padding: "0 30px" }}>{children}</Content>
        {/* Bottom Nav */}
        {!md && <BottomNav activeKey={activeKey} />}
      </Layout>
    </Layout>
  );
};

export default DashboardContainer;
