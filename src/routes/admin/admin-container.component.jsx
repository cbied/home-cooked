import { useState, useLayoutEffect } from "react";
import SideAdminNav from "../../components/side-nav/side-admin-nav.component";
import { Container } from "rsuite";

const AdminContainer = () => {
  const [screenSize, setScreenSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    let supportsPassive = false;
    let opts = Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    });
    window.addEventListener("resize", updateSize, opts);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Container style={{ height: "100%" }} data-testid="container-element">
      <div className="flex h-screen">
        <SideAdminNav screenSize={screenSize} />
        <Container
          style={
            screenSize[0] <= 650
              ? { paddingLeft: "60px" }
              : { paddingLeft: "260px", transition: "padding 0.5s" }
          }
        >
          Admin Container
        </Container>
      </div>
    </Container>
  );
};

export default AdminContainer;
