import {
  Anchor,
  Avatar,
  Button,
  Card,
  createStyles,
  Divider,
  Drawer,
  Paper,
  Grid,
  Group,
  Menu,
  Modal,
  NativeSelect,
  Pagination,
  ScrollArea,
  Table,
  Tabs,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
  ActionIcon,
  Image,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  ChevronDown,
  Dots,
  Pencil,
  Search,
  Trash,
  UserOff,
  UserX,
  Check,
  X,
} from "tabler-icons-react";
import { UserCheck } from "tabler-icons-react/dist/bundle";
import Batman from "../../assets/Batman.png";
import images from "../../assets/images.jpg";
import axios from "axios";
import { useModals } from "@mantine/modals";
import { updateNotification } from "@mantine/notifications";
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
    },
    "thead tr th": {
      border: "1px solid rgba(180, 180, 180,0.5)",
    },

    "tbody tr td": {
      border: "1px solid rgba(180, 180, 180,0.5)",
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
export default function Dashboard() {
  // For Styles
  const { classes } = useStyles();
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [search, setSearch] = useState("");
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  // const [data, setData] = useState([
  //   {
  //     email: "RahulReddy",
  //     name: "Carbonss",
  //     company: "13/12/2021",
  //     status: "Paid",
  //   },
  //   { email: "N", name: "Nitrogen", company: "21/05/2022", status: "Pending" },
  //   { email: "Y", name: "Yttrium", company: "21/05/2022", status: "Paid" },
  //   { email: "Ba", name: "Barium", company: "26/11/2022", status: "Pending" },
  //   { email: "Ce", name: "Cerium", company: "05/05/2022", status: "Paid" },
  // ]);
  const [data, setData] = useState([]);
  const [reminder, Setreminder] = useState([]);
  const [remindertoday, SetTodayreminder] = useState([]);
  const [sortedData, setSortedData] = useState(data);
  const [userCount, setUserCount] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [admin, setAdmin] = useState("");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const modals = useModals();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [remainder, setRemainder] = useState([]);
  const [support, setSupport] = useState([]);
  const [package_list, setPackageList] = useState([]);
  const [remainderToday, setRemainderToday] = useState([]);
  // For getting reminder data
  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      const config2 = {
        headers: {
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlJhaHVsIFJlZGR5IiwiaWF0IjoxNjUxNTY4MTI4fQ.YZlGL2Uwunu1plT0POsceKazPer-F3lZvQhevGvCqN4",
        },
      };
      await axios
        .get(URL + "package", config)
        .then((response) => {
          setPackageList(response.data.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "user_count", config)
        .then((response) => {
          setUserCount(response.data.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "user_login", config)
        .then((response) => {
          console.log(response.data);
          setAdmin(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });

      await axios
        .get(URL + "reminder", config)
        .then((response) => {
          var datas = response.data.data;
          setRemainder(datas);
        })
        .catch((error) => {
          showNotification({
            id: "load-data",
            color: "red",
            title: "Data Fetch Error",
            message:
              "Server not responding, Please try again after some time..",
            icon: <X />,
            autoclose: 6000,
            style: { borderRadius: 10 },
          });
        });
      await axios
        .get(URL + "reminder_today", config)
        .then((response) => {
          var datas = response.data.data;
          setRemainderToday(datas);
        })
        .catch((error) => {
          showNotification({
            id: "load-data",
            color: "red",
            title: "Data Fetch Error",
            message:
              "Server not responding, Please try again after some time..",
            icon: <X />,
            autoclose: 6000,
            style: { borderRadius: 10 },
          });
        });

      await axios
        .get(URL + "support", config)
        .then((response) => {
          var datas = response.data.data;
          setSupport(datas);
        })
        .catch((error) => {
          showNotification({
            id: "load-data",
            color: "red",
            title: "Data Fetch Error",
            message:
              "Server not responding, Please try again after some time..",
            icon: <X />,
            autoclose: 6000,
            style: { borderRadius: 10 },
          });
        });
    };

    fetchData();
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    var datas = sortData(data, { sortBy: field, reversed, search });
    datas = datas.slice((total - 1) * total, (total - 1) * total + total);
    setSortedData(datas);
  };

  // Search function
  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setPage(1);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };
  const [activePage, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [total, setTotal] = useState(5);
  const [deleteIndex, setDeleteIndex] = useState(0);

  //  Table rows
  const rows = sortedData.map((row, index) => {
    return (
      <tr key={row.name}>
        <td>{index + 1}</td>
        <td>
          <Anchor size="sm" onClick={(event) => event.preventDefault()}>
            {row.email}
          </Anchor>
        </td>
        <td>
          <Group spacing="sm">
            <Avatar src={images} size={30} radius={30} />
            {row.name}
          </Group>
        </td>
        <td>{row.company}</td>
        <td style={{ color: row.status === "Paid" ? "green" : "red" }}>
          {row.status}
        </td>
        <td>
          <Menu
            shadow="sm"
            size="xs"
            control={
              <UnstyledButton style={{ marginLeft: 10 }} size="xs">
                <Dots color="orange" />
              </UnstyledButton>
            }
          >
            <Menu.Item icon={<Pencil size={14} color="red" />}>Edit</Menu.Item>
            <Menu.Item icon={<Trash size={14} color="red" />}>Delete</Menu.Item>
          </Menu>
        </td>
      </tr>
    );
  });

  // Pagination
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
  //For Apex Line Charts
  const seriesArray = [
    {
      name: "Orders",
      data: [],
    },
  ];

  const [series, setSeries] = useState(seriesArray);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: false, // <== line to add
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      labels: {
        style: {
          colors: "#9e9e9e",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9e9e9e",
        },
      },
    },
    grid: {
      show: false,
      borderColor: "#9e9e9e",
    },
  });
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const dateform = useForm({
    initialValues: {
      name: "",
      date: new Date(),
      remindertime: new Date(),
      description: "",
    },

    validate: (values) => ({
      name: values.name.length < 2 ? "Too short name" : null,
    }),
  });

  // For adding reminder
  const Addreminder = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .post(
        URL + "reminders",
        {
          name: values.name,
          date: values.date,
          time: values.remindertime,
          description: values.description,
        },
        config
      )
      .then((response) => {
        var datas = data;
        datas = [...datas, response.data];
        setData(datas);
        datas = datas.slice(0, 5);
        setPage(1);
        setSortedData(datas);
        showNotification({
          color: "green",
          icon: <Check />,
          title: "Reminder added successfully",
        });
        dateform.reset();
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Reminder didnt added ",
        });
      });
  };

  // Reminder delete modal
  const DeleteReminder = (e) => {
    modals.openConfirmModal({
      title: "Do you want to delete this Reminder",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDeleteReminder(e),
    });
  };

  const handleDeleteReminder = (e) => {
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
    // Main axios part for deleting data to backend Coupon data
    axios
      .delete(URL + "reminders/" + e, config)
      .then((response) => {
        // Set notification of delted  effects
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Deleted",
          message: "Data deleted successfully",
          icon: <Check />,
        });

        dateform.reset();
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

  // Submit data to backend nodejs
  const handelAdd = (e) => {
    // Set notification of saving and loader effects
    setSubmitLoading(true);
    showNotification({
      loading: true,
      id: "load-data",
      title: `Saving...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });

    // Set config of token
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Main axios part for sending data to backend adding size data
    axios
      .post(
        URL + "reminder",
        {
          reminder: e.reminder,
          date: e.date,
          time: e.time,
        },
        config
      )
      .then((response) => {
        // For set added data to table array
        var datas = response.data.data;
        setRemainder(datas[0]);
        setRemainderToday(datas[1]);

        // Clear all fields
        form.reset();

        // Set loading effect animation
        setSubmitLoading(false);
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Save",
          message: "New Reminder Added Successfully",
          icon: <Check />,
        });
      })
      .catch((error) => {
        // Set loading effect animation
        setSubmitLoading(false);
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Data Save Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };

  const openConfirmModal = (e) => {
    setDeleteIndex(e);
    modals.openConfirmModal({
      title: "Do you want to delete this pawner value",

      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleConfirmDelete(e),
    });
  };

  //   For delete db data from table
  const handleConfirmDelete = (e) => {
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
    // Main axios part for deleting data to backend  pawner data
    axios
      .delete(URL + "reminder/" + e, config)
      .then((response) => {
        // Set notification of delted  effects
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Deleted",
          message: "Data deleted successfully",
          icon: <Check />,
        });
        var datas = response.data.data;
        setRemainder(datas[0]);
        setRemainderToday(datas[1]);
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
  const form = useForm({
    initialValues: {
      reminder: "",
      date: new Date(),
      time: new Date(),
    },
  });
  return (
    <div>
      <Grid>
        <Grid.Col xs={4}>
          <Grid>
            {/* Welcome Admin card */}
            <Grid.Col xs={12}>
              <Card shadow="sm" p="lg" withBorder>
                <Card.Section sx={{ backgroundColor: "#FCE2D2" }}>
                  <Grid>
                    <Grid.Col xs={5}>
                      <div style={{ flexDirection: "column", padding: 25 }}>
                        <Text color="orange">Welcome Back!</Text>
                        <Text color="orange">Admin</Text>
                      </div>
                    </Grid.Col>
                    {/* <Grid.Col xs={7}>
                     <img src={admin} style={{maxWidth:"100%",height:100}} />
                    </Grid.Col> */}
                  </Grid>
                </Card.Section>
                <Image
                  color="blue"
                  size={70}
                  sx={{ width: 100, marginTop: -22 }}
                  src={PROFILE + admin.image}
                />
                <Text pt={10}>{admin.label} </Text>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ marginRight: 20, marginLeft: 40 }}>
                    <Text style={{ textAlign: "center" }} size="xl">
                      -
                    </Text>
                    <Text size="md" color="dimmed">
                      Total Orders
                    </Text>
                  </div>
                  <div>
                    <Text style={{ textAlign: "center" }} size="xl">
                      -
                    </Text>
                    <Text size="md" color="dimmed">
                      Pending Orders
                    </Text>
                  </div>
                </div>
              </Card>
            </Grid.Col>
            {/* Packages card */}
            <Grid.Col xs={12}>
              <Card shadow="sm" p="lg" withBorder>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Packages</Text>
                  {/* <Button
                    variant="gradient"
                    size="xs"
                    gradient={{ from: "orange", to: "red" }}
                  >
                    Add Package
                  </Button> */}
                </div>
                <Divider my="sm" />
                <div
                  style={{
                    display: "flex",
                    marginTop: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text size="md">Package Name</Text>
                  <Text size="md">Package Validity</Text>
                </div>

                {package_list.map((row) => (
                  <div
                    style={{
                      display: "flex",
                      marginTop: 15,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text size="xs">{row.label}</Text>
                    <Text size="xs">{row.validity} Days </Text>
                  </div>
                ))}
              </Card>
            </Grid.Col>
            {/* Reminders card */}
            <Grid.Col xs={12}>
              <Card shadow="sm" p="lg" withBorder>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Reminders</Text>
                </div>

                <Tabs color="teal">
                  <Tabs.Tab label="Today" color="orange">
                    <div className="zc-reminder ">
                      {remainderToday.map((row, index) => (
                        <Paper shadow="sm" p="sm" withBorder radius="md" mt={5}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Text size="xs">{row.reminder}</Text>
                            </div>
                            <div>
                              <Text style={{ fontSize: 8 }}>
                                {new Date(row.date).toLocaleDateString("en-GB")}
                              </Text>
                              <Text style={{ fontSize: 8 }}>
                                {new Date(row.time).toLocaleTimeString("en-GB")}
                              </Text>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Text
                                size="xs"
                                color="red"
                                onClick={() => openConfirmModal(row.value)}
                              >
                                <Trash size={16} />
                              </Text>
                            </div>
                          </div>
                        </Paper>
                      ))}
                    </div>
                  </Tabs.Tab>

                  <Tabs.Tab label="All" color="orange">
                    <div className="zc-reminder ">
                      {remainder.map((row, index) => (
                        <Paper shadow="sm" p="sm" withBorder radius="md" mt={5}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Text size="xs">{row.reminder}</Text>
                            </div>
                            <div>
                              <Text style={{ fontSize: 8 }}>
                                {new Date(row.date).toLocaleDateString("en-GB")}
                              </Text>
                              <Text style={{ fontSize: 8 }}>
                                {new Date(row.time).toLocaleTimeString("en-GB")}
                              </Text>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Text
                                size="xs"
                                color="red"
                                onClick={() => openConfirmModal(row.value)}
                              >
                                <Trash size={16} />
                              </Text>
                            </div>
                          </div>
                        </Paper>
                      ))}
                    </div>
                  </Tabs.Tab>
                </Tabs>

                <button
                  class="anim-btn__button pt5"
                  style={{ marginTop: 25 }}
                  onClick={() => setOpened(true)}
                >
                  Add Reminder
                </button>
              </Card>
              {/* Modal for Adding Reminders */}
              <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add Reminders!"
                position="right"
                padding="xl"
                size={440}
              >
                <div>
                  <form onSubmit={form.onSubmit((values) => handelAdd(values))}>
                    <TextInput
                      required
                      value={form.values.name}
                      label="Reminder "
                      placeholder="Enter Reminder"
                      {...form.getInputProps("reminder")}
                    />
                    <DatePicker
                      label="Select Date"
                      value={form.values.date}
                      placeholder="Reminder Date"
                      {...form.getInputProps("date")}
                    />
                    <TimeInput
                      label="Select Date"
                      value={form.values.time}
                      format="12"
                      placeholder="Reminder Time"
                      {...form.getInputProps("time")}
                    />
                    <Group position="right" mt="md">
                      <button className="anim-btn__button" type="submit">
                        Submit
                      </button>
                    </Group>
                  </form>
                </div>
              </Drawer>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        {/* Col 8 for Right Grid */}
        <Grid.Col xs={8}>
          <Grid>
            {/* Active,Suspended & Blocked Users Card */}
            <Grid.Col xs={12}>
              <Grid>
                <Grid.Col xs={4}>
                  <Card shadow="sm" p="lg" withBorder>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flexDirection: "column", marginTop: 10 }}>
                        <Text>Active Users</Text>
                        <Text size="xl">{userCount[0]}</Text>
                      </div>
                      <Avatar color="green" radius="xl" size={70}>
                        <UserCheck size={36} />
                      </Avatar>
                    </div>
                  </Card>
                </Grid.Col>
                <Grid.Col xs={4}>
                  <Card shadow="sm" p="lg" withBorder>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flexDirection: "column", marginTop: 10 }}>
                        <Text>Suspended Users</Text>
                        <Text size="xl">{userCount[1]}</Text>
                      </div>
                      <Avatar color="red" radius="xl" size={70}>
                        <UserOff size={36} />
                      </Avatar>
                    </div>
                  </Card>
                </Grid.Col>
                <Grid.Col xs={4}>
                  <Card shadow="sm" p="lg" withBorder>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flexDirection: "column", marginTop: 10 }}>
                        <Text>Blocked Users</Text>
                        <Text size="xl">{userCount[3]}</Text>
                      </div>
                      <Avatar color="red" radius="xl" size={70}>
                        <UserX size={36} />
                      </Avatar>
                    </div>
                  </Card>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            {/* Orders by month chart card */}
            <Grid.Col xs={12}>
              <Grid>
                <Grid.Col xs={7}>
                  <Card shadow="sm" p="lg" withBorder>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text sx={{ fontSize: "16px" }}>Orders by month</Text>
                    </div>

                    <div id="chart">
                      <ReactApexChart
                        options={options}
                        series={series}
                        type="line"
                        height={350}
                        width="95%"
                      />
                    </div>
                  </Card>
                </Grid.Col>
                {/* Tickets (Support) Card */}
                <Grid.Col xs={5}>
                  <Card shadow="sm" p="lg" withBorder>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Tickets </Text>
                    </div>
                    <Divider my="sm" />
                    <ScrollArea
                      style={{ height: 339 }}
                      offsetScrollbars
                      scrollbarSize={4}
                    >
                      {support.map((row, index) => (
                        <Card mt={15} p="xs" shadow="sm" withBorder>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                            }}
                          >
                            {row.user.image !== null ? (
                              <Group spacing="sm">
                                <Avatar
                                  src={PROFILE + row.user.image.split(",")[0]}
                                  size={30}
                                  radius={30}
                                />
                                <Text size="xs">
                                  {row.user.ref_id} <br /> {row.user.label}
                                </Text>
                              </Group>
                            ) : (
                              <Group spacing="sm">
                                <Text size="xs">
                                  {row.user.ref_id} <br /> {row.user.label}
                                </Text>
                              </Group>
                            )}
                            {row.status == 0 ? (
                              <div style={{ padding: 10, borderRadius: 14 }}>
                                <Text color="green" size="xs">
                                  Open
                                </Text>
                              </div>
                            ) : (
                              <div style={{ padding: 10, borderRadius: 14 }}>
                                <Text color="red" size="xs">
                                  Close
                                </Text>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </ScrollArea>
                  </Card>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            {/* Latest Transaction Table*/}
            <Grid.Col xs={12}>
              <Card shadow="sm" p="lg">
                <ScrollArea>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>Latest Transactions</Text>
                    <TextInput
                      placeholder="Search by any field"
                      mb="md"
                      icon={<Search size={14} />}
                      value={search}
                      onChange={handleSearchChange}
                      sx={{ width: 250 }}
                    />
                    {/* <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Add Reported</Button> */}
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
                        <th>Name</th>
                        <th>Package</th>
                        <th>Date</th>
                        <th>Status</th>
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text size="sm" className={classes.pagination}>
                      Per Page
                    </Text>
                    <NativeSelect
                      onChange={(event) => handlePerpage(event)}
                      data={["5", "10", "20", "50", "100"]}
                      rightSection={<ChevronDown size={14} />}
                      rightSectionWidth={20}
                      sx={{ width: 70 }}
                    />
                  </div>
                  <Pagination
                    page={activePage}
                    onChange={handlePagination}
                    total={data.length / total}
                    color="orange"
                  />
                </div>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
