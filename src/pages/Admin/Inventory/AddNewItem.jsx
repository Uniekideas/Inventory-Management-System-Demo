import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";

function AddNewItem() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const {
    handleAddItem,
    addItemIsLoading,
    addItemResponse,
    addItemError,
    setAddItemError,
    setAddItemResponse,
  } = useContext(InventoryItemContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!addItemIsLoading && addItemResponse) {
      navigate("/InventoryManagement", {
        state: { message: "Item added successful!" },
      });
      setAddItemResponse(null);
    }
  }, [addItemIsLoading, addItemResponse, navigate]);

  useEffect(() => {
    if (!addItemIsLoading && addItemError) {
      scrollToTop();
      handleComfirmationPopUps(addItemError, "bg-danger");
      setButtonLoading(false);
    }
    setAddItemError(null);
  }, [addItemIsLoading, addItemError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    addItemIsLoading
      ? setButtonLoading(true)
      : !addItemIsLoading && addItemError
      ? setButtonLoading(true)
      : setButtonLoading(false);
  };

  const handleSubmit = (e) => {
    handleAddItem(e);
    handleLoadingClick();
  };

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name || "Choose a file";
    document.getElementById("fileLabel").innerText = fileName;
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
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Add New Item"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <Form onSubmit={handleSubmit}>
            <Row>
              <TitleHeader
                text={"Item Information "}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Item Name"
                      className="UserCreateInput"
                      name="name"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Item Description"
                      name="description"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Brand"
                      className="UserCreateInput"
                      name="brand"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="category"
                      required
                    >
                      <option value="">Category</option>
                      <option value="office_supplies">office_supplies</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="value"
                      required
                    >
                      <option value="">Value</option>
                      <option value="Mid">Mid</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="shoolfileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      name="image"
                      required
                    />
                    <CustomFileInput
                      fieldName={"shoolfileInput"}
                      title={"Upload Item Image"}
                      CustomFileInputicon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row>
              <TitleHeader
                text={"Inventory Details"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      placeholder="Unit Cost"
                      className="UserCreateInput"
                      name="unit_cost"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Quantity on Hand"
                      name="quantity"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Reorder Point"
                      name="reorder_point"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Supplier"
                      name="supplier"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row>
              <TitleHeader
                text={"Addittional Information"}
                headerTextStyle={"headerTextStyle"}
              />
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Serial Number"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Warrant Information"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Addittional Information"
                        className="UserCreateTextArea"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2" type="submit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Save Item"
                  )}
                </Button>
              </Row>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default AddNewItem;
