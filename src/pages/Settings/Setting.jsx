import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./Setting.css";
import NavigationHeader from "../../components/Navigations/NavigationHeader";
import SideNavigation from "../../components/Navigations/SideNavigation";
import TitleHeader from "../../components/Headers/TitleHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faGlobe,
  faCalendarAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import HeadTeacherNavigation from "../HeadTeacher/Navigation/HeadTeacherNavigation";
import WareHouseSideNavigation from "../WareHouseStaff/Navigation/WareHouseSideNavigation";
import AuthenticationContext from "../../context/Authentication/AuthenticationContext";
import QualityNavigation from "../../pages/QualityAssurance/QualityNavigation/QualityNavigation";

function Setting() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const { isAdmin, isWareHouser, isHeadTeacher, isQA } = useContext(
    AuthenticationContext
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };
  const roleNavigation = () => {
    if (isAdmin()) {
      return (
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      );
    } else if (isHeadTeacher()) {
      return (
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      );
    } else if (isWareHouser()) {
      return (
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      );
    } else if (isQA()) {
      return (
        <QualityNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      );
    }
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
      {roleNavigation()}
        <Container className="reportContainer">
          <TitleHeader text={"Settings"} />
          <Row className="mb-3">
            <TitleHeader
              text={"General Settings"}
              headerTextStyle={"headerTextStyle"}
            />
            <Row className="mb-3">
              <Col>
                <div className={"formBarContainer"}>
                  <FontAwesomeIcon
                    icon={faLanguage}
                    className="sideNavSearchIcon"
                  />
                  <Form.Select className="DiscrepancyInput border-0 p-0">
                    <option>Language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </Form.Select>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className={"formBarContainer"}>
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="sideNavSearchIcon "
                  />
                  <Form.Select className="DiscrepancyInput border-0 p-0">
                    <option>Time Zone</option>
                    <option value="gmt">GMT</option>
                    <option value="pst">PST</option>
                    <option value="est">EST</option>
                  </Form.Select>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className={"formBarContainer"}>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="sideNavSearchIcon"
                  />
                  <Form.Select className="DiscrepancyInput border-0 p-0">
                    <option value="">Date Format</option>
                    <option value="dd-mm-yyyy">DD-MM-YYYY</option>
                    <option value="mm-dd-yyyy">MM-DD-YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </Form.Select>
                </div>
              </Col>
            </Row>
          </Row>
          <Row>
            <TitleHeader
              text={"Notification Settings"}
              headerTextStyle={"headerTextStyle"}
            />
            <Row>
              <Col>
                <div className={"formBarContainer"}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="sideNavSearchIcon"
                  />

                  <div className="settingEmail d-flex justify-content-between align-items-center w-100">
                    <h6 className="settingTexts">Email Notifications</h6>
                    <Form>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isOn}
                        onChange={handleToggle}
                        className="sideNavButtonToggle "
                      />
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Setting;
