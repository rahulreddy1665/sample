import {
  ActionIcon,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Drawer,
  Grid,
  Group,
  Image,
  Menu,
  NativeSelect,
  NumberInput,
  Pagination,
  PasswordInput,
  ScrollArea,
  Select,
  Paper,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme,
  Avatar,
  Modal,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
// For bulk upload convert excel file to json
// Pdf Exports and Xl export
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DatePicker } from "@mantine/dates";

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useCallback,
} from "react";
import { CSVLink } from "react-csv";
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
  CloudUpload,
  Database,
  Man,
  Woman,
} from "tabler-icons-react";
import excel from "../../../assets/excel.png";
import pdf from "../../../assets/pdf.png";
import BreadCrumb from "../../../Components/Admin/BreadCrumbs/Breadcrumbs";
import { useModals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dropzone,
  DropzoneStatus,
  MIME_TYPES,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import ImageGallery from "react-image-gallery";

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

export default function Reported() {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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
  const modals = useModals();
  const [activePage, setPage] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [total, setTotal] = useState(5);
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [openedEdit, setOpenedEdit] = useState(false);

  useEffect(() => {
    // for fetching the data of districts
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      await axios
        .get(URL + "support", config)
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
    };

    fetchData();
  }, []);

  const [openViewImage, setOpenViewImage] = useState(false);

  const [loopDate, setLoopData] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const handleViewImageCancel = () => {
    setOpenViewImage(false);
  };
  const handleViewImage = (e) => {
    console.log(e);
    setViewImage(e);
    setOpenViewImage(true);
  };

  const rows = sortedData.map((row, index) => {
    return (
      <tr key={row.name}>
        <td>{index + 1}</td>
        <td>{row.ticketId}</td>
        <td>{row.title}</td>
        <td>{row.description}</td>

        {row.user.image !== null ? (
          <td
            style={{ cursor: "pointer" }}
            onClick={() => handleViewImage(row.user.image.split(",")[0])}
          >
            <Group spacing="sm">
              <Avatar
                src={PROFILE + row.user.image.split(",")[0]}
                size={30}
                radius={30}
              />
              {row.user.ref_id} <br />
              {row.user.label}
            </Group>
          </td>
        ) : (
          <td>
            <Group spacing="sm">
              {row.user.ref_id} <br /> {row.user.label}
            </Group>
          </td>
        )}

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
            <Menu.Item
              icon={<Pencil size={14} color="red" />}
              onClick={() => handleView(row.value)}
            >
              View
            </Menu.Item>
            <Menu.Item
              icon={<Trash size={14} color="red" />}
              onClick={() => handleModal(row.value)}
            >
              Delete
            </Menu.Item>
          </Menu>
        </td>
      </tr>
    );
  });
  const handleModal = (e) => {
    modals.openConfirmModal({
      title: "Do you want to delete this Ticket",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handelDelete(e),
    });
  };
  const editform = useForm({
    initialValues: {
      title: "",
      description: "",
      chat: [],
      user: "",
    },
  });

  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  const handleView = (e) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .get(URL + "support", config)
      .then((response) => {
        var second = response.data.data;

        var datas = second.find((img) => img.value === e);
        setDeleteIndex(e);
        console.log(datas);
        editform.setFieldValue("chat", datas.support_charts);
        editform.setFieldValue("user", datas.user);
        editform.setFieldValue("title", datas.title);

        editform.setFieldValue("description", datas.description);

        setOpenedEdit(true);
      })
      .catch((error) => {
        console.log("error", error);
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
  const handelMessage = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .post(
        URL + "chart2",
        {
          message: values.message,
          id: deleteIndex,
        },
        config
      )
      .then((response) => {
        form.reset();
        console.log(response.data);
        setData(response.data.data);
        let datas = response.data.data;
        datas = datas.slice(0, 5);
        setSortedData(datas);
        var second = response.data.data;
        var datas2 = second.find((img) => img.value === deleteIndex);
        editform.setFieldValue("chat", datas2.support_charts);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handelDelete = (e) => {
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
    // Main axios part for deleting  gotra data
    axios
      .delete(URL + "support/" + e, config)
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
  return (
    <div>
      <BreadCrumb Text="Reported" Title="Support" />
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
          </div>
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            sx={{ tableLayout: "fixed", minWidth: 600 }}
            className={classes.striped}
          >
            <thead>
              <tr>
                <th>slno</th>
                <th>Ticket Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Raised By</th>
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
      <Drawer
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        title="View Report"
        position="right"
        padding="xl"
        size={440}
      >
        {editform.values.user !== "" ? (
          <>
            {editform.values.user.image !== null ? (
              <Text size="sm">
                <Group spacing="sm">
                  <Avatar
                    src={PROFILE + editform.values.user.image.split(",")[0]}
                    size={30}
                    radius={30}
                  />
                  {editform.values.user.ref_id} <br />
                  {editform.values.user.label}
                </Group>
              </Text>
            ) : (
              <Text size="sm">
                <Group spacing="sm">{editform.values.user.label}</Group>
              </Text>
            )}

            <Text size="sm" mt={10}>
              <b>Title:</b> {editform.values.title}
            </Text>

            <Text size="sm" mt={10}>
              <b>Description:</b> {editform.values.description}
            </Text>

            <div className="chart_width">
              {editform.values.chat.map((data) => (
                <>
                  {data.role == "User" ? (
                    <div>
                      <Paper
                        withBorder
                        mt={10}
                        shadow="xs"
                        p={5}
                        style={{ maxWidth: 300 }}
                      >
                        <Text size="sm">{data.message}</Text>
                      </Paper>
                      <Text size="xs" color="dimmed">
                        {new Date(data.date).toLocaleDateString("en-GB")}{" "}
                        {new Date(data.date).toLocaleTimeString("en-GB")}
                      </Text>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Paper
                          withBorder
                          mt={10}
                          shadow="xs"
                          p={5}
                          mr={5}
                          style={{ maxWidth: 350 }}
                        >
                          <Text size="sm">{data.message}</Text>
                        </Paper>
                      </div>
                      <Text
                        size="xs"
                        mr={5}
                        color="dimmed"
                        style={{ textAlign: "right" }}
                      >
                        {new Date(data.date).toLocaleDateString("en-GB")}{" "}
                        {new Date(data.date).toLocaleTimeString("en-GB")}
                      </Text>
                    </>
                  )}
                </>
              ))}
            </div>
          </>
        ) : null}
        <form onSubmit={form.onSubmit((values) => handelMessage(values))}>
          <TextInput
            label="Message"
            mt={5}
            required
            placeholder="Message"
            {...form.getInputProps("message")}
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
            Send
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
