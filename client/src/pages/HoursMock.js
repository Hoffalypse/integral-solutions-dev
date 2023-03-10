import React from "react";
import Auth from "../utils/auth";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { getUserId } from "../utils/getUserId";

import EmployeeHours from "../components/Employee(Worker)/EmployeeHours";
import EmployeeHoursReport from "../components/AdminPortal/Employees(Admin)/EmployeeHoursReport";
import MockHours from "../components/Employee(Worker)/MockHours";

import { Button, Container, Col, Row } from "react-bootstrap/";
import "../styles/spinner.css";

const HoursMock = ({
  renderPanel,
  hoursButtonIsActive,
  hoursAdminButtonIsActive,
  hoursMockButtonIsActive,
}) => {
  // get user info to render to page
  const userId = getUserId();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { id: userId },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
  });

  let navigate = useNavigate();

  if (loading) {
    return (
      <div
        style={{ minHeight: "80vh", width: "100vw" }}
        className="d-flex justify-content-center align-items-center align-content-center mt-5"
      >
        <div className="lds-hourglass"></div>
      </div>
    );
  } else {
    return (
      <>
        <Container style={{ marginTop: "25px" }}>
          <Row className="justify-content-center">
            <p style={{ fontSize: "30px" }}>
              <b>Hours Mock</b>
            </p>
          </Row>
        </Container>

        <Container className="mb-1">
          <Row>
            <Col>
              <div className="d-flex flex-row mb-1 p-0 border border-secondary rounded-lg">
                <Button
                  variant="outline-primary"
                  style={hoursButtonIsActive ? isActive : notActive}
                  active={hoursButtonIsActive}
                  onClick={() => {
                    navigate("/hours");
                  }}
                >
                  Enter Hours
                </Button>
                <Button
                  variant="outline-primary"
                  style={hoursAdminButtonIsActive ? isActive : notActive}
                  active={hoursAdminButtonIsActive}
                  onClick={() => {
                    navigate("/hoursadmin");
                  }}
                >
                  Hours Admin
                </Button>
                <Button
                  variant="outline-primary"
                  style={hoursMockButtonIsActive ? isActive : notActive}
                  active={hoursMockButtonIsActive}
                  onClick={() => {
                    navigate("/hours-mock");
                  }}
                >
                  Hours Admin
                </Button>
              </div>

              {
                renderPanel === "hours" ? (
                <EmployeeHours />
              ) : renderPanel === "hoursadmin" ? (
                <EmployeeHoursReport />
              ) : (
                <MockHours />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default HoursMock;

const isActive = {
  flex: "auto",
  border: "solid 3px black",
  borderRadius: "3px",
  backgroundColor: "#007AFF",
};

const notActive = {
  flex: "auto",
  border: "none",
  borderRadius: "0",
  outline: "none",
  boxShadow: "none",
};
