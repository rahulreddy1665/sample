import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  ColorSchemeProvider,
  createStyles,
  Group,
  Header,
  MantineProvider,
  Text,
  MediaQuery,
  Menu,
  Navbar,
  ScrollArea,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core"; // For import all manitine component
import { useFullscreen, useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { SpotlightProvider, useSpotlight } from "@mantine/spotlight";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  CurrencyRupee,
  Dashboard,
  Friends,
  Help,
  Home,
  Logout,
  MoonStars,
  Receipt,
  Report,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  Ticket,
  UserExclamation,
  UserMinus,
  Users,
} from "tabler-icons-react"; // For import the icons

// For import the images
import logo from "../../../assets/logo.png";
import logoW from "../../../assets/User/logo.png";
import { LinksGroup } from "../Sidebar/NavbarLinksGroup";
import { Outlet } from "react-router-dom";
import { ModalsProvider, useModals } from "@mantine/modals";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
    user: {
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: "background-color 100ms ease",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      },
    },
    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === "dark"
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 5 : 7
            ],
        },
      },
    },
    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },

    linksInner: {
      paddingBottom: theme.spacing.xl,
    },
    search: {
      [theme.fn.smallerThan("xs")]: {
        display: "none",
      },
      marginLeft: 90,
    },
  };
});

// Function for spotlight of search bar from top bar navigation
function SpotlightControl(props) {
  const theme = useMantineTheme();
  const spotlight = useSpotlight();
  return (
    <Group position="center">
      <TextInput
        icon={<Search size={18} />}
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
          >
            {theme.dir === "ltr" ? (
              <ArrowRight size={18} />
            ) : (
              <ArrowLeft size={18} />
            )}
          </ActionIcon>
        }
        placeholder="Search "
        sx={{ marginLeft: 60 }}
        onClick={spotlight.openSpotlight}
        rightSectionWidth={42}
        {...props}
      />
    </Group>
  );
}

// Sidebar start
function Sidebar({ children }) {
  // For side bar list
  const mockdata = [
    { label: "Dashboard", icon: Home, link: "/dashboard" },

    {
      label: "Subscribers",
      icon: Friends,
      initiallyOpened: false,
      links: [
        { label: "Active", link: "/active" },
        { label: "Suspended", link: "/suspend" },
        { label: "Blocked", link: "/block" },
      ],
    },
    {
      label: "Accounts",
      icon: CurrencyRupee,
      initiallyOpened: false,
      links: [
        { label: "Packages", link: "/package" },
        { label: "Coupons", link: "/coupon" },
        { label: "Register User", link: "/user_register" },
      ],
    },
    {
      label: "Support",
      icon: Help,
      initiallyOpened: false,
      links: [
        { label: "Support-Tickets", link: "/support_tickets" },
        { label: "Tickets", link: "/tickets" },
        { label: "Reported", link: "/reported" },
      ],
    },
    { label: "Setting", icon: Settings, link: "/settings" },
  ];

  // For spotlight search
  const actions = [
    {
      title: "Dashboard",
      description: "Get full information about current system status",
      onTrigger: () => navigate("/"),
      icon: <Dashboard size={40} />,
    },
    {
      title: "Active Users",
      description: "Information about all the active users",
      onTrigger: () => navigate("/active"),
      icon: <Users size={40} />,
    },
    {
      title: "Suspended Users",
      description: "Information about all the suspended users",
      onTrigger: () => navigate("/"),
      icon: <UserMinus size={40} />,
    },
    {
      title: "Blocked Users",
      description: "Get full information about all the blocked users",
      onTrigger: () => navigate("/"),
      icon: <UserExclamation size={40} />,
    },
    {
      title: "Orders",
      description: "Information about all the orders (pending & completed)",
      onTrigger: () => navigate("/order"),
      icon: <ShoppingCart size={40} />,
    },

    {
      title: "Packages",
      description: "Get full information about current packages",
      onTrigger: () => navigate("/package"),
      icon: <Box size={40} />,
    },
    {
      title: "Coupons",
      description: "Information about all the active coupons",
      onTrigger: () => navigate("/coupon"),
      icon: <Receipt size={40} />,
    },
    {
      title: "Ticket",
      description: "Information about the tickets",
      onTrigger: () => navigate("/tickets"),
      icon: <Ticket size={40} />,
    },
    {
      title: "Reported",
      description: "Information about all the suspended users",
      onTrigger: () => navigate("/reported"),
      icon: <Report size={40} />,
    },
    {
      title: "Settings",
      description: "For main data show settings",
      onTrigger: () => navigate("/settings"),
      icon: <Settings size={40} />,
    },
  ];
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  let navigate = useNavigate();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  const dark = colorScheme === "dark";
  const { toggle, fullscreen } = useFullscreen();
  const modals = useModals();
  const handleModal = (e) => {
    modals.openConfirmModal({
      title: "Do you want to logout",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        localStorage.clear();
        navigate("/login");
      },
    });
  };
  return (
    // mantine color scheme providers
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {/* save the color palet to mantine data */}
      <MantineProvider
        theme={{
          fontFamily: "Poppins, sans-serif",
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
        <ModalsProvider>
          <AppShell
            // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
            navbarOffsetBreakpoint="sm"
            // fixed prop on AppShell will be automatically added to Header and Navbar
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            fixed
            navbar={
              <Navbar
                p="md"
                // Breakpoint at which navbar will be hidden if hidden prop is true
                hiddenBreakpoint="sm"
                // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
                hidden={!opened}
                // when viewport size is less than theme.breakpoints.sm navbar width is 100%
                // viewport size > theme.breakpoints.sm – width is 300px
                // viewport size > theme.breakpoints.lg – width is 400px
                width={{ sm: 300, lg: 250 }}
              >
                <Navbar.Section
                  grow
                  className={classes.links}
                  component={ScrollArea}
                >
                  <div className={classes.linksInner}>{links}</div>
                </Navbar.Section>
              </Navbar>
            }
            header={
              <Header height={70} p="md">
                {/* Handle other responsive styles with MediaQuery component or createStyles function */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>
                  {/* For logo view */}
                  {dark ? (
                    <img
                      src={logoW}
                      alt="logo"
                      style={{ width: 120, marginLeft: 0 }}
                    ></img>
                  ) : (
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: 200, marginLeft: -40 }}
                    ></img>
                  )}

                  <SpotlightProvider
                    actions={actions}
                    searchIcon={<Search size={18} />}
                    searchPlaceholder="Search..."
                    shortcut="mod + shift + 1"
                    nothingFoundMessage="Nothing found..."
                  >
                    <SpotlightControl />
                  </SpotlightProvider>

                  <ActionIcon
                    variant="outline"
                    color={dark ? "yellow" : "blue"}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                    style={{ marginLeft: "auto", marginRight: 20 }}
                  >
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                  </ActionIcon>

                  <Menu
                    size={120}
                    shadow="sm"
                    placement="end"
                    transition="pop-top-right"
                    className={classes.userMenu}
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                    control={
                      <UnstyledButton
                        className={cx(classes.user, {
                          [classes.userActive]: userMenuOpened,
                        })}
                      >
                        <Avatar color="orange" radius="xl">
                          ZC
                        </Avatar>
                      </UnstyledButton>
                    }
                  >
                    <Menu.Item
                      onClick={() => {
                        modals.openConfirmModal({
                          title: "Confirm Logout ",
                          children: (
                            <Text size="sm">
                              This action is so important that you are required
                              to confirm logout. Please click one of these
                              buttons to proceed.
                            </Text>
                          ),

                          labels: {
                            confirm: "Confirm",
                            cancel: "Cancel",
                          },
                          confirmProps: { color: "orange" },
                          onCancel: () => console.log("Cancel"),
                          onConfirm: () => {
                            localStorage.clear();
                            navigate("/login");
                          },
                        });
                      }}
                      icon={<Logout size={14} />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
                </div>
              </Header>
            }
          >
            <Outlet />
          </AppShell>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Sidebar;
