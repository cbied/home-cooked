import { useState, useEffect } from "react";
import SideAdminNav from "../../components/side-nav/side-admin-nav.component";
import { Container, DOMHelper } from "rsuite";

const { getHeight, on } = DOMHelper;

const AdminContainer = () => {
  const [windowHeight, setWindowHeight] = useState(getHeight(window));
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    setWindowHeight(getHeight(window));
    const resizeListenner = on(window, "resize", () =>
      setWindowHeight(getHeight(window))
    );

    console.log(windowHeight);
    return () => {
      resizeListenner.off();
    };
  }, []);

  const navBodyStyle = expand
    ? { height: windowHeight - 112, overflow: "auto" }
    : {};
  return (
    <Container style={{ height: "100%" }}>
      <div className="flex h-screen">
        <SideAdminNav
          expanded={expand}
          setExpanded={setExpand}
          navBodyStyle={navBodyStyle}
        />
        <Container
          style={
            !expand
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
