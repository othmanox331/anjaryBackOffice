import React from "react";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import {
  Home,
  Orders,
  Products,
  Category,
  Sliders,
  Register,
  Login,
} from "@screens";
import { useSelector } from "react-redux";
import { SideBar, NavBar } from "@components";

const AppLoggedRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    // { path: "*", element: <Home /> },
    { path: "/Orders", element: <Orders /> },
    { path: "/Products", element: <Products /> },
    { path: "/Categories", element: <Category /> },
    { path: "/Sliders", element: <Sliders /> },
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

const App401Routes = () => {
  return <Login />;
};
("");

const getTitle = (route) => {
  let output = "";
  let path = route.props.match.route.path;
  return path == "/" ? "Dashboard" : path.replace("/", "");
};

const GuestRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "*", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return <div className="Main_Content">{routes}</div>;
};

export default ({}) => {
  const { user, isLogged } = useSelector(({ account }) => account);

  return (
    <Router>
      {!isLogged && !user ? <GuestRoutes /> : <AppLoggedRoutes />}
    </Router>
  );
};
