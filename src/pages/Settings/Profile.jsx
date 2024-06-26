import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./Setting.css";
import NavigationHeader from "../../components/Navigations/NavigationHeader";
import SideNavigation from "../../components/Navigations/SideNavigation";
import TitleHeader from "../../components/Headers/TitleHeader";
import userImage from "../../assets/bigIcon/userImage.png";
import CustomFileInput from "../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import HeadTeacherNavigation from "../HeadTeacher/Navigation/HeadTeacherNavigation";
import WareHouseSideNavigation from "../WareHouseStaff/Navigation/WareHouseSideNavigation";
import AuthenticationContext from "../../context/Authentication/AuthenticationContext";
import QualityNavigation from "../../pages/QualityAssurance/QualityNavigation/QualityNavigation";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/User/UserContext";
import ComfirmationPop from "../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../components/Loading/Loading";

function Profile() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const { isAdmin, isWareHouser, isHeadTeacher, isQA, userData, setUserData } =
    useContext(AuthenticationContext);
  const {
    handleEditUser,
    seteditedFormData,
    editedFormData,
    editUserIsLoading,
    editUserError,
    editUserResponse,
    seteditUserError,
    seteditUserResponse,
    getSingleUser,
    getSingleUserIsLoading,
    getSingleUserData,
  } = useContext(UserContext);

  useEffect(() => {
    if (userData && userData.id) {
      getSingleUser(userData.id);
    }
  }, [userData]);

  useEffect(() => {
    if (!editUserIsLoading && editUserResponse) {
      scrollToTop();
      handleComfirmationPopUps(editUserResponse, "bg-success");
      setUserData(getSingleUserData);
      sessionStorage.setItem("edoUserData", JSON.stringify(getSingleUserData));
      setButtonLoading(false);
      seteditUserResponse(null);
      getSingleUser(userData.id);
    }
  }, [editUserIsLoading, editUserResponse, getSingleUserData, setUserData]);

  useEffect(() => {
    if (!editUserIsLoading && editUserError) {
      scrollToTop();
      handleComfirmationPopUps(editUserError, "bg-danger");
      setButtonLoading(false);
      seteditUserError(null);
    }
  }, [editUserIsLoading, editUserError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    if (
      editUserIsLoading ||
      (!editUserIsLoading && !editUserError && !editUserResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleEditSubmit = (e) => {
    handleEditUser(e, userData.id);
    handleLoadingClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "Choose a file";

    seteditedFormData({
      ...editedFormData,
      image: file.name,
    });
    console.log(editedFormData, file);

    document.getElementById("fileLabel").innerText = fileName;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <TitleHeader text={"Profile"} />
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          {getSingleUserIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleUserIsLoading} />
            </Container>
          ) : (
            <Row>
              <Form onSubmit={handleEditSubmit}>
                <Row className="align-items-end mb-5">
                  <Col
                    sm={12}
                    xm={12}
                    xl={4}
                    md={12}
                    lg={12}
                    className="mb-2 d-flex align-items-center justify-content-center"
                  >
                    <Image
                      src={userImage}
                      width={300}
                      className="justify-content-center"
                    />
                  </Col>
                  <Col className="" sm={12} xm={12} xl={3} md={12} lg={12}>
                    <Form.Control
                      type="file"
                      id="profilefileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      name="image"
                      
                    />
                    <CustomFileInput
                      fieldName={"profilefileInput"}
                      title={"Upload a New Profile Picture"}
                      CustomFileInputicon={faUpload}
                    />
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Uche Darlington"
                        className="DiscrepancyInput"
                        value={editedFormData.name}
                        onChange={handleChange}
                        name="name"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="OracleID"
                        className="DiscrepancyInput"
                        name="oracle_id"
                        value={editedFormData.oracle_id}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="email"
                        placeholder="uchedarlington@xyz.abc"
                        className="DiscrepancyInput"
                        name="email"
                        value={editedFormData.email}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="+1234567890"
                        className="DiscrepancyInput"
                        name="phone_number"
                        value={editedFormData.phone_number}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Row>
                  <Col>
                    {" "}
                    <Button
                      variant="success"
                      className="w-100 p-2"
                      type="submit"
                    >
                      {buttonLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                      ) : (
                        "Save Cahanges"
                      )}
                    </Button>
                  </Col>
                  <Col>
                    {" "}
                    <Button
                      variant="outline-success"
                      className="w-100 p-2"
                      type="reset"
                    >
                      {" "}
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Profile;
