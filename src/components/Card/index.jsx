import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Card = ({ children, style }) => {
  return (
    <div className="SiteCard" style={style}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Card.defaultProps = {
  style: {},
};

export default Card;
