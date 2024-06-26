import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/bigIcon/inventoryIcon.png";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { each } from "chart.js/helpers";
import Loading from "../../../components/Loading/Loading";

function InventoryManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");

  const { getInventoryItems, getItemsData, getItemsError, getItemsIsLoading } =
    useContext(InventoryItemContext);

  useEffect(() => {
    getInventoryItems();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const convertDate = (givenDateString) => {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleString("en-GB");
    return currentDateString;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];

  useEffect(() => {
    if (location.state?.message) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleCreateItem = () => {
    navigate("/AddNewItem");
  };
  const handleGenerateReport = () => {
    navigate("/GenerateInventory");
  };
  const handleItemDetail = (pk) => {
    navigate(`/ItemDetail/${pk}`);
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
          <TitleHeader text={"Inventory Management"} />
          <Row className="mb-3">
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
              <PrimaryButton
                text={"Generate Inventory Report"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => handleGenerateReport()}
              />
            </Col>
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
              <PrimaryButton
                text={"View Inventory Reports"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => null}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={inventoryImage}
                figure={getItemsData? getItemsData.length :0}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Low Stock Alerts"}
                image={inventoryImage}
                figure={"46"}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Create New Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateItem()}
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
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateItem()}
              />
            </Col>
          </Row>
          <Container className="ListContainer">
            {!getItemsIsLoading ? (
              getItemsData.length > 0 ? (
                getItemsData.map((Item) => (
                  <Row
                    key={Item.id}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col xs={9} className="d-flex gap-3">
                      <Image
                        src={inventoryListImage}
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{Item.name}</h6>
                        <h6 className="fs-6">
                          {Item.id}
                          <span className="text-muted InventoryCategoryText">
                            | {Item.category}
                            <span className="d-none d-lg-inline me">
                              {Item.brand} | {Item.unit_cost} | {Item.quantity}
                              <span
                                className={
                                  Item.quantity > 35
                                    ? "text-success"
                                    : Item.quantity < 1
                                    ? "text-danger"
                                    : "text-warning"
                                }
                              >
                                {Item.quantity > 35
                                  ? "In stock"
                                  : Item.quantity < 1
                                  ? "Out of stock"
                                  : "Low on stock"}
                              </span>
                              &nbsp;| &nbsp; {Item.supplier} | &nbsp;
                              <span
                                className={
                                  Item.status === "pending"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                {Item.status}
                              </span>
                              | {convertDate(Item.created_at)}
                            </span>
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end gap-2">
                      <PrimaryButton
                        text={"Edit"}
                        Primarystyle={"UserViewButton d-none d-lg-block"}
                        clickEvent={() => null}
                      />
                      <PrimaryButton
                        text={"View details"}
                        Primarystyle={"schoolViewButton"}
                        clickEvent={() => handleItemDetail(Item.id)}
                      />
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable
                  textMessage={
                    "Sorry, there is currently no available item! 😥"
                  }
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getItemsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default InventoryManagement;
