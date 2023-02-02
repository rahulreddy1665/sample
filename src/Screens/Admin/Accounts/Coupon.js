import {
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Drawer,
  Group,
  Menu,
  NativeSelect,
  NumberInput,
  Pagination,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
// For bulk upload convert excel file to json
// Pdf Exports and Xl export
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useRef, useState } from "react";
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
} from "tabler-icons-react";
import excel from "../../../assets/excel.png";
import pdf from "../../../assets/pdf.png";
import BreadCrumb from "../../../Components/Admin/BreadCrumbs/Breadcrumbs";
import { useModals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mantine/dates";
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

export default function Coupon() {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [data, setData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(0); // for id

  let navigate = useNavigate();
  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      // For get all the coupon data list
      await axios
        .get(URL + "coupon", config)
        .then((response) => {
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
  // Adding Coupon values
  const handleCouponAdd = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // For Adding Coupon values backend url
    axios
      .post(
        URL + "coupon",
        {
          label: values.name,
          code: values.code,
          discountprice: values.price,
          from: values.from,
          to: values.to,
          limit: values.limit,
        },
        config
      )
      .then((response) => {
        var datas = response.data.data;
        setData(datas);
        datas = datas.slice(0, total);
        setPage(1);
        setSortedData(datas);
        showNotification({
          color: "green",
          icon: <Check />,
          title: "Coupon added successfully",
        });
        form.reset();
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Coupon didnt added ",
        });
      });
  };
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
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
  const [total, setTotal] = useState(5);

  //For delete confirm modal show                                               Delete
  const handleModal = (e) => {
    modals.openConfirmModal({
      title: "Do you want to delete this Coupon",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleCoupondelete(e),
    });
  };

  //   For delete db data from table
  const handleCoupondelete = (e) => {
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
      .delete(URL + "coupon/" + e, config)
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
        setData([...datas]);
        datas = datas.slice(
          (activePage - 1) * total,
          (activePage - 1) * total + total
        );
        setSortedData([...datas]);
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

  // Edit function for Coupon
  const handleEdit = (e) => {
    var datas = data.find((img) => img.value === e);
    setDeleteIndex(e);
    editform.setFieldValue("name", datas.label);
    editform.setFieldValue("code", datas.code);
    editform.setFieldValue("price", datas.discountprice);
    editform.setFieldValue("from", new Date(datas.from));
    editform.setFieldValue("to", new Date(datas.to));
    editform.setFieldValue("limit", Number(datas.limit));
    setOpenedEdit(true);
  };

  const handleCouponEdits = (values) => {
    // Notifications / Snackbar
    showNotification({
      loading: true,
      id: "load-data2",
      title: `Updating...`,
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
    // Edit the coupon data
    // Main axios part for sending data to backend editing Coupon data
    axios
      .patch(
        URL + "coupon",
        {
          label: values.name,
          code: values.code,
          discountprice: values.price,
          value: deleteIndex,
          from: values.from,
          to: values.to,
          limit: values.limit,
        },
        config
      )
      .then((response) => {
        // For set edited data to table array
        const edit_index = data.findIndex((img) => img.value === deleteIndex);
        data[edit_index].label = values.name;
        data[edit_index].code = values.code;
        data[edit_index].price = values.price;
        data[edit_index].from = values.from;
        data[edit_index].to = values.to;
        data[edit_index].limit = values.limit;
        // Set loading effect animation
        updateNotification({
          id: "load-data2",
          color: "teal",
          title: "Data Updated",
          message: "Coupon Data Updated Successfully",
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
  // For show all tha data in table data
  const rows = sortedData.map((row, index) => {
    return (
      <tr key={row.id}>
        <td>{activePage * total - total + index + 1}</td>

        <td>{row.label}</td>
        <td>{row.code}</td>
        <td>{row.discountprice}</td>
        <td>{new Date(row.createdAt).toLocaleDateString("en-GB")}</td>
        <td>{new Date(row.updatedAt).toLocaleDateString("en-GB")}</td>
        {/* For action dropdown edit and delete */}
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
              onClick={() => handleEdit(row.value)}
            >
              Edit
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

  // Coupon form values
  const form = useForm({
    initialValues: {
      name: "",
      code: "",
      price: 0,
      from: new Date(),
      to: new Date(),
      limit: 0,
    },

    validate: (values) => ({
      name: values.name.length < 2 ? "Too short name" : null,
    }),
  });

  // Coupon editform values
  const editform = useForm({
    initialValues: {
      name: "",
      code: "",
      price: 0,
      from: new Date(),
      to: new Date(),
      limit: 0,
    },

    validate: (values) => ({
      name: values.name.length < 2 ? "Too short name" : null,
    }),
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

  // Coupon function
  const handlePagination = (e) => {
    var number = Number(e);
    setPage(number);
    var datas = data;
    datas = datas.slice((number - 1) * total, (number - 1) * total + total);
    setSortedData(datas);
  };
  const [opened, setOpened] = useState(false);

  //   Settings the product excel key names for header                                                   Bulk Export
  const [headers, setHeaders] = useState([
    { label: "Name", key: "name" },
    { label: "Code", key: "code" },
    { label: "price", key: "discountprice" },
  ]);

  //   geenrating pdf file for downloading the data with header defines   PDF Export
  const print = () => {
    const doc = new jsPDF();
    var body = [...data.map((el) => [el.name, el.code, el.discountprice])];
    doc.autoTable({
      head: [["Coupon Name", "Code", "Price"]],
      body: body,
    });
    doc.save("Coupon.pdf");
  };
  return (
    <div>
      <BreadCrumb Text="Coupons" Title="Accounts" />
      <Container size={1300}>
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
                  filename="Coupon.csv"
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
                  Add Coupon
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
                  <Th>Code</Th>
                  <Th>Price</Th>
                  <Th>Added On</Th>
                  <Th>Updated On</Th>
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
      {/* Adding Coupon */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Coupon"
        // transition="slide-left"
        // transitionDuration={100}
        // transitionTimingFunction="ease"
        position="right"
        padding="xl"
        size={440}
      >
        {/* For adding new coupon data  */}
        <form onSubmit={form.onSubmit((values) => handleCouponAdd(values))}>
          <TextInput
            label="Name"
            mt={5}
            required
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Code"
            mt={5}
            required
            placeholder="Code"
            {...form.getInputProps("code")}
          />
          <NumberInput
            label="Discount Percentage"
            mt={5}
            required
            placeholder="Discount Percentage"
            {...form.getInputProps("price")}
          />
          {/* From and to date range */}
          <DatePicker
            label="From Date"
            mt={5}
            required
            value={form.values.from}
            onChange={(e) => form.setFieldValue("from", e)}
          />
          <DatePicker
            label="To Date"
            mt={5}
            required
            value={form.values.to}
            onChange={(e) => form.setFieldValue("to", e)}
          />
          {/* for enter the data rate */}
          <NumberInput
            label="Limit"
            mt={5}
            required
            placeholder="Limit"
            {...form.getInputProps("limit")}
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
            Add Coupon
          </Button>
        </form>
      </Drawer>

      {/* Edit Form */}
      <Drawer
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        title="Edit Coupon"
        position="right"
        padding="xl"
        size={440}
      >
        {/* For update the coupon data */}
        <form
          onSubmit={editform.onSubmit((values) => handleCouponEdits(values))}
        >
          <TextInput
            label="Name"
            mt={5}
            required
            placeholder="Name"
            {...editform.getInputProps("name")}
          />
          <TextInput
            label="Code"
            mt={5}
            required
            placeholder="Code"
            {...editform.getInputProps("code")}
          />
          <NumberInput
            label="Discount Percentage"
            mt={5}
            required
            placeholder="Discount Percentage"
            {...editform.getInputProps("price")}
          />
          {/* For edit from date and to date */}
          <DatePicker
            label="From Date"
            mt={5}
            required
            value={editform.values.from}
            onChange={(e) => editform.setFieldValue("from", e)}
          />
          <DatePicker
            label="To Date"
            mt={5}
            required
            value={editform.values.to}
            onChange={(e) => editform.setFieldValue("to", e)}
          />
          <NumberInput
            label="Limit"
            mt={5}
            required
            placeholder="Limit"
            {...editform.getInputProps("limit")}
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
            Update Coupon
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
