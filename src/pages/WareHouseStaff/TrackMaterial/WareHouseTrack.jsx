import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./WareHouseTrack.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import { useNavigate } from "react-router-dom";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";

function WareHouseTrack() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];
  const handleAddMovement = () => {
    navigate('/WareHouseAddMovement')
  }
  const users = [
    {
      id: 1,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 50,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 2,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 24,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 3,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 0,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    // Add more users as needed
  ];
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <TitleHeader text={"Track Materials"} />
          <Row className="mb-4">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleAddMovement()}
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
                clickEvent={() => handleAddMovement()}
              />
            </Col>
          </Row>
          <Container className="mb-5">
            {users.map((user) => (
              <Row
                key={user.id}
                className="UserListRow my-2 py-2 align-items-center"
              >
                <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
                  <Image
                    src={inventoryListImage}
                    rounded
                    width="50"
                    height="50"
                  />
                  <div>
                    <h6>{user.itemType}</h6>
                    <h6 className="fs-6">
                      {" "}
                      {user.itemId}
                      <span className="text-muted wareHouserCategoryText">
                        {" "}
                        | {user.suppy}{" "}
                        <span className="d-none d-lg-inline me">
                          {user.itemName} | {user.price} | {user.quantity}
                          <span
                            className={
                              user.quantity > 35
                                ? "text-success"
                                : user.quantity < 1
                                ? "text-danger"
                                : "text-warning"
                            }
                          >
                            {" "}
                            {user.quantity > 35
                              ? "In stock"
                              : user.quantity < 1
                              ? "Out of stock"
                              : "Low on stock"}
                          </span>{" "}
                          &nbsp;| &nbsp; {user.location} | &nbsp;
                          <span
                            className={
                              user.status === "Active"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {" "}
                            {user.status}
                          </span>{" "}
                          | {user.joinDate}
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
                    text={"Track"}
                    Primarystyle={"schoolViewButton "}
                  />
                </Col>
              </Row>
            ))}
          </Container>
          <TitleHeader text={"Movement Log"} headerTextStyle={'headerTextStyle'}/>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default WareHouseTrack;
