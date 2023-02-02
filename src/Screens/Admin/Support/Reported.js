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
        .get(URL + "report", config)
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
        <td>{row.report_for.ref_id}</td>
        {row.report_for.image !== null ? (
          <td
            style={{ cursor: "pointer" }}
            onClick={() => handleViewImage(row.report_for.image.split(",")[0])}
          >
            <Group spacing="sm">
              <Avatar
                src={PROFILE + row.report_for.image.split(",")[0]}
                size={30}
                radius={30}
              />
              {row.report_for.label}
            </Group>
          </td>
        ) : (
          <td>
            <Group spacing="sm">{row.report_for.label}</Group>
          </td>
        )}
        <td>{row.reports_by.ref_id}</td>
        {row.reports_by.image !== null ? (
          <td
            style={{ cursor: "pointer" }}
            onClick={() => handleViewImage(row.reports_by.image.split(",")[0])}
          >
            <Group spacing="sm">
              <Avatar
                src={PROFILE + row.reports_by.image.split(",")[0]}
                size={30}
                radius={30}
              />
              {row.reports_by.label}
            </Group>
          </td>
        ) : (
          <td>
            <Group spacing="sm">{row.reports_by.label}</Group>
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
              onClick={() => handleModal(row.value)}
              icon={<Trash size={14} color="red" />}
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
      title: "Do you want to delete this Report",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handelDelete(e),
    });
  };
  const editform = useForm({
    initialValues: {
      report_for: "",
      report_by: "",
      title: "",
      description: "",
    },
  });
  const handleView = (e) => {
    var datas = data.find((img) => img.value === e);
    setDeleteIndex(e);
    console.log(datas);
    editform.setFieldValue("report_for", datas.report_for);

    editform.setFieldValue("report_by", datas.reports_by);

    editform.setFieldValue("title", datas.title);
    editform.setFieldValue("description", datas.description);
    console.log(editform);
    setOpenedEdit(true);
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
      .delete(URL + "report/" + e, config)
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
            {/* <Button variant="gradient" gradient={{ from: "orange", to: "red" }}>
              Add Reported
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
                <th>slno</th>
                <th>Reported Profile Id</th>
                <th>Reported Profile Name</th>
                <th>Reported By Profile Id</th>
                <th>Reported By Profile Name</th>

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
        {editform.values.report_for !== "" ? (
          <>
            <Text size="lg" mt={10}>
              Reported By :
            </Text>
            <Text size="sm">User Id: {editform.values.report_by.ref_id}</Text>

            {editform.values.report_by.image !== null ? (
              <Text size="sm">
                <Group spacing="sm">
                  <Avatar
                    src={
                      PROFILE + editform.values.report_by.image.split(",")[0]
                    }
                    size={30}
                    radius={30}
                  />
                  {editform.values.report_by.label}
                </Group>
              </Text>
            ) : (
              <Text size="sm">
                <Group spacing="sm">{editform.values.report_by.label}</Group>
              </Text>
            )}

            <Text size="lg" mt={10}>
              Title :
            </Text>
            <Text size="sm">{editform.values.title}</Text>
            <Text size="lg" mt={10}>
              Description :
            </Text>
            <Text size="sm">{editform.values.description}</Text>

            <Text size="lg" mt={10}>
              Reported For :
            </Text>
            <Text size="sm">User Id: {editform.values.report_for.ref_id}</Text>

            {editform.values.report_for.image !== null ? (
              <Text size="sm">
                <Group spacing="sm">
                  <Avatar
                    src={
                      PROFILE + editform.values.report_for.image.split(",")[0]
                    }
                    size={30}
                    radius={30}
                  />
                  {editform.values.report_for.label}
                </Group>
              </Text>
            ) : (
              <Text size="sm">
                <Group spacing="sm">{editform.values.report_for.label}</Group>
              </Text>
            )}
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
