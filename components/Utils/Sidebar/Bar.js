import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Drawer from "./Drawer";
import Header from "./Header";
function Bar() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [showDrawer, setShowDrawer] = useState(false);
  const onShowDrawer = () => {
    setShowDrawer(true);
  };
  const closeDrawer = () => {
    setShowDrawer(false);
  };
  return (
    <>
      <WebContainer>
        {isDesktopOrLaptop && (
          <>
            <Header />
            <Drawer />
          </>
        )}
      </WebContainer>
      <MobileContainer>
        {isTabletOrMobile && (
          <>
            <Header
              onDrawerHandler={onShowDrawer}
              drawerOpen={showDrawer}
              onDrawerClose={closeDrawer}
            />
          </>
        )}
      </MobileContainer>
    </>
  );
}

export default Bar;

// Styles
const MobileContainer = styled.div``;
const WebContainer = styled.div``;
