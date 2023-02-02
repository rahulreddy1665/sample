import {
  Button,
  createStyles,
  Group,
  Text,
  useMantineTheme,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooleanToggle } from "@mantine/hooks";
import footerlogo from "../../assets/User/footerlogo.png";
import { useForm } from "@mantine/form";
import axios from "axios";
import { showNotification, updateNotification } from "@mantine/notifications";
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
    height: "10%",
    marginBottom: 30,
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "black",
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    // '&:hover': {
    //     textDecoration: "none",
    //     borderBottom: "2px solid orange"
    // },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
  linkActive: {
    color: "orange",
    borderBottomColor: "orangered",
    // ' &:hover': {
    //     textDecoration: "none",
    //     borderBottom: "2px solid orange"
    // },
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

  const links = [
    { label: "DASHBOARD", link: "/user_profile" },
    { label: "SEARCH", link: "/search" },
    { label: "NOTIFICATIONS", link: "/notification" },
    { label: "SETTINGS", link: "/setting" },
  ];
  const theme = useMantineTheme();
  const [opened2, setOpened] = useState(false);
  const [opened3, setOpene3] = useState(false);
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);
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
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const handelAdd = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .post(
        URL + "support",
        {
          title: values.title,
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
        form.reset();
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Ticket didnt added ",
        });
      });
  };

  return (
    <div>
      <div className={classes.header}>
        <img src={footerlogo} width={180} />
        <Group spacing={5} className={classes.links}>
          {items}
          <Button
            onClick={() => setOpene3(true)}
            radius="xl"
            size="xs"
            color="orange"
            sx={{ height: 30 }}
          >
            Log Out
          </Button>
          <Button
            onClick={() => setOpened(true)}
            radius="xl"
            size="xs"
            color="orange"
            sx={{ height: 30 }}
          >
            Support
          </Button>
          <Modal
            opened={opened2}
            onClose={() => setOpened(false)}
            title="Add your support question"
          >
            <form onSubmit={form.onSubmit((values) => handelAdd(values))}>
              <TextInput
                label="Title"
                mt={5}
                required
                placeholder="Title"
                {...form.getInputProps("title")}
              />
              <Textarea
                label="Description"
                mt={5}
                required
                placeholder="Description"
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

          <Modal opened={opened3} onClose={() => setOpene3(false)}>
            <Text size="sm">
              This action is so important that you are required to confirm
              logout. Please click one of these buttons to proceed.
            </Text>

            <Button
              radius="md"
              mt="xl"
              type="button"
              variant="outline"
              size="md"
              onClick={() => {
                setOpene3(false);
              }}
            >
              Cancel
            </Button>

            <Button
              radius="md"
              mt="xl"
              ml={25}
              type="submit"
              size="md"
              color="orange"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Confirm
            </Button>
          </Modal>
        </Group>
      </div>
      {children}
    </div>
  );
}
