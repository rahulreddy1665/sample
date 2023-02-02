import {
  Button,
  Card,
  Container,
  createStyles,
  Group,
  Drawer,
  Menu,
  NativeSelect,
  Pagination,
  Center,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Dots,
  Pencil,
  Search,
  Trash,
  ChevronUp,
  Selector,
} from "tabler-icons-react";
import BreadCrumb from "../../../Components/Admin/BreadCrumbs/Breadcrumbs";
import { Check, X } from "tabler-icons-react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone";
import { CloudUpload } from "tabler-icons-react";
import { useModals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
// For bulk upload convert excel file to json
import readXlsxFile from "read-excel-file";
import excel from "../../../assets/excel.png";
// For bulk upload convert excel file to json
// Pdf Exports and Xl export
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import "jspdf-autotable";
import pdf from "../../../assets/pdf.png";
// Css function
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
    fontFamily: "Cairo",
    paddingRight: 10,
    paddingTop: 4,
    fontSize: 14,
  },
  striped: {
    tbody: {
      border: "1px solid rgba(180, 180, 180,0.5)",
      fontFamily: "Cairo",
    },
    "thead tr th": {
      border: "1px solid rgba(180, 180, 180,0.5)",
      fontFamily: "Cairo",
      fontSize: "13px",
      padding: "10px",
    },

    "tbody tr td": {
      border: "1px solid rgba(180, 180, 180,0.5)",
      fontFamily: "Cairo",
      fontSize: "12px",
      padding: "12px",
    },
    "tbody tr:nth-of-type(odd)": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
    wrapper: {
      position: "relative",
      marginBottom: 30,
    },

    dropzone: {
      borderWidth: 1,
      paddingBottom: 50,
    },

    icon: {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[4],
    },

    control: {
      position: "absolute",
      width: 250,
      left: "calc(50% - 125px)",
      bottom: -20,
    },
    wrapper: {
      position: "relative",
      marginBottom: 30,
    },

    dropzone: {
      borderWidth: 1,
      paddingBottom: 50,
    },

    icon: {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[4],
    },

    control: {
      position: "absolute",
      width: 250,
      left: "calc(50% - 125px)",
      bottom: -20,
    },
  },
}));

// For table header sorting style write
function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      {typeof sorted !== "undefined" ? (
        <>
          <UnstyledButton onClick={onSort} className={classes.control}>
            <Group position="apart">
              <Text weight={500} size="sm">
                {children}
              </Text>
              <Center className={classes.icon}>
                <Icon size={12} />
              </Center>
            </Group>
          </UnstyledButton>
        </>
      ) : (
        <UnstyledButton className={classes.control}>
          <Text weight={500} size="sm">
            {children}
          </Text>
        </UnstyledButton>
      )}
    </th>
  );
}

// For Search table data
function filterData(data, search) {
  const keys = Object.keys(data[0]);
  const query = search.toString().toLowerCase().trim();
  return data.filter((item) =>
    keys.some((key) => {
      if (key !== "id") {
        if (item[key] !== null && item[key] !== "") {
          return item[key].toString().toLowerCase().includes(query);
        }
      }
    })
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

function getActiveColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.black;
}

export default function Designations() {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [DISTRICT] = useState(process.env.REACT_APP_DISTRICT_URL); // District Url is imported from .env file
  const [token] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const openRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    // for fetching the data of districts
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      await axios
        .get(URL + "designation", config)
        .then((response) => {
          setData(response.data);
          let datas = response.data;
          datas = datas.slice(0, 5);
          setSortedData(datas);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);
  // Adding Designation values
  const handleForm = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .post(
        URL + "designation",
        {
          name: values.designation,
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
          title: "Designation added successfully",
        });

        form.reset();
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Designation didnt added ",
        });
      });
  };
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filename, setFilename] = useState("");
  const [openedEdit, setOpenedEdit] = useState(false);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [URLFILE, setURLFILE] = useState(process.env.REACT_APP_FILE);
  const modals = useModals();
  // search function
  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setPage(1);
    var datas = sortData(data, {
      sortBy,
      reversed: reverseSortDirection,
      search: value,
    });
    datas = datas.slice(
      (activePage - 1) * total,
      (activePage - 1) * total + total
    );
    setSortedData(datas);
  };
  const [activePage, setPage] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [total, setTotal] = useState(5);

  // For bulk import
  const [openedBulk, setOpenedBulk] = useState(false);
  const [bulkData, setBulkData] = useState([]);
  // Bulk import                                                                                 Bulk import
  const onDownload = () => {
    const link = document.createElement("a");
    link.href = URLFILE + "designation.xlsx";
    link.click();
  };

  //For delete confirm modal show                                               Delete
  const handleModal = (e) => {
    modals.openConfirmModal({
      title: "Do you want to delete this designation",
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
    // Main axios part for deleting data to backend  unit data
    axios
      .delete(URL + "designation/" + e, config)
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
        datas = datas.filter((img) => img.id !== e);
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

  const handleEdit = (e) => {
    var datas = data.find((img) => img.id === e);
    setDeleteIndex(e);
    form.setFieldValue("designation", datas.name);
    setOpenedEdit(true);
  };

  const handleEdits = (values) => {
    // Set config of token
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Main axios part for sending data to backend editing unit data
    axios
      .post(
        URL + "edit_designation",
        {
          name: values.designation,
          id: deleteIndex,
        },
        config
      )
      .then((response) => {
        // For set edited data to table array
        const edit_index = data.findIndex((img) => img.id === deleteIndex);
        data[edit_index].name = values.designation;
        // Set loading effect animation
        updateNotification({
          id: "load-data2",
          color: "teal",
          title: "Data Updated",
          message: "Unit Data Updated Successfully",
          icon: <Check />,
        });
      })
      .catch((error) => {
        // Set loading effect animation
        updateNotification({
          id: "load-data2",
          color: "red",
          title: "Data Update Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };

  // table
  const rows = sortedData.map((row, index) => {
    return (
      <tr key={row.id}>
        <td>{activePage * total - total + index + 1}</td>

        <td>{row.name}</td>

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
              onClick={() => handleEdit(row.id)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              icon={<Trash size={14} color="red" />}
              onClick={() => handleModal(row.id)}
            >
              Delete
            </Menu.Item>
          </Menu>
        </td>
      </tr>
    );
  });

  //for sorting thead data
  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    var datas = sortData(data, { sortBy: field, reversed, search });
    datas = datas.slice(
      (activePage - 1) * total,
      (activePage - 1) * total + total
    );
    setSortedData(datas);
  };

  // Pagination rows per page function
  const handlePerpage = (e) => {
    var number = Number(e.currentTarget.value);
    setTotal(number);
    setPage(1);
    var datas = data;
    datas = datas.slice((1 - 1) * number, (1 - 1) * number + number);
    setSortedData(datas);
  };

  // Pagination function
  const handlePagination = (e) => {
    var number = Number(e);
    setPage(number);
    var datas = data;
    datas = datas.slice((number - 1) * total, (number - 1) * total + total);
    setSortedData(datas);
  };
  const [opened, setOpened] = useState(false);
  // form values
  const form = useForm({
    initialValues: {
      designation: "",
    },

    validate: (values) => ({
      designation: values.designation.length < 2 ? "Too short name" : null,
    }),
  });

  // Bulk upload
  const bulkFile789 = (event) => {
    let xlsxfile = event.target.files ? event.target.files[0] : null;
    setFilename(event.target.files[0].path);
    var data = [];
    readXlsxFile(xlsxfile).then((rows) => {
      data = rows;
      setBulkData(data);
    });

    openRef.current.value = "";
  };

  const BulkDataUpload = () => {
    showNotification({
      loading: true,
      id: "load-data1",
      title: `Bulk Uploading...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    if (bulkData.length <= 1) {
      updateNotification({
        id: "load-data1",
        color: "red",
        title: "Bulk Upload data Error",
        icon: <X />,
      });
    } else {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      axios
        .post(
          URL + "designation_bulk",
          {
            data_list: bulkData,
          },
          config
        )
        .then((response) => {
          updateNotification({
            id: "load-data1",
            color: "green",
            title: "Bulk Upload data Successfully",
            icon: <Check />,
          });
          // setLoaded(true);
          navigate("/save", { state: { from: "/designation" } });
        })
        .catch((error) => {
          updateNotification({
            id: "load-data1",
            color: "red",
            title: "Bulk Upload data Error",
            icon: <X />,
          });
          // setLoaded(true);
        });
    }
  };

  //   Settings the product excel key names for header                                                   Bulk Export
  const [headers, setHeaders] = useState([{ label: "Name", key: "name" }]);

  //   geenrating pdf file for downloading the data with header defines
  const print = () => {
    const doc = new jsPDF();
    var body = [...data.map((el) => [el.name])];
    doc.autoTable({
      head: [["Name"]],
      body: body,
    });
    doc.save("Designation.pdf");
  };
  const theme = useMantineTheme();

  return (
    <div>
      <BreadCrumb Text="Designation" Title="Settings" titleLink="/Settings" />
      <Container>
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
              <Group spacing="xs">
                <Text>Exports :</Text>
                <CSVLink
                  data={data}
                  headers={headers}
                  filename="District.csv"
                  style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    cursor: "pointer",
                    paddingTop: 5,
                  }}
                >
                  <img
                    src={excel}
                    alt=""
                    width="25"
                    style={{ margin: "2px" }}
                  />
                </CSVLink>
                <button
                  style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    borderStyle: "none",
                    cursor: "pointer",
                    paddingTop: 2,
                  }}
                  onClick={print}
                >
                  <img src={pdf} alt="" width="19" style={{ margin: "2px" }} />
                </button>
                <Button
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  onClick={() => setOpened(true)}
                >
                  Add Designation
                </Button>
              </Group>
            </div>
            <Table
              horizontalSpacing="md"
              verticalSpacing="xs"
              sx={{ tableLayout: "fixed", minWidth: 600 }}
              className={classes.striped}
            >
              <thead>
                <tr>
                  <Th>Id</Th>
                  <Th
                    sorted={sortBy === "name"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("name")}
                  >
                    Name
                  </Th>
                  <Th>Actions</Th>
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
      </Container>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Designation"
        // transition="slide-left"
        // transitionDuration={100}
        // transitionTimingFunction="ease"
        position="right"
        padding="xl"
        size={440}
      >
        <form onSubmit={form.onSubmit((values) => handleForm(values))}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <Button
              variant="outline"
              color="orange"
              onClick={() => {
                setOpenedBulk(true);
                setOpened(false);
              }}
            >
              Bulk Import
            </Button>
          </div>
          <TextInput
            label="Designation"
            mt={5}
            required
            value={form.values.designation}
            placeholder="Designation"
            {...form.getInputProps("designation")}
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
            Add Designation
          </Button>
        </form>
      </Drawer>

      <Drawer
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        title="Edit Designation"
        // transition="slide-left"
        // transitionDuration={100}
        // transitionTimingFunction="ease"
        position="right"
        padding="xl"
        size={440}
      >
        <form onSubmit={form.onSubmit((values) => handleEdits(values))}>
          <TextInput
            label="Designation"
            mt={5}
            required
            value={form.values.designation}
            placeholder="Designation"
            {...form.getInputProps("designation")}
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
            Update Designation
          </Button>
        </form>
      </Drawer>
      {/* Data Bulk form*/}
      <Drawer
        opened={openedBulk}
        onClose={() => setOpenedBulk(false)}
        title="Designation Bulk Import"
        padding="xl"
        size="md"
        position="right"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div></div>

          <div
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              cursor: "pointer",
              paddingTop: 5,
              display: "flex",
            }}
          >
            <Text>Download Template:</Text>
            <img
              src={excel}
              alt=""
              width="25"
              onClick={onDownload}
              style={{ margin: "2px" }}
            />
          </div>
        </div>
        <div className={classes.wrapper}>
          <Dropzone
            openRef={openRef}
            onDrop={() => {}}
            className={classes.dropzone}
            radius="md"
            mt={20}
            accept={[MIME_TYPES.xlsx]}
            onChange={bulkFile789}
            maxSize={30 * 1024 ** 2}
          >
            {(status) => (
              <div style={{ pointerEvents: "none" }}>
                <Group position="center">
                  <CloudUpload
                    size={50}
                    color={getActiveColor(status, theme)}
                  />
                </Group>
                <Text
                  align="center"
                  weight={700}
                  size="lg"
                  mt="xl"
                  sx={{ color: getActiveColor(status, theme) }}
                >
                  {status.accepted
                    ? "Drop files here"
                    : status.rejected
                    ? "Pdf file less than 30mb"
                    : "Upload Designation"}
                </Text>
                {filename != "" ? (
                  <Text align="center">{filename}</Text>
                ) : (
                  <Text align="center" size="sm" mt="xs" color="dimmed">
                    Drag&apos;n&apos;drop files here to upload. We can accept
                    only <i>.png</i> files that are less than 10mb in size.
                  </Text>
                )}
              </div>
            )}
          </Dropzone>
          <Button
            fullWidth
            radius="md"
            mt="xl"
            onClick={() => {
              BulkDataUpload();
            }}
            size="md"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            Upload
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
