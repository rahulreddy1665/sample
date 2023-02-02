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
  control2: {
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
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

export default function Package() {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [data, setData] = useState([]);
  const [marriage, setMarriage] = useState([]);
  const [gotra, setGotra] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArray2, setImagesArray2] = useState([]);
  const [rashi, setRashi] = useState([]);
  const [nakshathra, setNakshathra] = useState([]);
  const [nakshathraEdit, setNakshathraEdit] = useState([]);
  const [packages, setPackage] = useState([]);

  const [education, setEducation] = useState([]);
  const [subCast, setSubcast] = useState([]);
  const [educationType, setEducationType] = useState([]);
  const [educationTypeEdit, setEducationTypeEdit] = useState([]);
  const [sect, setSect] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(0); // for id

  const images_gallery = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  let navigate = useNavigate();
  useEffect(() => {
    // for fetching the data of User
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      // For get all the users data list
      await axios
        .get(URL + "user_all", config)
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

      await axios
        .get(URL + "marriageType", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setMarriage(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "gotra", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setGotra(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "rashi", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setRashi(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "package", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
            validity: data.validity.toString(),
            price: data.price.toString(),
            strike: data.strike.toString(),
          }));
          setPackage(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "sub_cast", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setSubcast(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "education", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setEducation(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });

      await axios
        .get(URL + "education_type", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setEducationType(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "sect", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setSect(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "nakshatra", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setNakshathra(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);

  // Adding User values
  const handleUserAdd = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Add new user register throw admin
    axios
      .post(URL + "user_adding", { data: values, images: imagesArray }, config)
      .then((response) => {
        setImagesArray([]);
        var datas = response.data.data;
        setData(datas);
        datas = datas.slice(0, total);
        setPage(1);
        setSortedData(datas);
        showNotification({
          color: "green",
          icon: <Check />,
          title: "User added successfully",
        });
        form.reset();
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "User didnt added ",
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
      title: "Do you want to delete this Package",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handlePackagedelete(e),
    });
  };

  // Crop Image

  const openRef = useRef();
  const [image, setImage] = useState("");
  const [upImg, setUpImg] = useState("");
  const [cropConfig, setCropConfig] = useState({
    unit: "%",
    width: 50,
    aspect: 16 / 16,
  });
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    aspect: 16 / 16,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const ref = useRef();

  //   For delete db data from table
  const handlePackagedelete = (e) => {
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
      .delete(URL + "user/" + e, config)
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

  // Edit function for User
  const handleEdit = (e) => {
    var datas = data.find((img) => img.value === e);
    setDeleteIndex(e);
    editform.setFieldValue("label", datas.label);
    editform.setFieldValue("date_of_birth", new Date(datas.date_of_birth));
    console.log(typeof (Number(datas.height) * 30.48));
    editform.setFieldValue("height", Number(datas.height * 30.48));

    if (datas.marriage_type_id != null) {
      editform.setFieldValue(
        "marriage_type_id",
        datas.marriage_type_id.toString()
      );
    }

    editform.setFieldValue("email", datas.email);
    editform.setFieldValue("mother_tongue", datas.mother_tongue);
    editform.setFieldValue("phone_no", datas.phone_number);
    editform.setFieldValue("bride_groom", datas.bride_groom);
    editform.setFieldValue("address1", datas.address1);
    editform.setFieldValue("address2", datas.address2);
    editform.setFieldValue("account_created_by", datas.account_created_by);
    editform.setFieldValue("parent_name", datas.parent_name);
    editform.setFieldValue("pincode", Number(datas.pincode));
    editform.setFieldValue("city", datas.city);
    editform.setFieldValue("state", datas.state);
    editform.setFieldValue("country", datas.country);
    editform.setFieldValue("no_brothers", datas.no_brothers);
    editform.setFieldValue("no_brothers_married", datas.no_brothers_married);
    editform.setFieldValue("no_sisters_married", datas.no_sisters_married);
    editform.setFieldValue("no_sisters", datas.no_sisters);
    editform.setFieldValue("currently_working", datas.currently_working);
    editform.setFieldValue("working_in", datas.working_in);
    editform.setFieldValue("working_as", datas.working_as);
    editform.setFieldValue("salary_pa", datas.salary_pa);
    editform.setFieldValue("working_city", datas.working_city);
    editform.setFieldValue("residential", datas.residential);
    if (datas.gothra_id != null) {
      editform.setFieldValue("gothra_id", datas.gothra_id.toString());
    }
    if (datas.rashi_id != null) {
      editform.setFieldValue("rashi_id", datas.rashi_id.toString());
    }
    if (datas.nakshathra_id != null) {
      editform.setFieldValue("nakshathra_id", datas.nakshathra_id.toString());
    }
    if (datas.education_id != null) {
      editform.setFieldValue("education_id", datas.education_id.toString());
    }
    if (datas.sect_id != null) {
      editform.setFieldValue("sect_id", datas.sect_id.toString());
    }

    if (datas.education_type_id != null) {
      editform.setFieldValue(
        "education_type_id",
        datas.education_type_id.toString()
      );
    }
    if (datas.sub_cast_id != null) {
      editform.setFieldValue("sub_cast_id", datas.sub_cast_id.toString());
    }
    if (datas.package_id != null) {
      editform.setFieldValue("package_id", datas.package_id.toString());
    }

    if (datas.image != null && datas.image != "") {
      var image = datas.image.split(",");
      var array = [];
      for (let i = 0; i < image.length; i++) {
        array[i] = { count: i, images: image[i] };
      }
      setImagesArray2(array);
    } else {
      setImagesArray2([]);
    }
    setOpenedEdit(true);
  };

  const handleUserEdit = (values) => {
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
    // Main axios part for sending data to backend editing user data
    axios
      .post(
        URL + "user_update",
        {
          data: values,
          images: imagesArray,
          images2: imagesArray2,
          value: deleteIndex,
        },
        config
      )
      .then((response) => {
        // For set list data to table array

        var datas = response.data.data;
        setData([...datas]);
        datas = datas.slice(
          (activePage - 1) * total,
          (activePage - 1) * total + total
        );
        setSortedData([...datas]);
        // Set loading effect animation
        updateNotification({
          id: "load-data2",
          color: "teal",
          title: "Data Updated",
          message: "Package Data Updated Successfully",
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
  // For table data view of all the users list
  const rows = sortedData.map((row, index) => {
    return (
      <tr key={row.id}>
        <td>{activePage * total - total + index + 1}</td>
        <td>{row.ref_id}</td>
        <td>{row.phone_number}</td>
        {row.package_id != null ? <td>{row.package.label}</td> : <td>-</td>}

        <td>{new Date(row.createdAt).toLocaleDateString("en-GB")}</td>
        <td>{new Date(row.updatedAt).toLocaleDateString("en-GB")}</td>
        {/* Action button drop down for edit and delete users */}
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

  // Package form values
  const form = useForm({
    initialValues: {
      label: "",
      password: "",
      confirmPassword: "",
      date_of_birth: "",
      height: "",
      marriage_type_id: "",
      email: "",
      phone_no: "",
      bride_groom: "",
      address1: "",
      mother_tongue: "",
      address2: "",
      account_created_by: "",
      parent_name: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
      no_brothers: "",
      no_sisters: "",
      no_brothers_married: "",
      no_sisters_married: "",
      currently_working: "",
      working_in: "",
      working_as: "",
      salary_pa: "",
      working_city: "",
      residential: "",
      gothra_id: "",
      rashi_id: "",
      nakshathra_id: "",
      package_id: "",
      sub_cast_id: "",
      sect_id: "",
      education_id: "",
      education_type_id: "",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  // Package editform values
  const editform = useForm({
    initialValues: {
      label: "",
      password: "",
      confirmPassword: "",
      date_of_birth: "",
      height: "",
      marriage_type_id: "",
      email: "",
      phone_no: "",
      bride_groom: "",
      address1: "",
      mother_tongue: "",
      address2: "",
      account_created_by: "",
      parent_name: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
      no_brothers: "",
      no_sisters: "",
      no_brothers_married: "",
      no_sisters_married: "",
      currently_working: "",
      working_in: "",
      working_as: "",
      salary_pa: "",
      working_city: "",
      residential: "",
      gothra_id: "",
      rashi_id: "",
      nakshathra_id: "",
      package_id: "",
      sub_cast_id: "",
      sect_id: "",
      education_id: "",
      education_type_id: "",
    },
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

  //   Settings the product excel key names for header                                                   Bulk Export
  const [headers, setHeaders] = useState([
    { label: "Name", key: "name" },
    { label: "Validity", key: "validity" },
    { label: "price", key: "price" },
  ]);

  //   geenrating pdf file for downloading the data with header defines   PDF Export
  const print = () => {
    const doc = new jsPDF();
    var body = [...data.map((el) => [el.name, el.validity, el.price])];
    doc.autoTable({
      head: [["Package Name", "Validity", "Price"]],
      body: body,
    });
    doc.save("Package.pdf");
  };

  const rashiSelect = () => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Main axios part for getting subgroup data

    axios
      .get(URL + "nakshatra_list/" + form.values.rashi_id, config)
      .then((response) => {
        // Set get subgroup with group id
        var data = response.data.data;
        var clean = data.map((data) => ({
          ...data,
          value: data.value.toString(),
        }));
        setNakshathra(clean);
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

  const educationSelect = () => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Main axios part for getting subgroup data

    axios
      .get(URL + "education_type_list/" + form.values.education_id, config)
      .then((response) => {
        // Set get subgroup with group id
        var data = response.data.data;
        var clean = data.map((data) => ({
          ...data,
          value: data.value.toString(),
        }));
        setEducationType(clean);
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

  const castSelect = () => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    // Main axios part for getting subgroup data

    axios
      .get(URL + "sect_list/" + form.values.sub_cast_id, config)
      .then((response) => {
        // Set get subgroup with group id
        var data = response.data.data;
        var clean = data.map((data) => ({
          ...data,
          value: data.value.toString(),
        }));
        setSect(clean);
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

  const handelPincode = (e) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .get(URL + "pincode/" + e, config)
      .then((response) => {
        form.setFieldValue("state", response.data.State);
        form.setFieldValue("city", response.data.District);
        form.setFieldValue("pincode", response.data.Pincode);
      })
      .catch((error) => {});
  };

  //   for image croper
  const ref45 = useRef();
  const changeHandler = (e) => {
    console.log(e);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      ref.current.value = "";
    }
  };

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        blob.name = fileName;
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(blob);

        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImage(base64Image);
  }, [completedCrop]);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  const addImageArray = () => {
    console.log(image);
    if (imagesArray.length == 0) {
      var data = [{ count: 1, images: image }];
    } else {
      var data = [
        { count: imagesArray[imagesArray.length - 1].count + 1, images: image },
      ];
    }

    var datas = [...imagesArray, ...data];
    setImagesArray(datas);
  };
  const delteArrayImage = (e) => {
    var datas = imagesArray;
    datas = datas.filter((img) => img.count !== e);
    setImagesArray(datas);
    console.log(imagesArray);
  };
  const delteArrayImage2 = (e) => {
    var datas = imagesArray2;
    datas = datas.filter((img) => img.count !== e);
    setImagesArray2(datas);
    console.log(imagesArray);
  };
  const packageItem = forwardRef(
    ({ value, label, validity, price, strike }, ref) => (
      <div ref={ref}>
        <Group noWrap>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {validity}
          </Text>
          <Text size="xs" color="dimmed">
            {price}
          </Text>
        </Group>
      </div>
    )
  );

  return (
    <div>
      <BreadCrumb Text="Register User" />
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
                  filename="Package.csv"
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
                  onClick={() => {
                    setOpened(true);
                    setImagesArray([]);
                    setImage("");
                    setUpImg("");
                  }}
                >
                  Add User
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
                    User Id
                  </Th>
                  <Th>Phone No.</Th>
                  <Th>Package</Th>
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
      {/* Adding gender */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add User"
        // transition="slide-left"
        // transitionDuration={100}
        // transitionTimingFunction="ease"
        position="right"
        padding="xl"
        size={740}
      >
        {/* For adding new user data */}
        <form
          className="zc-overflow"
          onSubmit={form.onSubmit((values) => handleUserAdd(values))}
        >
          <Grid gutter="xs">
            <Grid.Col span={6}>
              <TextInput
                label="Full Name"
                mt={1}
                required
                placeholder="Full Name"
                {...form.getInputProps("label")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Date of birth"
                mt={1}
                placeholder="Date of Birth"
                {...form.getInputProps("date_of_birth")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Height"
                mt={1}
                step={0.1}
                precision={3}
                placeholder="Height"
                {...form.getInputProps("height")}
              />
            </Grid.Col>
            {/* For select the marriage type */}
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Select Marriage Type"
                searchable
                placeholder="Select Marriage Type"
                {...form.getInputProps("marriage_type_id")}
                data={marriage}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NumberInput
                label="Phone No."
                mt={1}
                required
                placeholder="Phone No."
                {...form.getInputProps("phone_no")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text weight={400} mt={1}>
                <Woman size={15} />
                Bride/
                <Man size={15} />
                Groom"
              </Text>

              <TextInput
                placeholder="Bride / Groom"
                {...form.getInputProps("bride_groom")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <TextInput
                label="Mother Tongue"
                mt={1}
                placeholder="Mother Tongue"
                {...form.getInputProps("mother_tongue")}
              />
            </Grid.Col>
            {/* Account created by whom */}
            <Grid.Col span={6}>
              {" "}
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Account Created By"
                mt={1}
                placeholder="Account Created By "
                {...form.getInputProps("account_created_by")}
                data={[
                  { value: "Self", label: "Self" },
                  { value: "Parent", label: "Parent" },
                  { value: "Guardian", label: "Guardian" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Parent Name / Guardian Name"
                mt={1}
                placeholder="Parent Name / Guardian Name"
                {...form.getInputProps("parent_name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <NumberInput
                label="Pincode"
                mt={1}
                placeholder="Pincode"
                onBlur={(e) => handelPincode(e.target.value)}
                {...form.getInputProps("pincode")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="City"
                mt={1}
                placeholder="City"
                {...form.getInputProps("city")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="State"
                mt={1}
                placeholder="State"
                {...form.getInputProps("state")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              {" "}
              <TextInput
                label="No of brothers"
                mt={1}
                placeholder="No of brothers"
                {...form.getInputProps("no_brothers")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <TextInput
                label="No of brothers married"
                mt={1}
                placeholder="No of brothers married"
                {...form.getInputProps("no_brothers_married")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <TextInput
                label="No of sisters"
                mt={1}
                placeholder="No of sisters"
                {...form.getInputProps("no_sisters")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="No of sisters married"
                mt={1}
                placeholder="No of sisters married"
                {...form.getInputProps("no_sisters_married")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Currently Working"
                mt={1}
                placeholder="Currently Working"
                {...form.getInputProps("currently_working")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Working In"
                mt={1}
                placeholder="Working In"
                {...form.getInputProps("working_in")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Working As"
                mt={1}
                placeholder="Working As"
                {...form.getInputProps("working_as")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Salary PA"
                mt={1}
                placeholder="Salary PA"
                {...form.getInputProps("salary_pa")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Working City"
                mt={1}
                placeholder="Working City"
                {...form.getInputProps("working_city")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <TextInput
                label="Residential"
                mt={1}
                placeholder="Residential"
                {...form.getInputProps("residential")}
              />
            </Grid.Col>
            {/* For select user details */}
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Gotra"
                mt={1}
                placeholder="Gotra "
                {...form.getInputProps("gothra_id")}
                data={gotra}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Rashi"
                mt={1}
                placeholder="Rashi "
                {...form.getInputProps("rashi_id")}
                data={rashi}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Nakshathra"
                mt={1}
                onDropdownOpen={rashiSelect}
                placeholder="Nakshathra "
                {...form.getInputProps("nakshathra_id")}
                data={nakshathra}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Education"
                mt={1}
                placeholder="Select Education "
                {...form.getInputProps("education_id")}
                data={education}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Sub-Cast"
                mt={1}
                placeholder="Select Sub-Cast "
                {...form.getInputProps("sub_cast_id")}
                data={subCast}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Sect"
                mt={1}
                onDropdownOpen={castSelect}
                placeholder="Select Sect "
                {...form.getInputProps("sect_id")}
                data={sect}
              />
            </Grid.Col>
            {/* For select the package */}
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Package"
                mt={1}
                placeholder="Select Package "
                {...form.getInputProps("package_id")}
                data={packages}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                label="Password"
                mt={1}
                required
                placeholder="Password"
                {...form.getInputProps("password")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <PasswordInput
                label="Confirm Password"
                mt={1}
                placeholder="Confirm Password"
                {...form.getInputProps("confirmPassword")}
              />
            </Grid.Col>
          </Grid>

          {/* for croper image upload*/}
          {upImg !== "" && upImg !== null ? (
            <>
              <ReactCrop
                ruleOfThirds={true}
                style={{ marginTop: 5 }}
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
              <div>
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                    marginBottom: 20,
                  }}
                />
              </div>
              <Group>
                <Button size="sm" onClick={addImageArray} radius="xl">
                  Upload this image
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() => {
                    setImage("");
                    setUpImg("");
                  }}
                  radius="xl"
                >
                  Cancel
                </Button>
              </Group>
            </>
          ) : (
            <div className={classes.wrapper} style={{ marginTop: 15 }}>
              <Dropzone
                ref={ref45}
                onChange={changeHandler}
                className={classes.dropzone}
                radius="md"
                accept={[IMAGE_MIME_TYPE]}
                maxSize={30 * 1024 ** 2}
              >
                {(status) => (
                  <div style={{ pointerEvents: "none" }}>
                    <Group position="center">
                      <CloudUpload size={50} />
                    </Group>
                    <Text align="center" weight={700} size="lg" mt="xl">
                      {status.accepted
                        ? "Drop files here"
                        : status.rejected
                        ? "Image file less than 10mb"
                        : "Upload Image"}
                    </Text>
                    <Text align="center" size="sm" mt="xs" color="dimmed">
                      Drag&apos;n&apos;drop files here to upload company logo.
                      We can accept only <i>.png</i> files that are less than
                      10mb in size. This logo will used for print invoice
                    </Text>
                  </div>
                )}
              </Dropzone>
            </div>
          )}
          <div mt={15}></div>
          <Grid pt={25}>
            {imagesArray.map((row, index) => (
              <Grid.Col span={4}>
                <Image width={"100%"} fit="contain" src={row.images}></Image>
                <ActionIcon
                  onClick={() => delteArrayImage(row.count)}
                  color="red"
                  style={{ marginTop: -30, marginLeft: 5 }}
                >
                  <Trash />
                </ActionIcon>
              </Grid.Col>
            ))}
          </Grid>
          <Button
            fullWidth
            radius="md"
            mt="xl"
            mb={35}
            type="submit"
            size="md"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            Add User
          </Button>
        </form>
      </Drawer>

      {/* Edit Form */}
      <Drawer
        opened={openedEdit}
        onClose={() => {
          setOpenedEdit(false);
          setImage("");
          setUpImg("");
          setImagesArray([]);
        }}
        title="Edit Package"
        position="right"
        padding="xl"
        size={740}
      >
        {/* For edit user data */}
        <form
          className="zc-overflow"
          onSubmit={editform.onSubmit((values) => handleUserEdit(values))}
        >
          <Grid gutter="xs">
            <Grid.Col span={6}>
              <TextInput
                label="Full Name"
                mt={1}
                required
                placeholder="Full Name"
                {...editform.getInputProps("label")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePicker
                mt={1}
                placeholder="Date of Birth"
                label="Date of birth"
                value={editform.date_of_birth}
                {...editform.getInputProps("date_of_birth")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Height"
                mt={1}
                step={0.1}
                precision={3}
                placeholder="Height"
                {...editform.getInputProps("height")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Select Marriage Type"
                searchable
                placeholder="Select Marriage Type"
                {...editform.getInputProps("marriage_type_id")}
                data={marriage}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                mt={1}
                required
                placeholder="Enter Email"
                {...editform.getInputProps("email")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Phone No."
                mt={1}
                required
                placeholder="Phone No."
                {...editform.getInputProps("phone_no")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <Text weight={400} mt={1}>
                <Woman size={15} />
                Bride/
                <Man size={15} />
                Groom"
              </Text>
              <TextInput
                placeholder="Bride / Groom"
                {...editform.getInputProps("bride_groom")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Mother Tongue"
                mt={1}
                placeholder="Mother Tongue"
                {...editform.getInputProps("mother_tongue")}
              />{" "}
            </Grid.Col>
            {/* For edit account details */}
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Account Created By"
                mt={1}
                placeholder="Account Created By "
                {...editform.getInputProps("account_created_by")}
                data={[
                  { value: "Self", label: "Self" },
                  { value: "Parent", label: "Parent" },
                  { value: "Guardian", label: "Guardian" },
                ]}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Parent Name"
                mt={1}
                placeholder="Parent Name"
                {...editform.getInputProps("parent_name")}
              />{" "}
            </Grid.Col>
            {/* On pincode add get the city and state name */}
            <Grid.Col span={6}>
              <NumberInput
                label="Pincode"
                mt={1}
                placeholder="Pincode"
                onBlur={(e) => handelPincode(e.target.value)}
                {...editform.getInputProps("pincode")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="City"
                mt={1}
                placeholder="City"
                {...editform.getInputProps("city")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="State"
                mt={1}
                placeholder="State"
                {...editform.getInputProps("state")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Country"
                mt={1}
                placeholder="Country"
                {...editform.getInputProps("country")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="No of brothers"
                mt={1}
                placeholder="No of brothers"
                {...editform.getInputProps("no_brothers")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="No of brothers married"
                mt={1}
                placeholder="No of brothers married"
                {...editform.getInputProps("no_brothers_married")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="No of sisters"
                mt={1}
                placeholder="No of sisters"
                {...editform.getInputProps("no_sisters")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="No of sisters married"
                mt={1}
                placeholder="No of sisters married"
                {...editform.getInputProps("no_sisters_married")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Currently Working"
                mt={1}
                placeholder="Currently Working"
                {...editform.getInputProps("currently_working")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Working In"
                mt={1}
                placeholder="Working In"
                {...editform.getInputProps("working_in")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Working As"
                mt={1}
                placeholder="Working As"
                {...editform.getInputProps("working_as")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Salary PA"
                mt={1}
                placeholder="Salary PA"
                {...editform.getInputProps("salary_pa")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Working City"
                mt={1}
                placeholder="Working City"
                {...editform.getInputProps("working_city")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Residential"
                mt={1}
                placeholder="Residential"
                {...editform.getInputProps("residential")}
              />{" "}
            </Grid.Col>
            {/* For select the gothra name */}
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Gotra"
                mt={1}
                placeholder="Gotra "
                {...editform.getInputProps("gothra_id")}
                data={gotra}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Rashi"
                mt={1}
                placeholder="Rashi "
                {...editform.getInputProps("rashi_id")}
                data={rashi}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Nakshathra"
                mt={1}
                onDropdownOpen={rashiSelect}
                placeholder="Nakshathra "
                {...editform.getInputProps("nakshathra_id")}
                data={nakshathra}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Education"
                mt={1}
                placeholder="Select Education "
                {...editform.getInputProps("education_id")}
                data={education}
              />{" "}
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Sub-Cast"
                mt={1}
                placeholder="Select Sub-Cast "
                {...editform.getInputProps("sub_cast_id")}
                data={subCast}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Sect"
                mt={1}
                onDropdownOpen={castSelect}
                placeholder="Select Sect "
                {...editform.getInputProps("sect_id")}
                data={sect}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                styles={{
                  hovered: { backgroundColor: "#fdf5ef" },
                  selected: {
                    color: "orange",
                    backgroundColor: "#fff0e6",
                  },
                }}
                classNames={{ selected: "zc_selected" }}
                label="Package"
                mt={1}
                placeholder="Select Package "
                {...editform.getInputProps("package_id")}
                data={packages}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                label="Password"
                mt={1}
                placeholder="Password"
                {...editform.getInputProps("password")}
              />{" "}
            </Grid.Col>
          </Grid>
          {/* for croper image adding addition images for user */}
          {upImg !== "" && upImg !== null ? (
            <>
              <ReactCrop
                ruleOfThirds={true}
                style={{ marginTop: 5 }}
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
              <div>
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                    marginBottom: 20,
                  }}
                />
              </div>
              <Group>
                <Button size="sm" onClick={addImageArray} radius="xl">
                  Upload this image
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setImage("");
                    setUpImg("");
                  }}
                  color="red"
                  radius="xl"
                >
                  Cancel
                </Button>
              </Group>
            </>
          ) : (
            <div className={classes.wrapper} style={{ marginTop: 15 }}>
              <Dropzone
                ref={ref45}
                onChange={changeHandler}
                className={classes.dropzone}
                radius="md"
                accept={[IMAGE_MIME_TYPE]}
                maxSize={30 * 1024 ** 2}
              >
                {(status) => (
                  <div style={{ pointerEvents: "none" }}>
                    <Group position="center">
                      <CloudUpload size={50} />
                    </Group>
                    <Text align="center" weight={700} size="lg" mt="xl">
                      {status.accepted
                        ? "Drop files here"
                        : status.rejected
                        ? "Image file less than 10mb"
                        : "Upload Image"}
                    </Text>
                    <Text align="center" size="sm" mt="xs" color="dimmed">
                      Drag&apos;n&apos;drop files here to upload company logo.
                      We can accept only <i>.png</i> files that are less than
                      10mb in size. This logo will used for print invoice
                    </Text>
                  </div>
                )}
              </Dropzone>
            </div>
          )}
          <div mt={15}></div>
          {/* View all the users added image and can be deletable if not requiered */}
          <Grid pt={25}>
            {imagesArray.map((row, index) => (
              <Grid.Col span={4}>
                <Image width={"100%"} fit="contain" src={row.images}></Image>
                <ActionIcon
                  onClick={() => delteArrayImage(row.count)}
                  color="red"
                  style={{ marginTop: -30, marginLeft: 5 }}
                >
                  <Trash />
                </ActionIcon>
              </Grid.Col>
            ))}
            {imagesArray2.length != 0 ? (
              <>
                {imagesArray2.map((row, index) => (
                  <Grid.Col span={4}>
                    <Image
                      width={"100%"}
                      fit="contain"
                      src={PROFILE + row.images}
                    ></Image>
                    <ActionIcon
                      onClick={() => delteArrayImage2(row.count)}
                      color="red"
                      style={{ marginTop: -30, marginLeft: 5 }}
                    >
                      <Trash />
                    </ActionIcon>
                  </Grid.Col>
                ))}
              </>
            ) : null}
          </Grid>
          <Button
            fullWidth
            radius="md"
            mt="xl"
            mb={35}
            type="submit"
            size="md"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            Update User
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
