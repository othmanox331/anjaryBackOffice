import React from "react";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { Home, Orders, Products, Category } from "@screens";
import { useSelector } from "react-redux";
import { SideBar, NavBar } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AppLoggedRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    // { path: "*", element: <Home /> },
    { path: "/Orders", element: <Orders /> },
    { path: "/Products", element: <Products /> },
    { path: "/Categories", element: <Category /> },
  ]);

  return (
    <div className="wrapper">
      <SideBar></SideBar>
      <div className="Content">
        <NavBar page={getTitle(routes)} />
        <div className="Main_Content">{routes}</div>
      </div>
    </div>
  );
};

const getTitle = (route) => {
  let output = "";
  let path = route.props.match.route.path;
  return path == "/" ? "Dashboard" : path.replace("/", "");
};

export default ({}) => {
  const { user, isLogged } = useSelector(({ account }) => account);

  return (
    <Router>
      {" "}
      <AppLoggedRoutes />{" "}
    </Router>
  );
};
