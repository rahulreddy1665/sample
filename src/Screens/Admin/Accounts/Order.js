import {
  Button,
  Card,
  createStyles,
  Avatar,
  Group,
  Menu,
  NativeSelect,
  Pagination,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import images from "../../../assets/images.jpg";
import {
  ChevronDown,
  Dots,
  DotsVertical,
  Pencil,
  Search,
  Trash,
} from "tabler-icons-react";
import excel from "../../../assets/excel.png";
import pdf from "../../../assets/pdf.png";
import BreadCrumb from "../../../Components/Admin/BreadCrumbs/Breadcrumbs";

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

export default function Order() {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    {
      email: "rahulreddy1665@gmail.com",
      name: "Carbonss",
      company: "Zevcore",
      status: "hello",
    },
    { email: "N", name: "Nitrogen", company: "Zevcore", status: "hello" },
    { email: "Y", name: "Yttrium", company: "Zevcore", status: "hello" },
    { email: "Ba", name: "Barium", company: "Zevcore", status: "hello" },
    { email: "Ce", name: "Cerium", company: "Zevcore", status: "hello" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(() => {
          setData([
            {
              email: "rahulreddy1665@gmail.com",
              name: "Carbonss",
              company: "Zevcore",
              status: "hello",
              payment: "Completed",
            },
            {
              email: "N",
              name: "Nitrogen",
              company: "Zevcore",
              status: "hello",
              payment: "Pending",
            },
            {
              email: "Y",
              name: "Yttrium",
              company: "Zevcore",
              status: "hello",
              payment: "Completed",
            },
            {
              email: "Ba",
              name: "Barium",
              company: "Zevcore",
              status: "hello",
              payment: "Pending",
            },
            {
              email: "Ce",
              name: "Cerium",
              company: "Zevcore",
              status: "hello",
              payment: "Completed",
            },
          ]);
          var datas = [
            {
              email: "rahulreddy1665@gmail.com",
              name: "Carbonss",
              company: "Zevcore",
              status: "hello",
              payment: "Completed",
            },
            {
              email: "N",
              name: "Nitrogen",
              company: "Zevcore",
              status: "hello",
              payment: "Pending",
            },
            {
              email: "Y",
              name: "Yttrium",
              company: "Zevcore",
              status: "hello",
              payment: "Completed",
            },
            {
              email: "Ba",
              name: "Barium",
              company: "Zevcore",
              status: "hello",
              payment: "Pending",
            },
            {
              email: "Ce",
              name: "Cerium",
              company: "Zevcore",
              status: "hello",
              payment: "Completed",
            },
          ];
          datas = datas.slice(
            (activePage - 1) * total,
            (activePage - 1) * total + total
          );
          console.log(datas);
          setSortedData(datas);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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

  const rows = sortedData.map((row, index) => {
    return (
      <tr key={row.name}>
        <td>{index + 1}</td>
        <td>{row.email}</td>
        <td>
          <Group spacing="sm">
            <Avatar src={images} size={30} radius={30} />
            {row.name}
          </Group>
        </td>
        <td>{row.company}</td>
        <td style={{ color: row.payment === "Completed" ? "green" : "red" }}>
          {row.payment}
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
      <BreadCrumb Text="Orders" Title="Accounts" />
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
            {/* <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Add Order</Button> */}
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
                <th>Package Name</th>
                <th>User Name</th>
                <th>Ordered on</th>
                <th>Order Status</th>
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
    </div>
  );
}
