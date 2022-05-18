import React, { useState } from "react";
import {
  useTitle,
  useNavigation,
  useSubscription
} from "@pankod/refine-core";
import {
  AntdLayout,
  Menu,
  useMenu,
  Grid,
  Icons,
  Badge,
} from "@pankod/refine-antd";

export const CustomSider: React.FC = () => {
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const Title = useTitle();

  const { menuItems, selectedKey } = useMenu();
  const breakpoint = Grid.useBreakpoint();
  const { push } = useNavigation();

  const isMobile = !breakpoint.lg;

  useSubscription({
    channel: "resources/products",
    types: ["created", "updated"],
    onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
  });
  console.log('menuItems',menuItems)
  console.log('subscriptionCount',subscriptionCount)
  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}

    >
      {Title && <Title collapsed={collapsed} />}

      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={({ key }) => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }

          if (key === "/posts") {
            setSubscriptionCount(0);
          }

          push(key as string);
        }}
      >
        menuItems
      </Menu>
    </AntdLayout.Sider>
  );
};