import React from "react";

// from:
// https://stackoverflow.com/questions/40515142/how-to-make-a-sticky-footer-in-react?rq=1

var style = {
  backgroundColor: "#DCDCDC",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "40px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

var phantom = {
  display: "block",
  padding: "24px",
  height: "40px",
  width: "100%"
};

const Footer = props => {
  return (
    <div>
      <div style={phantom} />

      <div style={style}>
        <strong className="white-text">
          Signed in as: {props.footProps.username} {"   ("}
          {props.footProps.companyName} {")         QB: "}
          {props.footProps.qbConnected
            ? props.footProps.qbCompanyData.CompanyName
            : "not connected"}
        </strong>
      </div>
    </div>
  );
};

export default Footer;
