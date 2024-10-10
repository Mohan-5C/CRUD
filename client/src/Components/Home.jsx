import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { Button, Layout, Menu, theme } from "antd";

export const Home = ({ user }) => {
  //   return (
  //     <div>
  //       <h1>Hello {user}</h1>
  //       <h2>Welcome to CRUD Application..</h2>
  //       <Link to="/login">login</Link>
  //       <br></br>
  //       <br></br>
  //       <Link to="/Register">Register</Link>
  //     </div>
  //   );
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="buttons">
            <h1>Hello {user}</h1>
            <h2>Welcome to CRUD Application..</h2>
            <Button type="text" className="login">
              <Link to="/login">Login</Link>
            </Button>
            <br></br>
            <Button type="text" className="register">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Web Design ©{new Date().getFullYear()} Created by Mohan G
      </Footer>
    </Layout>
  );
};

Home.propTypes = {
  setUser: propTypes.func.isRequired,
  user: propTypes.func.isRequired,
};
