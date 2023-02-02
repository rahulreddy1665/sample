import {
  Button,
  createStyles,
  Group,
  Text,
  useMantineTheme,
  Modal,
  Textarea,
  Drawer,
  Burger,
  MediaQuery,
  TextInput,
  NumberInput,
  Container,
  Navbar,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooleanToggle } from "@mantine/hooks";
import logo from "../../assets/User/logo.png";
import footerlogo from "../../assets/User/footerlogo.png";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Dots,
  Pencil,
  Search,
  Selector,
  Trash,
  X,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    height: "10%",
    marginBottom: 30,
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    textDecoration: "none",
    color: "white",
    borderBottomColor: "orange",

    fontWeight: 500,
    fontSize: 14,
    "&:hover": {
      borderBottom: "1px solid orange",
      padding: "8px 12px 7px 12px",
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
  link2: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    transition: "border-bottom 0.8s ease",
    textDecoration: "none",
    color: "black",
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    fontSize: 14,
    "&:hover": {
      textDecoration: "none",
      borderBottom: "1px solid orange",
      padding: "8px 12px 7px 12px",
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
  linkActive: {
    color: "orange",
    transition: "border-bottom 0.8s ease",
    borderBottomColor: "orange",
    " &:hover": {
      textDecoration: "none",
      borderBottom: "1px solid orange",
    },
  },
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    // backgroundColor: theme.colors.orange
  },

  inners: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  linksss: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export default function Header({ children }) {
  const { classes, cx } = useStyles();

  let navigate = useNavigate();
  const location = useLocation();
  const [opened2, setOpened] = useState(false);
  const [openedSide, setOpenedSide] = useState(false);
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token"));
  const [scroll, scrollTo] = useWindowScroll();

  const links = [
    { label: "HOME", link: "/" },
    { label: "ABOUT", link: "/about" },
    { label: "PROFILES", link: "/profile" },
    { label: "CONTACT", link: "/contact" },
  ];
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      title: "",
      description: "",
    },
  });
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: location.pathname === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        toggleOpened(false);
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  const handelAdd = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .post(
        URL + "ticket_support",
        {
          title: values.title,
          label: values.name,
          email: values.email,
          phone_number: values.phone_number,
          description: values.description,
        },
        config
      )
      .then((response) => {
        form.reset();
        setOpened(false);
        showNotification({
          color: "green",
          icon: <Check />,
          title: "Ticket added successfully",
        });
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Ticket didnt added ",
        });
      });
  };
  const home = () => {
    navigate("/");
  };
  return (
    <div>
      <div
        className={scroll.y > 99 ? "sticky_nav_bar_header" : "nav_bar_header"}
      >
        <Container size="lg" onScroll>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {scroll.y > 99 ? (
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <img
                  src={footerlogo}
                  style={{ cursor: "pointer" }}
                  onClick={() => home()}
                  width={190}
                />
              </MediaQuery>
            ) : (
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <img
                  src={logo}
                  style={{ cursor: "pointer" }}
                  onClick={() => home()}
                  width={190}
                />
              </MediaQuery>
            )}
            {scroll.y > 99 ? (
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <img
                  src={footerlogo}
                  style={{ cursor: "pointer" }}
                  onClick={() => home()}
                  width={150}
                />
              </MediaQuery>
            ) : (
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <img
                  src={logo}
                  style={{ cursor: "pointer" }}
                  onClick={() => home()}
                  width={150}
                />
              </MediaQuery>
            )}

            <Group spacing={5} className="links">
              {scroll.y > 99 ? (
                <>
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.link}
                      className={
                        location.pathname === link.link
                          ? "nav_bar_link nav_bar_color_Active"
                          : "nav_bar_link nav_bar_color2"
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        setActive(link.link);
                        toggleOpened(false);
                        navigate(link.link);
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </>
              ) : (
                <>
                  {links.map((link) => (
                    <p
                      key={link.label}
                      href={link.link}
                      className={
                        location.pathname === link.link
                          ? "nav_bar_link nav_bar_color_Active"
                          : "nav_bar_link nav_bar_color"
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        setActive(link.link);
                        toggleOpened(false);
                        navigate(link.link);
                      }}
                    >
                      {link.label}
                    </p>
                  ))}
                </>
              )}

              <Button
                radius="xl"
                size="xs"
                color="orange"
                onClick={() => setOpened(true)}
                sx={{ height: 30 }}
                ml={15}
              >
                Support
              </Button>
            </Group>
            <Group spacing={5} className="mobile_links">
              <div largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={openedSide}
                  onClick={() => setOpenedSide((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </div>

              <Drawer
                className="for_background"
                opened={openedSide}
                onClose={() => setOpenedSide(false)}
                padding="xs"
                size="xs"
                position="right"
                transition="slide-left"
                transitionDuration={250}
                transitionTimingFunction="ease"
              >
                {items}
                <Button
                  radius="xl"
                  size="xs"
                  color="orange"
                  onClick={() => setOpened(true)}
                  sx={{ height: 30 }}
                  ml={15}
                >
                  Support
                </Button>
              </Drawer>
            </Group>
          </div>
        </Container>
      </div>
      <Modal
        opened={opened2}
        onClose={() => setOpened(false)}
        title="Contact Support"
      >
        <form onSubmit={form.onSubmit((values) => handelAdd(values))}>
          <TextInput
            label="Full Name"
            mt={5}
            required
            placeholder="Full Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            mt={5}
            required
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <NumberInput
            label="Phone Number."
            mt={5}
            required
            placeholder="Phone Number."
            {...form.getInputProps("phone_number")}
          />
          <TextInput
            label="Issue Title"
            mt={5}
            required
            placeholder="Issue Title"
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Explain the issue"
            mt={5}
            required
            placeholder="Explain the issue"
            {...form.getInputProps("description")}
          />

          <Button
            fullWidth
            radius="md"
            mt="xl"
            type="submit"
            size="md"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            Submit
          </Button>
        </form>
      </Modal>
      {children}
    </div>
  );
}
