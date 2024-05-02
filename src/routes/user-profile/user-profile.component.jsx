import { Container, Header, Content, Footer, Tabs } from "rsuite";
import ProfileInformation from "../../components/profile/profile-information/profile-information.component";
import ProfileSettings from "../../components/profile/profile-settings/profile-settings.component";
import Navbar from "../../components/navbar/navbar.component";

const UserProfile = () => {
  return (
    <Container style={{ height: "auto", overflow: "scroll" }}>
      <Header>
        <Navbar showSearch={false} />
      </Header>
      <Content className="mt-5">
        <Tabs defaultActiveKey="1">
          <Tabs.Tab eventKey="1" title="Profile Information">
            <ProfileInformation />
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Profile Settings">
            <ProfileSettings />
          </Tabs.Tab>
          <Tabs.Tab eventKey="3" title="UPDATE">
            <h1>hello</h1>
          </Tabs.Tab>
        </Tabs>
      </Content>
      <Footer>Footer</Footer>
    </Container>
  );
};

export default UserProfile;
