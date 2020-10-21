import React from "react";

import Icons from "../../common/Icons";
import ReactTooltip from "react-tooltip";

export default function Index({ onClick }) {
  return (
    <div className="fab-container">
      <ReactTooltip effect="solid" place="left" />
      <a
        href="/"
        className="fab-item"
        data-tip={"Add Card"}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        style={{
          background: "#17a2b8",
          color: "#ffffff",
        }}
      >
        <Icons icon="plus" className="fa-" />
      </a>
    </div>
  );
}
