import React, {useState} from 'react'
import { Container, Row, Image } from "react-bootstrap";
import NoNotification from "../../assets/bigIcon/NoNotification.png";
import NavigationHeader from '../Navigations/NavigationHeader';
import SideNavigation from '../Navigations/SideNavigation';
import TitleHeader from '../Headers/TitleHeader';
import NonAvaliable from '../NonAvaliable/NonAvaliable';

function NotificationDisplay() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
    <NavigationHeader toggleSidebar={toggleSidebar} />
    <div className="d-flex justify-content-between">
      <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Container className="reportContainer">
        <TitleHeader text={"Notifications"} />
        <NonAvaliable textMessage={'Sorry, you currently have no notifications, please check back later!'}/>
      </Container>
    </div>
  </div>
  )
}

export default NotificationDisplay