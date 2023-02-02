import {
  Anchor,
  Card,
  Center,
  Avatar,
  createStyles,
  Group,
  NativeSelect,
  Button,
  Menu,
  Pagination,
  ScrollArea,
  Table,
  Space,
  Text,
  TextInput,
  UnstyledButton,
  PasswordInput,
  Drawer,
  NumberInput,
  Modal,
  Box,
} from "@mantine/core"; // For import the mantine core
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash,
  Home,
  Search,
  Selector,
  Dots,
  UserX,
  Check,
  X,
} from "tabler-icons-react"; // For import the icons list
import BreadCrumb from "../../../Components/Admin/BreadCrumbs/Breadcrumbs";
import images from "../../../assets/images.jpg";
import { useForm } from "@mantine/form";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { useModals } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
  pagination: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[0]
        : theme.colors.dark[6],
    fontFamily: "Poppins",
    paddingRight: 10,
    paddingTop: 4,
    fontSize: 14,
  },
  striped: {
    tbody: {
      border: "1px solid rgba(180, 180, 180,0.5)",
      fontFamily: "Poppins",
    },
    "thead tr th": {
      border: "1px solid rgba(180, 180, 180,0.5)",
      fontFamily: "Poppins",
    },

    "tbody tr td": {
      border: "1px solid rgba(180, 180, 180,0.5)",
      fontFamily: "Poppins",
    },
    "tbody tr:nth-of-type(odd)": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
    "tbody tr:hover , table tr:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.orange[0],
    },
  },
}));

const items = [
  { title: "Home", href: "/", icons: Home },
  { title: "Subscribers", href: "#" },
  { title: "ActiveUsers", href: "#" },
].map((item, index) => (
  <Anchor
    href={item.href}
    key={index}
    sx={(theme) => ({
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[3]
          : theme.colors.dark[6],
      fontFamily: "Poppins",
      fontSize: 14,
    })}
  >
    {item.title}
  </Anchor>
));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();

  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

// For Search table data
function filterData(data, search) {
  const keys = Object.keys(data[0]);
  const query = search.toString().toLowerCase().trim();
  return data.filter((item) =>
    keys.some((key) => item[key].toString().toLowerCase().includes(query))
  );
}

// For sorting down data by its name
function sortData(data, payload) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }
      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search
  );
}

export default function ActiveUsers() {
  useEffect(() => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // For get all the active users list
    axios
      .get(URL + "active_users", config)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
        let datas = response.data.data;
        datas = datas.slice(0, 5);
        setSortedData(datas);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  const modals = useModals();
  const modals2 = useModals();
  const { classes, theme } = useStyles();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const ref = useRef(null);
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, setOpened] = useState(false);
  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    var datas = sortData(data, { sortBy: field, reversed, search });
    datas = datas.slice((total - 1) * total, (total - 1) * total + total);
    setSortedData(datas);
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setPage(1);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const [activePage, setPage] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [total, setTotal] = useState(5);
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const form = useForm({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      name: "",
      date: "",
      package: "",
    },

    validate: (values) => ({
      name: values.name.length < 2 ? "Too short name" : null,
      package:
        values.package.length < 5 ? "Please enter valid package name" : null,
      phone:
        values.phone.length < 10 ? "Please enter a valid phone number" : null,
      email: values.email.match(regex) ? null : "Please enter a valid email",
    }),
  });

  const [openViewImage, setOpenViewImage] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const handleViewImageCancel = () => {
    setOpenViewImage(false);
  };
  const handleViewImage = (e) => {
    console.log(e);
    setViewImage(e);
    setOpenViewImage(true);
  };

  // For view the table data for active users only
  const rows = sortedData.map((row, index) => {
    return (
      <tr key={row.label}>
        <td>{index + 1}</td>
        {row.image !== null ? (
          <td onClick={() => handleViewImage(row.image.split(",")[0])}>
            <Group spacing="sm">
              <Avatar
                src={PROFILE + row.image.split(",")[0]}
                size={30}
                radius={30}
              />
              {row.label}
            </Group>
          </td>
        ) : (
          <td>
            <Group spacing="sm">{row.label}</Group>
          </td>
        )}

        <td>{row.email}</td>
        {row.package != null ? <td>{row.package.label}</td> : <td>-</td>}
        {/* Action dropdown list for suspend and block */}
        <td>
          <Menu
            shadow="sm"
            size="md"
            control={
              <UnstyledButton style={{ marginLeft: 10 }} size="xs">
                <Dots color="orange" />
              </UnstyledButton>
            }
          >
            <Menu.Item
              icon={<UserX size={14} color="red" />}
              onClick={() => handleModalSuspend(row.value)}
            >
              Suspend
            </Menu.Item>
            <Menu.Item
              icon={<X size={14} color="red" />}
              onClick={() => handleModalBlock(row.value)}
            >
              Block
            </Menu.Item>
          </Menu>
        </td>
      </tr>
    );
  });

  const handleModalSuspend = (e) => {
    modals.openConfirmModal({
      title: "Do you want to suspend this User",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleSuspend(e),
    });
  };
  const handleModalBlock = (e) => {
    modals2.openConfirmModal({
      title: "Do you want to block this User",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleBlock(e),
    });
  };

  const handleSuspend = (e) => {
    // Set notification of saving  effects
    showNotification({
      loading: true,
      id: "load-data",
      title: `Deleting...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Main axios part for deleting data to backend User data
    axios
      .post(
        URL + "suspended_users",
        {
          value: e,
        },
        config
      )
      .then((response) => {
        // Set notification of delted  effects
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Deleted",
          message: "Data deleted successfully",
          icon: <Check />,
        });
        var datas = data;
        datas = datas.filter((img) => img.value !== e);
        setData(datas);
        setPage(1);
        datas = datas.slice(0, 5);
        setSortedData(datas);
      })
      .catch((error) => {
        // Set notification of  error  effects
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Data Delete Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };

  const handleBlock = (e) => {
    // Set notification of saving  effects
    showNotification({
      loading: true,
      id: "load-data",
      title: `Deleting...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Main axios part for deleting data to backend User data
    axios
      .post(
        URL + "blocked_users",
        {
          value: e,
        },
        config
      )
      .then((response) => {
        // Set notification of delted  effects
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Deleted",
          message: "Data deleted successfully",
          icon: <Check />,
        });
        var datas = data;
        datas = datas.filter((img) => img.value !== e);
        setData(datas);
        setPage(1);
        datas = datas.slice(0, 5);
        setSortedData(datas);
      })
      .catch((error) => {
        // Set notification of  error  effects
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Data Delete Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };

  const handlePerpage = (e) => {
    var number = Number(e.currentTarget.value);
    setTotal(number);
    setPage(1);
    var datas = data;
    datas = datas.slice((1 - 1) * number, (1 - 1) * number + number);
    setSortedData(datas);
  };

  const handlePagination = (e) => {
    var number = Number(e);
    setPage(number);
    var datas = data;
    datas = datas.slice((number - 1) * total, (number - 1) * total + total);
    setSortedData(datas);
  };
  return (
    <div>
      <LoadingBar color="#FF9248" ref={ref} />
      <BreadCrumb Text="Active Users" Title="Subscribers" />
      <Space h="md" />
      <Card shadow="sm" p="lg" mt={20}>
        <ScrollArea>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextInput
              placeholder="Search by any field"
              mb="md"
              icon={<Search size={14} />}
              value={search}
              onChange={handleSearchChange}
              sx={{ width: 250 }}
            />
            {/* <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              onClick={() => setOpened(true)}
            >
              Add Subscriber
            </Button> */}
          </div>
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            sx={{ tableLayout: "fixed", minWidth: 600 }}
            className={classes.striped}
          >
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Package</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 15,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text size="sm" className={classes.pagination}>
              Per Page
            </Text>
            <NativeSelect
              onChange={(event) => handlePerpage(event)}
              data={["5", "10", "20", "50", "100"]}
              rightSectionWidth={20}
              sx={{ width: 70 }}
            />
          </div>
          <Pagination
            page={activePage}
            onChange={handlePagination}
            total={Math.ceil(data.length / total)}
            color="orange"
          />
        </div>
      </Card>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add User"
        // transition="slide-left"
        // transitionDuration={100}
        // transitionTimingFunction="ease"
        position="right"
        padding="xl"
        size={440}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Group>
            <TextInput
              label="Username"
              required
              placeholder="Name"
              {...form.getInputProps("name")}
            />

            <NumberInput
              label="Date of Joining"
              required
              placeholder="Date of Joining"
              {...form.getInputProps("date")}
            />
            <TextInput
              label="Email"
              required
              placeholder="example@mail.com"
              {...form.getInputProps("email")}
            />
            <NumberInput
              label="Phone Number"
              required
              placeholder="Phone number"
              {...form.getInputProps("phone")}
            />
          </Group>
          <PasswordInput
            label="Password"
            required
            placeholder="Password"
            mt={10}
            {...form.getInputProps("password")}
          />

          <PasswordInput
            mt="sm"
            required
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />
          <NativeSelect
            data={["React", "Vue", "Angular", "Svelte"]}
            placeholder="Pick one"
            label="Select Your Package"
            mt={20}
            required
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
            Add Subscriber
          </Button>
        </form>
      </Drawer>

      <Modal
        opened={openViewImage}
        onClose={() => handleViewImageCancel(false)}
      >
        <Box>
          <div style={{ textAlign: "center" }}>
            <img src={PROFILE + viewImage} alt="maps" width="100%" />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
