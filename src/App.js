import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationControl from "./components/Navigations/NavigationControl";
import { AuthenticationProvider } from "./context/Authentication/AuthenticationContext";
import { InventoryItemProvider } from "./context/Item/InventoryItemContext";
import { ThemeProvider } from "./context/Theme/ThemeContext";
import { SchoolProvider } from "./context/School/SchoolContext";
import { UsersProvider } from "./context/User/UserContext";

function App() {
  return (
    <div>
      <AuthenticationProvider>
        <ThemeProvider>
          <UsersProvider>
            <SchoolProvider>
              <InventoryItemProvider>
                <NavigationControl />
              </InventoryItemProvider>
            </SchoolProvider>
          </UsersProvider>
        </ThemeProvider>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
