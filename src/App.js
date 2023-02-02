import { Route, Routes } from "react-router-dom";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import "./index.css";
import Dashboard from "./Screens/Admin/Dashboard";
import Sidebar from "../src/Components/Admin/Sidebar/Sidebar";
import ErrorPage from "./Screens/Admin/ErrorPage";
import Login from "./Screens/Admin/Authentication/Login";
// Subscribers
import ActiveUsers from "./Screens/Admin/Subscribers/ActiveUsers";
import SuspendedUsers from "./Screens/Admin/Subscribers/SuspendedUsers";
import Blocked from "./Screens/Admin/Subscribers/Blocked";
// Protected Routes
import ProtectedRoute from "./Components/Admin/ProtectedRoutes/ProtectedRoute";
// Settings
import Settings from "./Screens/Admin/Settings/Settings";
import Genders from "./Screens/Admin/Settings/Genders";
import Rashi from "./Screens/Admin/Settings/Rashi";
import Gotra from "./Screens/Admin/Settings/Gotra";
import Nakshatra from "./Screens/Admin/Settings/Nakshatra";
import MarriageType from "./Screens/Admin/Settings/MarriageType";
import Profile from "./Screens/Admin/Settings/Profile";
import SubCast from "./Screens/Admin/Settings/SubCast";
import Sect from "./Screens/Admin/Settings/Sect";
import Education from "./Screens/Admin/Settings/Education";
import EducationType from "./Screens/Admin/Settings/EducationType";
// Support
import SupportTickets from "./Screens/Admin/Support/SupportTicket";
import Tickets from "./Screens/Admin/Support/Tickets";
import Reported from "./Screens/Admin/Support/Reported";
// Accounts
import Package from "./Screens/Admin/Accounts/Package";
import Coupon from "./Screens/Admin/Accounts/Coupon";
import Order from "./Screens/Admin/Accounts/Order";
import UserRegister from "./Screens/Admin/Accounts/UserRegister";

// For User
import DashboardU from "./Screens/User/Dashboard";
import ContactusU from "./Screens/User/Contactus";
import AboutusU from "./Screens/User/Aboutus";
import ProfileU from "./Screens/User/Profile";
import LoginU from "./Screens/User/Login";
import SignupU from "./Screens/User/Signup";
import RegisterU from "./Screens/User/SignupP";
import RegisterR from "./Screens/User/SignupR";
import ProfileDashboard from "./Screens/User/ProfileDashboard";
import Notification from "./Screens/User/Notification";
import Search from "./Screens/User/Search";
import ProfileDescription from "./Screens/User/ProfileDescription";

import Setting from "./Screens/User/Setting";

import Refund from "./Screens/User/refund";
import Policy from "./Screens/User/policy";
import Terms from "./Screens/User/terms";

function App() {
  // toggle function
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  return (
    // mantine color scheme providers
    <div>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        {/* save the color palet to mantine data */}
        <MantineProvider
          theme={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            colorScheme,
            colors: {
              orange: [
                "rgba(252, 226, 210, 0.2)",
                "#FF9248",
                "#FF9248",
                "#FF9248",
                "#FF9248",
                "#FF9248",
                "#FF9248",
                "#FF9248",
                "#FF9248",
                "#FF9248",
              ],
            },
          }}
        >
          {/* For show the notification data in side of toaster  */}
          <NotificationsProvider autoClose={3000}>
            <>
              <Routes>
                <Route exact path="/" element={<DashboardU />} />
                <Route path="/contact" element={<ContactusU />} />
                <Route path="/about" element={<AboutusU />} />
                <Route path="/profile" element={<ProfileU />} />
                <Route path="/login" element={<LoginU />} />
                <Route path="/signup" element={<SignupU />} />
                <Route path="/register" element={<RegisterU />} />
                <Route path="/register/:id" element={<RegisterR />} />
                <Route exact path="/refund" element={<Refund />} />
                <Route exact path="/policy" element={<Policy />} />
                <Route exact path="/terms" element={<Terms />} />

                {/* For User */}

                <Route
                  exact
                  path="/user_profile"
                  element={
                    <ProtectedRoute>
                      <ProfileDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/notification"
                  element={
                    <ProtectedRoute>
                      <Notification />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/setting"
                  element={
                    <ProtectedRoute>
                      <Setting />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/profiledetails/:id"
                  element={
                    <ProtectedRoute>
                      <ProfileDescription />
                    </ProtectedRoute>
                  }
                />

                <Route element={<Sidebar />}>
                  <Route
                    exact
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/active"
                    element={
                      <ProtectedRoute>
                        <ActiveUsers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/suspend"
                    element={
                      <ProtectedRoute>
                        <SuspendedUsers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/block"
                    element={
                      <ProtectedRoute>
                        <Blocked />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tickets"
                    element={
                      <ProtectedRoute>
                        <Tickets />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reported"
                    element={
                      <ProtectedRoute>
                        <Reported />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/nakshatra"
                    element={
                      <ProtectedRoute>
                        <Nakshatra />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order"
                    element={
                      <ProtectedRoute>
                        <Order />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/marriage"
                    element={
                      <ProtectedRoute>
                        <MarriageType />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/package"
                    element={
                      <ProtectedRoute>
                        <Package />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/coupon"
                    element={
                      <ProtectedRoute>
                        <Coupon />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/rashi"
                    element={
                      <ProtectedRoute>
                        <Rashi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/gotra"
                    element={
                      <ProtectedRoute>
                        <Gotra />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/gender"
                    element={
                      <ProtectedRoute>
                        <Genders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin_profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user_register"
                    element={
                      <ProtectedRoute>
                        <UserRegister />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/sub_cast"
                    element={
                      <ProtectedRoute>
                        <SubCast />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/sect"
                    element={
                      <ProtectedRoute>
                        <Sect />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/education"
                    element={
                      <ProtectedRoute>
                        <Education />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/education_type"
                    element={
                      <ProtectedRoute>
                        <EducationType />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/support_tickets"
                    element={
                      <ProtectedRoute>
                        <SupportTickets />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/Login" element={<Login />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
