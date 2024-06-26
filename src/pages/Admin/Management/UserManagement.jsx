import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import usersImage from "../../../assets/bigIcon/userManagement.png";
import userListImage from "../../../assets/bigIcon/userList.png";
import { useNavigate, useLocation } from "react-router-dom";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import UserContext from "../../../context/User/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function UserManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loadingUserStausId, setloadingUserStausId] = useState(null);

  const {
    getUsersData,
    getUsersError,
    getUsersIsLoading,
    getUsers,
    handleUserStatus,
    userStatusIsLoading,
    userStatusError,
    userStatusResponse,
  } = useContext(UserContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];

  const convertDate = (givenDateString) => {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleString("en-GB");
    return currentDateString;
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  useEffect(() => {
    if (!userStatusIsLoading && userStatusResponse) {
      setButtonLoading(false)
      getUsers(); 
    }
  }, [userStatusIsLoading, userStatusResponse]);

  useEffect(() => {
    if (!userStatusIsLoading && userStatusError) {
      setButtonLoading(false)
    }
  }, [userStatusIsLoading, userStatusError]);


  const handleLoadingClick = () => {
    if (
      userStatusIsLoading ||
      (!userStatusIsLoading && !userStatusError && !userStatusError)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleCreateUser = () => {
    navigate("/CreateNewUser");
  };

  const handleUserDetail = (pk) => {
    navigate(`/UserDetail/${pk}`);
  };

  const handleUserStatusSumit = (pk) => {
    setloadingUserStausId(pk)
    handleUserStatus(pk);
    handleLoadingClick()
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <TitleHeader text={"User Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Total IMS Users"}
                image={usersImage}
                figure={getUsersData? getUsersData.length :0}
                margin={"↑"}
                marginColor={"green"}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Create New User"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateUser()}
              />
            </Col>
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Create New User"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateUser()}
              />
            </Col>
          </Row>
          <Container>
            {!getUsersIsLoading ? (
              getUsersData.length > 0 ? (
                getUsersData.map((user) => (
                  <Row
                    key={user.id}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
                      <Image
                        src={userListImage}
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{user.name}</h6>
                        <h6 className="fs-6">
                          {" "}
                          {user.oracle_id}
                          <span className="text-muted InventoryCategoryText">
                            {" "}
                            | {user.role}{" "}
                            <span className="d-none d-lg-inline me">
                              {user.email} {user.phone} |
                              <span
                                className={
                                  user.status === "active"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {" "}
                                {user.status}
                              </span>{" "}
                              |{convertDate(user.created_at)}{" "}
                            </span>{" "}
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col
                      xs={3}
                      md={3}
                      sm={3}
                      lg={3}
                      className="d-flex justify-content-end gap-2"
                    >
                      <PrimaryButton
                        text={"View"}
                        Primarystyle={"UserViewButton"}
                        clickEvent={() => handleUserDetail(user.id)}
                      />
                      <Button className={`UserDeactivateButton d-none d-lg-block ${user.status === "inactive" ? 'bg-success': null}`} onClick={() => handleUserStatusSumit(user.id)}>
                      {buttonLoading && loadingUserStausId === user.id ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    user.status === "active" ? "Deactivate" : "Activate"
                  )}
                      </Button>
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable
                  textMessage={"Sorry, there is currently no user available 😥"}
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getUsersIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default UserManagement;
