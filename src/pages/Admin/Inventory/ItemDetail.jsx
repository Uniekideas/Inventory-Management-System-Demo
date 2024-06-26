import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useParams } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import Loading from "../../../components/Loading/Loading";

function ItemDetail() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    getInventorySingleItem,
    getSingleItemData,
    getSingleItemError,
    getSingleItemIsLoading,
  } = useContext(InventoryItemContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let { pk } = useParams();
  useEffect(() => {
    getInventorySingleItem(pk);
  }, []);

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"View Item Details"} />
          </div>
          {getSingleItemIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleItemIsLoading} />
            </Container>
          ) : (
            <div>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Item Information "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4  align-items-center">
                  <Col className="itemHeaderText">
                    item Image:
                    <Image
                      src={inventoryListImage}
                      rounded
                      width="50"
                      height="50"
                      className="mx-2"
                    />
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Item Name:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.name}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Item Description:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.description}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Brand:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.brand}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Category:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.category}
                    </b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Item Information "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4  align-items-center">
                  <Col className="itemHeaderText">
                    item Image:
                    <Image
                      src={inventoryListImage}
                      rounded
                      width="50"
                      height="50"
                      className="mx-2"
                    />
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Item Name:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.name}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Item Description:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.description}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Brand:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.brand}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Category:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.category}
                    </b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Inventory Details "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Unit Cost:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.unit_cost}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Quantity on Hand:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.quantity}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Reorder Point:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.reorder_point}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Supplier:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.supplier}
                    </b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Additional Information "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Serial Number:{" "}
                    <b className="itemDetailText mx-2">12345GHSN45</b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Warranty Information:{" "}
                    <b className="itemDetailText mx-2">2 months</b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Custom Fields: <b className="itemDetailText mx-2">__</b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row>
                <Col lg={8} md={8} xl={8} sm={12} xs={12} className="mb-3">
                  <PrimaryButton
                    text={"Edit Item Data"}
                    Primarystyle={"w-100 itemDetailEditButton"}
                    clickEvent={() => null}
                  />
                </Col>
                <Col lg={4} md={4} xl={4} sm={12} xs={12}>
                  <PrimaryButton
                    text={"print Item Label"}
                    Primarystyle={"w-100 itemDetailPrintButton"}
                    clickEvent={() => null}
                  />
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default ItemDetail;
