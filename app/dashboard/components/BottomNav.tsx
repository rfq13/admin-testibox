"use client";
import React, { useMemo } from "react";
import { theme } from "antd";
import _ from "lodash";
import { usePathname } from "next/navigation";
import { SIDE_MENU } from "./DashboardContainer";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import Link from "next/link";

interface IProps {
  activeKey: string;
}

export default function BottomNav(props: IProps) {
  const { activeKey } = props;
  const pathname = usePathname();
  const utok = theme.useToken();
  const { colorBgContainer, Menu: menuConfig } = utok.token;

  const selectedMenu = useMemo(() => {
    const findActiveMenu = _.find(SIDE_MENU, (menu: any) => {
      if (menu.children) {
        return _.find(menu.children, (child: any) => {
          return child?.link === pathname;
        });
      }

      return menu?.link === pathname;
    }) as MenuItemType;

    return findActiveMenu;
  }, [activeKey]) as any;
  return (
    <div
      className="px-6 rounded-t-xl text-white fixed bottom-0 w-full max-h-[4.4rem] flex justify-center shadow-lg z-10"
      style={{
        backgroundColor: (utok?.token?.Layout as any)?.bottomNavbg,
      }}
    >
      <ul className="flex relative">
        <span
          className={`border-4 h-16 w-16 absolute -top-5 rounded-full duration-500 ${selectedMenu?.dis}`}
          style={{
            backgroundColor: utok?.token?.colorBorderSecondary,
            borderColor: colorBgContainer,
          }}
        >
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] rounded-tl-[11px] shadow-myShadow2"></span>
        </span>
        {_.map(SIDE_MENU, (menu: any, i: number) => {
          const isActive = activeKey === menu?.key;
          return (
            <li key={`${menu.key}-mobile`} className="w-16">
              <Link
                href={menu.link}
                className="flex flex-col text-center pt-6 items-center text-md font-semibold"
                style={{
                  color: menuConfig?.itemColor,
                }}
              >
                <span className={`${isActive && "-mt-6"} z-10`}>
                  {menu.icon}
                </span>
                <span
                  className={`text-sm mt-1 ${
                    isActive
                      ? "translate-y-5 duration-700 opacity-100"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  {menu.rawLabel}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
