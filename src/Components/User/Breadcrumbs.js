import React from "react";

import { useHistory, useNavigate } from "react-router-dom";
import { Text, Card } from "@mantine/core";
import { Home } from "tabler-icons-react";

const BreadCrumb = (props) => {
  let navigate = useNavigate();
  const handleClick = (event) => {
    navigate(event);
  };

  return (
    <Card shadow="sm" className="zc-bcard">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text>{props.Text}</Text>
        <div className="zc-breadcrumb">
          <p onClick={() => handleClick("/")}>
            {" "}
            <Home style={{ paddingTop: 1.5 }} size={12} />{" "}
          </p>
          {props.Title ? (
            <>
              <p className="zc-dash"> &nbsp; / &nbsp;</p>
              <p onClick={() => handleClick(props.titleLink)}> {props.Title}</p>
            </>
          ) : null}
          {props.Text ? (
            <>
              <p className="zc-dash"> &nbsp; / &nbsp;</p>
              <p className="zc-breadcrumb-text"> {props.Text}</p>
            </>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default BreadCrumb;
