import React from "react";
import "./TableLoader.css";

const TableLoader = ({ colSpan = 10, message = "Loading data, please wait...", minHeight = "180px" }) => {
  return (
    <tr className="table-loader-row">
      <td colSpan={colSpan} className="table-loader-cell">
        <div className="table-loader-container" style={{ minHeight }}>
          <div className="table-loader-spinner-wrapper">
            <div className="table-loader-spinner" />
          </div>
          <span className="table-loader-text">{message}</span>
        </div>
      </td>
    </tr>
  );
};

export default TableLoader;
