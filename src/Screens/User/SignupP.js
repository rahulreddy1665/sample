import {
  Anchor,
  Button,
  Container,
  createStyles,
  Group,
  Stepper,
  Radio,
  Paper,
  RadioGroup,
  Grid,
  Badge,
  Image,
  ActionIcon,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
  NumberInput,
  PasswordInput,
  ScrollArea,
  Box,
  Drawer,
} from "@mantine/core";
import pdf from "../../assets/pdf.png";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useCallback,
} from "react";

// import bg from './bg.svg';
import {
  Mail,
  BrandTwitter,
  BrandYoutube,
  BrandInstagram,
  Phone,
  MapPin,
  Sun,
  Check,
  CloudUpload,
  Trash,
  X,
} from "tabler-icons-react";
import logo from "../../assets/User/logo.png";
import contactbg from "../../assets/User/contactbg.png";
import { useForm } from "@mantine/form";
import footerlogo from "../../assets/User/footerlogo.png";
import Contact from "../../assets/User/Contact.png";
import LazyShow from "../../Components/User/LazyShow";
import Header from "../../Components/User/Header";
import axios from "axios";
import { showNotification, updateNotification } from "@mantine/notifications";
import Footers from "../../Components/User/Footer";
import { DatePicker } from "@mantine/dates";
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
import { authentication } from "./firebase-config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrappers: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },
    form: {
      boxSizing: "border-box",
      width: 700,
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },
    fields: {
      marginTop: -12,
    },
    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },
    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },
    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg - 2,
      // backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: theme.spacing.xl,
      flex: "0 0 280px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },
    titlessss: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Poppins`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },
    controls: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
    root: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      // backgroundAttachment: 'fixed',
      // minHeight: '500px',
      backgroundImage: `linear-gradient(to bottom, black, rgba(255,255,255,0)),  url(${Contact})`,
      paddingTop: theme.spacing.xl * 1,
      paddingBottom: theme.spacing.xl * 4,
    },
    root22: {
      position: "relative",
      zIndex: 1,
    },
    inner: {
      display: "flex",
      justifyContent: "space-between",
      [theme.fn.smallerThan("md")]: {
        flexDirection: "column",
      },
    },
    image: {
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },
    content: {
      paddingTop: theme.spacing.xl * 2,
      paddingBottom: theme.spacing.xl * 2,
      marginRight: theme.spacing.xl * 3,

      [theme.fn.smallerThan("md")]: {
        marginRight: 0,
      },
    },
    title: {
      color: theme.white,
      fontFamily: `Poppins`,
      fontWeight: 900,
      lineHeight: 1.05,
      maxWidth: 500,
      fontSize: 48,
      textAlign: "center",

      [theme.fn.smallerThan("md")]: {
        maxWidth: "100%",
        fontSize: 34,
        lineHeight: 1.15,
      },
    },
    control: {
      paddingLeft: 50,
      paddingRight: 50,
      fontFamily: `Poppins`,
      fontSize: 22,

      [theme.fn.smallerThan("md")]: {
        width: "100%",
      },
    },
    wrapper: {
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },

    titles: {
      fontFamily: `Poppins`,
      fontWeight: 900,
      fontSize: 25,
      marginBottom: theme.spacing.md,
      textAlign: "center",

      [theme.fn.smallerThan("sm")]: {
        fontSize: 28,
        textAlign: "left",
      },
      color: "black",
    },

    descriptions: {
      textAlign: "center",

      [theme.fn.smallerThan("sm")]: {
        textAlign: "left",
      },
    },
    footer: {
      marginTop: 120,
      paddingTop: theme.spacing.xl * 2,
      paddingBottom: theme.spacing.xl * 2,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
    },
    logo: {
      maxWidth: 400,
      marginLeft: 50,
      marginRight: "auto",
      [theme.fn.smallerThan("sm")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
    descriptions: {
      marginTop: 5,

      [theme.fn.smallerThan("sm")]: {
        marginTop: theme.spacing.xs,
        textAlign: "center",
      },
    },
    inner: {
      display: "flex",
      justifyContent: "space-between",

      [theme.fn.smallerThan("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    groups: {
      display: "flex",
      flexWrap: "wrap",
      marginRight: 50,

      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
    wrappers: {
      width: 220,
    },

    link: {
      display: "block",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[6],
      fontSize: theme.fontSizes.sm,
      paddingTop: 3,
      paddingBottom: 3,

      "&:hover": {
        textDecoration: "underline",
      },
    },
    titless: {
      fontSize: theme.fontSizes.lg,
      fontWeight: 700,
      marginBottom: theme.spacing.xs / 2,
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    afterFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: theme.spacing.xl,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,

      [theme.fn.smallerThan("sm")]: {
        flexDirection: "column",
      },
    },

    social: {
      [theme.fn.smallerThan("sm")]: {
        marginTop: theme.spacing.xs,
      },
    },
  };
});
export default function Signup() {
  const { classes, cx } = useStyles();
  const [otp, SetOtp] = useState(false);
  const [password, Setpassword] = useState(false);

  const footerdata = [
    {
      title: "MY ACCOUNT",
      links: [
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
      ],
    },
    {
      title: "LEGAL INFORMATION",
      links: [
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
      ],
    },
    {
      title: "CONTACT INFORMATION",
      links: [
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
      ],
    },
  ];

  const groups = footerdata.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrappers} key={group.title}>
        <Text className={classes.titless}>{group.title}</Text>
        {links}
      </div>
    );
  });

  const [marriage, setMarriage] = useState([]);
  const [gotra, setGotra] = useState([]);
  const params = useParams();
  const [rashi, setRashi] = useState([]);
  const [nakshathra, setNakshathra] = useState([]);
  const [education, setEducation] = useState([]);
  const [subCast, setSubcast] = useState([]);
  const [educationType, setEducationType] = useState([]);
  const [educationTypeEdit, setEducationTypeEdit] = useState([]);
  const [sect, setSect] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [country, setCountry] = useState("");
  const [imagesArray2, setImagesArray2] = useState([]);
  const [paymentWindow, setPaymentWindow] = useState(false);
  const [order, setOrder] = useState("");

  useEffect(() => {
    // for fetching the data of package
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      var queryParams = window.location.href;
      var payment_id = queryParams.split("=")[1];
      var payment_request_id = queryParams.split("=")[3];
      console.log(payment_request_id);
      console.log(payment_id.split("&")[0]);
      await axios
        .post(URL + "check_order", {
          payment_id: payment_id.split("&")[0],
          payment_request_id: payment_request_id,
        })
        .then((response) => {
          console.log(response.data.data.buyer_phone);
          form.setFieldValue(
            "phone_number",
            Number(response.data.data.buyer_phone)
          );
          setOrder(response.data.data);
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
      await axios
        .get("https://ipapi.co/json/")
        .then((response) => {
          let data = response.data;

          setCountry(data.country);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

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

  // Otp validation
  const handleOtp = () => {
    if (freezeOTP == false) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(form.values.otp)
        .then((result) => {
          const user = result.user;
          form.clearErrors();
          setFreezeOTP(true);
        })
        .catch((error) => {
          form.setFieldError("otp", "OTP Wrong");
        });
    }
  };

  // Password Validation
  const handlePassword = () => {
    if (form.values.password !== form.values.confirm) {
      form.setFieldError("confirm", "Password didn't match");
    } else {
      form.clearErrors();
    }
  };

  const [active, setActive] = useState(2);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      phone_number: "",
      phone_number_type: "0",
      email: "",
      otp: "",
      password: "",
      package_id: "",
      confirmPassword: "",

      label: "",
      address1: "",
      address2: "",
      pincode: "",
      state: "",
      city: "",
      parent_name: "",
      bride_groom: "",

      date_of_birth: new Date(),
      height: "",
      marriage_type_id: "",
      sub_cast_id: "",
      sect_id: "",
      gothra_id: "",
      rashi_id: "",
      nakshathra_id: "",
      no_brothers: "",
      no_brothers_married: "",
      no_sisters: "",
      no_sisters_married: "",
      education_id: "",
      education_type_id: "",
      mother_tongue: "",
      account_created_by: "",
      working_in: "",
      working_as: "",
      salary_pa: "",
      working_city: "",
      residential: "Indian",
      relocate: "No",
      currently_working: "",
      public_private: "Private",
    },

    // functions will be used to validate values at corresponding key
  });
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [PDFURL] = useState(process.env.REACT_APP_PDF_URL);
  const [token] = useState(localStorage.getItem("token"));
  const [otpSetup, SetOtpSetup] = useState(false);
  const [packages, setPackage] = useState([]);
  const [freezeOTP, setFreezeOTP] = useState(false);

  const handleNext = () => {};

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response);
        },
        "expired-callback": () => {
          console.log("error");
        },
      },
      authentication
    );
  };

  const handleRegister1 = (values) => {
    if (form.values.phone_number == "") {
      form.setFieldError(
        "phone_number",
        "Phone Number must have 10 characters"
      );
    } else {
      console.log(form.values.phone_number);
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      axios
        .post(
          URL + "register1",
          {
            phone_number: values.phone_number.slice(
              form.values.phone_number.length - 10
            ),
            email: values.email,
          },
          config
        )
        .then((response) => {
          var phone = form.values.phone_number;
          form.clearErrors();

          generateRecaptcha();

          var appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(authentication, phone, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              console.log(window.confirmationResult);
            })
            .catch((error) => {
              console.log(error);
            });
          SetOtpSetup(true);
        })
        .catch((error) => {
          showNotification({
            color: "red",
            icon: <X />,
            title: error.response.data.message,
          });
        });
    }
  };

  const handleRegister3 = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    if (values.password === values.confirmPassword) {
      axios
        .post(
          URL + "register3",
          {
            otp: values.otp,
            phone_number_type: values.phone_number_type,
            public_private: values.public_private,
            password: values.password,
            phone_number: values.phone_number.slice(
              form.values.phone_number.length - 10
            ),
          },
          config
        )
        .then((response) => {
          console.log(response.data);
          var datas = response.data.data;

          SetOtpSetup(true);
          setActive(1);
        })
        .catch((error) => {
          showNotification({
            color: "red",
            icon: <X />,
            title: "Error ",
          });
        });
    } else {
      form.setFieldError("confirmPassword", "Password does not match");
    }
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

  const handleRegister4 = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    if (values.package_id !== "") {
      axios
        .post(
          URL + "register4",
          {
            package_id: values.package_id,

            label: values.label,
            email: values.email,
            address1: values.address1,
            address2: values.address2,
            pincode: values.pincode,
            state: values.state,
            city: values.city,
            parent_name: values.parent_name,
            bride_groom: values.bride_groom,
            phone_number: values.phone_number.slice(
              form.values.phone_number.length - 10
            ),
          },
          config
        )
        .then((response) => {
          setActive(2);
        })
        .catch((error) => {
          showNotification({
            color: "red",
            icon: <X />,
            title: "Error ",
          });
        });
    } else {
      showNotification({
        color: "red",
        icon: <X />,
        title: "Please Select Package",
      });
    }
  };

  const handleRegister5 = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    console.log(form.values.phone_number);
    axios
      .post(
        URL + "register5",
        {
          phone_number: form.values.phone_number,
          date_of_birth: values.date_of_birth,
          height: values.height,
          marriage_type_id: values.marriage_type_id,
          sub_cast_id: values.sub_cast_id,
          sect_id: values.sect_id,
          gothra_id: values.gothra_id,
          rashi_id: values.rashi_id,
          nakshathra_id: values.nakshathra_id,
          no_brothers: values.no_brothers,
          no_brothers_married: values.no_brothers_married,
          no_sisters: values.no_sisters,
          no_sisters_married: values.no_sisters_married,
          education_id: values.education_id,
          education_type_id: values.education_type_id,
          mother_tongue: values.mother_tongue,
          account_created_by: values.account_created_by,
          working_in: values.working_in,
          working_as: values.working_as,
          salary_pa: values.salary_pa,
          working_city: values.working_city,
          residential: values.residential,
          relocate: values.relocate,
          currently_working: values.currently_working,
        },
        config
      )
      .then((response) => {
        setActive(3);
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Error ",
        });
      });
  };
  let navigate = useNavigate();
  const SubmitImage = () => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    showNotification({
      loading: true,
      id: "load-data",
      title: `Saving...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    axios
      .post(
        URL + "register7",
        {
          phone_number: form.values.phone_number,
          images: imagesArray,
        },
        config
      )
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("role", response.data.roles);
        localStorage.setItem("isAuthenticated", "true");
        if (response.data.roles == "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/user_profile");
        }
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Login Successfully",
          message: "Welcome To Vipra Bandhana :)",
          icon: <Check />,
        });
      })
      .catch((error) => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Login Successfully",
          message: "Error",
          icon: <X />,
        });
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

  //   for image croper
  const ref45 = useRef();
  const changeHandler = (e) => {
    console.log(e);
    if (imagesArray.length < 6) {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => setUpImg(reader.result));
        reader.readAsDataURL(e.target.files[0]);
        ref.current.value = "";
      }
    } else {
      showNotification({
        color: "red",
        icon: <X />,
        title: "You can't upload more than 6 images",
      });
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
    setImage("");
    setUpImg("");
    console.log(imagesArray);
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
  const payment = () => {
    setPaymentWindow(true);

    showNotification({
      loading: true,
      id: "load-data",
      title: `Saving...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    axios
      .post(URL + "payment")
      .then((response) => {
        console.log(response.data);
        var data = response.data.payment_request;
        // window.open(
        //   "https://www.google.com/",

        //   "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=0, resizable=0, width=580, height=600, top=30"
        // );
      })
      .catch((error) => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Login Successfully",
          message: "Error",
          icon: <X />,
        });
      });
  };
  const InvoiceDownload = () => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .post(URL + "order_invoice", {
        payment_id: order.payment_id,
      })
      .then((response) => {
        if (response.data == "success") {
          const link = document.createElement("a");
          link.href = PDFURL + "invoice.pdf";
          link.target = "_blank";
          link.download = "invoice.pdf";
          link.click();
          console.log(link);
        }
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Error ",
        });
      });
  };
  const [discountValue, setDiscountValue] = useState(0);
  const handelCoupon = (e) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .get(URL + "coupon/" + e, config)
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          form.setFieldError(
            "coupon",
            "The coupon code " + e + " is not valid"
          );
        } else {
          var data = response.data;
          var from = new Date(data.from);
          var to = new Date(data.to);
          var today = new Date();
          if (today >= from && today <= to) {
            if (data.total < data.limit) {
              setDiscountValue(data.discountprice);
            } else {
              form.setFieldError(
                "coupon",
                "The coupon code " + e + " is limit exceeded"
              );
            }
          } else {
            form.setFieldError(
              "coupon",
              "The coupon code " + e + " has expired"
            );
          }
        }
      })
      .catch((error) => {});
  };
  return (
    <>
      <Header />
      <div className={classes.root}>
        {/* Header Part */}
        <Container size="lg" sx={{ height: "1.3vh" }}></Container>
      </div>
      <Text size="xl" mt={40} className={classes.titles}>
        {" "}
        Registration
      </Text>
      {order.payment_status == "success" ? (
        <Container size="lg" p={20}>
          <Stepper
            active={active}
            color="orange"
            onStepClick={setActive}
            breakpoint="sm"
          >
            <Stepper.Step
              label="First step"
              description="Privacy Details"
              allowStepSelect={active == 0}
            >
              <Paper radius="sm" p={10} mt={5}>
                <form
                  onSubmit={form.onSubmit((values) => handleRegister1(values))}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "48%" }}>
                      <Text p={0} m={0}>
                        Phone number
                      </Text>
                      <PhoneInput
                        defaultCountry={country}
                        className="input_field"
                        placeholder="Enter phone number"
                        value={form.values.phone_number}
                        onChange={(e) => form.setFieldValue("phone_number", e)}
                      />
                    </div>
                  </div>
                  <div id="recaptcha-container"></div>

                  {otpSetup == false ? (
                    <Button mt={10} type="submit" color="orange">
                      Submit
                    </Button>
                  ) : null}
                </form>
                <Button mt={10} type="button" onClick={payment} color="orange">
                  Payment
                </Button>
                {otpSetup == true ? (
                  <>
                    <form
                      onSubmit={form.onSubmit((values) =>
                        handleRegister3(values)
                      )}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          marginTop: 10,
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ width: "48%" }}>
                          <TextInput
                            required
                            label="OTP"
                            placeholder="OTP"
                            readOnly={freezeOTP}
                            {...form.getInputProps("otp")}
                            onBlur={handleOtp}
                          />
                        </div>
                        <div style={{ width: "48%" }}>
                          <Select
                            styles={{
                              hovered: { backgroundColor: "#fdf5ef" },
                              selected: {
                                color: "orange",
                                backgroundColor: "#fff0e6",
                              },
                            }}
                            classNames={{ selected: "zc_selected" }}
                            label="Account Type (Public account will display for non-register users)"
                            placeholder="Account Type"
                            {...form.getInputProps("public_private")}
                            defaultValue={form.values.public_private}
                            data={[
                              { value: "Private", label: "Private" },
                              { value: "Public", label: "Public" },
                            ]}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          marginTop: 10,
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ width: "48%" }}>
                          <PasswordInput
                            required
                            label="Set Password"
                            placeholder="Set Password"
                            {...form.getInputProps("password")}
                            mb={10}
                          />
                        </div>
                        <div style={{ width: "48%" }}>
                          <PasswordInput
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            {...form.getInputProps("confirmPassword")}
                            onBlur={handlePassword}
                            mb={10}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          marginTop: 0,
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ width: "48%" }}>
                          <RadioGroup
                            label="Phone Visibility"
                            value={form.values.phone_number_type}
                            onChange={(e) => {
                              console.log(e);
                              form.setFieldValue("phone_number_type", e);
                            }}
                            required
                            pt={0}
                            mt={0}
                            mb={10}
                          >
                            <Radio value="1" label="Visible to all" />
                            <Radio value="0" label="On request" />
                          </RadioGroup>
                        </div>
                      </div>
                      {/* <Select
                 label="Select Package"
                 searchable
                 placeholder="Select Package"
                 {...form.getInputProps("package_id")}
                 data={packages}
               /> */}

                      <Button mt={10} type="submit" color="orange">
                        Submit
                      </Button>
                    </form>
                  </>
                ) : null}

                <div mt={25}></div>
              </Paper>
            </Stepper.Step>

            <Stepper.Step
              label="Second step"
              description="Profile Type"
              allowStepSelect={active == 1}
            >
              <Paper radius="sm" p={10}>
                <form
                  onSubmit={form.onSubmit((values) => handleRegister4(values))}
                >
                  <Grid>
                    <Grid.Col span={4}>
                      <TextInput
                        required
                        label="Full Name"
                        placeholder="Enter full name"
                        {...form.getInputProps("label")}
                        mb={10}
                      />
                    </Grid.Col>
                    {/* <Grid.Col span={4}>
               <TextInput
                 label="Address line 1"
                 placeholder="Address line 1"
                 {...form.getInputProps("address1")}
                 mb={10}
               />
             </Grid.Col>
             <Grid.Col span={4}>
               <TextInput
                 label="Address line 2"
                 placeholder="Address line 2"
                 {...form.getInputProps("address2")}
                 mb={10}
               />
             </Grid.Col> */}
                    <Grid.Col span={4}>
                      <NumberInput
                        required
                        label="Pincode"
                        mt={5}
                        placeholder="Pincode"
                        onBlur={(e) => handelPincode(e.target.value)}
                        {...form.getInputProps("pincode")}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <TextInput
                        required
                        label="State"
                        placeholder="Enter State"
                        {...form.getInputProps("state")}
                        mb={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <TextInput
                        required
                        label="City"
                        placeholder="Enter City"
                        {...form.getInputProps("city")}
                        mb={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        required
                        searchable
                        clearable
                        label="Select Bride/Groom"
                        placeholder="Pick one"
                        data={[
                          { value: "Bride", label: "Bride" },
                          { value: "Groom", label: "Groom" },
                        ]}
                        {...form.getInputProps("bride_groom")}
                      />
                    </Grid.Col>

                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        required
                        label="Account Created By"
                        mt={5}
                        placeholder="Account Created By "
                        {...form.getInputProps("account_created_by")}
                        data={[
                          { value: "Self", label: "Self" },
                          { value: "Parent", label: "Parent" },
                          { value: "Guardian", label: "Guardian" },
                        ]}
                      />
                    </Grid.Col>

                    <Grid.Col span={8}></Grid.Col>
                    {form.values.account_created_by == "Parent" ? (
                      <Grid.Col span={4}>
                        <TextInput
                          label="Parent Name"
                          placeholder="Parent Name"
                          {...form.getInputProps("parent_name")}
                          mb={10}
                        />
                      </Grid.Col>
                    ) : form.values.account_created_by == "Guardian" ? (
                      <Grid.Col span={4}>
                        <TextInput
                          label="Guardian Name"
                          placeholder="Guardian Name"
                          {...form.getInputProps("parent_name")}
                          mb={10}
                        />
                      </Grid.Col>
                    ) : null}
                  </Grid>
                  <p style={{ margin: 0 }}>
                    Select Package <span style={{ color: "red" }}>*</span>
                  </p>
                  <div class="plans">
                    {packages.map((row, index) => (
                      <label
                        className="plan basic-plan"
                        for={"target_id" + row.value}
                        onClick={(e) => {
                          form.setFieldValue("package_id", row.value);
                          console.log(row.value);
                        }}
                      >
                        <div
                          className={
                            form.values.package_id == row.value
                              ? "plan-content plan-selected"
                              : "plan-content"
                          }
                        >
                          <div className="plan-details">
                            <span
                              style={{
                                fontSize: 25,
                                fontWeight: 500,
                              }}
                            >
                              {row.label}
                            </span>
                            <p style={{ fontSize: 16 }}>{row.validity} days</p>
                          </div>

                          <div className="plan-details">
                            {row.price > 0 ? (
                              <>
                                <p>
                                  {" "}
                                  <del> &#x20b9; {row.strike}</del>
                                </p>
                                {discountValue > 0 ? (
                                  <>
                                    <p
                                      style={{
                                        fontSize: 20,
                                        fontWeight: 500,
                                        color: "black",
                                      }}
                                    >
                                      {" "}
                                      &#x20b9;{" "}
                                      {(
                                        row.strike -
                                        (row.strike * discountValue) / 100
                                      ).toFixed(0)}{" "}
                                      <Badge
                                        style={{ fontSize: "5px !important" }}
                                        size="xs"
                                        color="orange"
                                      >
                                        {discountValue}%
                                      </Badge>
                                    </p>
                                  </>
                                ) : (
                                  <p
                                    style={{
                                      fontSize: 20,
                                      fontWeight: 500,
                                      color: "black",
                                    }}
                                  >
                                    &#x20b9;
                                    {row.price}{" "}
                                    <Badge
                                      style={{ fontSize: "5px !important" }}
                                      size="xs"
                                      color="orange"
                                    >
                                      {(
                                        ((Number(row.strike) -
                                          Number(row.price - discountValue)) /
                                          Number(row.strike)) *
                                        100
                                      ).toFixed(0)}
                                      %
                                    </Badge>
                                  </p>
                                )}
                              </>
                            ) : (
                              <>
                                {discountValue > 0 ? (
                                  <>
                                    <p>
                                      {" "}
                                      <del> &#x20b9; {row.strike}</del>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: 20,
                                        fontWeight: 500,
                                        color: "black",
                                      }}
                                    >
                                      {" "}
                                      &#x20b9;{" "}
                                      {(
                                        row.strike -
                                        (row.strike * discountValue) / 100
                                      ).toFixed(0)}{" "}
                                      <Badge
                                        style={{ fontSize: "5px !important" }}
                                        size="xs"
                                        color="orange"
                                      >
                                        {discountValue}%
                                      </Badge>
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <br></br>
                                    <p
                                      style={{
                                        fontSize: 20,
                                        fontWeight: 500,
                                        color: "black",
                                      }}
                                    >
                                      {" "}
                                      &#x20b9; {row.strike}
                                    </p>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <input
                          checked={
                            form.values.package_id == row.value ? true : false
                          }
                          id={"target_id" + row.value}
                          value={row.value}
                          type="radio"
                          name={row.label}
                        />
                      </label>
                    ))}
                  </div>

                  <Button mt={10} type="submit" color="orange">
                    Submit
                  </Button>
                </form>
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label="Third step"
              description="Personal Details"
              allowStepSelect={active == 2}
            >
              <Paper radius="sm" p={10}>
                <form
                  onSubmit={form.onSubmit((values) => handleRegister5(values))}
                >
                  <Grid>
                    <Grid.Col span={4}>
                      <DatePicker
                        required
                        label="Date of Birth"
                        placeholder="Enter Date of Birth"
                        {...form.getInputProps("date_of_birth")}
                        mb={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <TextInput
                        required
                        onChange={(e) => {
                          var no = e.target.value;
                          no = (no / 30.48).toFixed(2);
                          form.setFieldValue("height", no);
                        }}
                        label={"Height" + " " + form.values.height + " ft"}
                        placeholder="Enter your height in cm"
                        mb={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        required
                        searchable
                        clearable
                        color="orange"
                        label="Marriage Type"
                        mb={10}
                        placeholder="Select Marriage Type"
                        data={marriage}
                        {...form.getInputProps("marriage_type_id")}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        required
                        searchable
                        label="Sub-Cast"
                        mt={5}
                        placeholder="Select Sub-Cast "
                        {...form.getInputProps("sub_cast_id")}
                        data={subCast}
                      />{" "}
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        searchable
                        label="Sect"
                        mt={5}
                        onDropdownOpen={castSelect}
                        placeholder="Select Sect "
                        {...form.getInputProps("sect_id")}
                        data={sect}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        searchable
                        label="Gotra"
                        mt={5}
                        placeholder="Gotra "
                        {...form.getInputProps("gothra_id")}
                        data={gotra}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        searchable
                        label="Rashi"
                        mt={5}
                        placeholder="Rashi "
                        {...form.getInputProps("rashi_id")}
                        data={rashi}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        searchable
                        label="Nakshathra"
                        mt={5}
                        onDropdownOpen={rashiSelect}
                        placeholder="Nakshathra "
                        {...form.getInputProps("nakshathra_id")}
                        data={nakshathra}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NumberInput
                        label="No of brothers"
                        mt={5}
                        placeholder="No of brothers"
                        {...form.getInputProps("no_brothers")}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NumberInput
                        label="No of brothers married"
                        mt={5}
                        placeholder="No of brothers married"
                        {...form.getInputProps("no_brothers_married")}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NumberInput
                        label="No of sisters"
                        mt={5}
                        placeholder="No of sisters"
                        {...form.getInputProps("no_sisters")}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NumberInput
                        label="No of sisters married"
                        mt={5}
                        placeholder="No of sisters married"
                        {...form.getInputProps("no_sisters_married")}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        searchable
                        required
                        clearable
                        label="Currently Working"
                        placeholder="Currently Working"
                        data={[
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" },
                        ]}
                        {...form.getInputProps("currently_working")}
                      />
                    </Grid.Col>

                    {form.values.currently_working == "Yes" ? (
                      <>
                        <Grid.Col span={4}>
                          <TextInput
                            label="Working In"
                            mt={5}
                            placeholder="Working In"
                            {...form.getInputProps("working_in")}
                          />
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <TextInput
                            label="Working As"
                            mt={5}
                            placeholder="Working As"
                            {...form.getInputProps("working_as")}
                          />
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <TextInput
                            label="Salary PA"
                            mt={5}
                            placeholder="Salary PA"
                            {...form.getInputProps("salary_pa")}
                          />
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <TextInput
                            label="Working City"
                            mt={5}
                            placeholder="Working City"
                            {...form.getInputProps("working_city")}
                          />
                        </Grid.Col>
                      </>
                    ) : null}

                    <Grid.Col span={4}>
                      <Select
                        styles={{
                          hovered: { backgroundColor: "#fdf5ef" },
                          selected: {
                            color: "orange",
                            backgroundColor: "#fff0e6",
                          },
                        }}
                        classNames={{ selected: "zc_selected" }}
                        searchable
                        required
                        label="Education"
                        mt={5}
                        placeholder="Select Education "
                        {...form.getInputProps("education_id")}
                        data={education}
                      />
                    </Grid.Col>

                    <Grid.Col span={4}>
                      <TextInput
                        required
                        label="Mother Tongue"
                        mt={5}
                        placeholder="Mother Tongue"
                        {...form.getInputProps("mother_tongue")}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <RadioGroup
                        mt={8}
                        value={form.values.residential}
                        onChange={(e) => form.setFieldValue("residential", e)}
                        label="Residential"
                        required
                      >
                        <Radio value="Indian" label="Indian" />
                        <Radio value="NRI" label="NRI" />
                      </RadioGroup>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <RadioGroup
                        mt={8}
                        value={form.values.relocate}
                        onChange={(e) => form.setFieldValue("relocate", e)}
                        label="Willing to relocate"
                        required
                      >
                        <Radio value="Yes" label="Yes" />
                        <Radio value="No" label="No" />
                      </RadioGroup>
                    </Grid.Col>
                  </Grid>

                  <Button mt={10} type="submit" color="orange">
                    Submit
                  </Button>
                </form>
                {/* <Button
                  mt={10}
                  variant="outline"
                  onClick={InvoiceDownload}
                  color="orange"
                >
                  <img src={pdf} alt="" width="19" style={{ margin: "2px" }} />{" "}
                  Payment Invoice Download
                </Button> */}
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label="Last step"
              description="Upload Pictures"
              allowStepSelect={active == 3}
            >
              <Paper radius="sm" p={50} mt={40}>
                <div>
                  <Text>Upload Image</Text>
                  <Grid>
                    <Grid.Col span={6}>
                      {/* for croper */}
                      {upImg !== "" && upImg !== null ? (
                        <>
                          <ReactCrop
                            ruleOfThirds={true}
                            style={{ marginTop: 15, width: 400 }}
                            src={upImg}
                            onImageLoaded={onLoad}
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                          />
                          <div style={{ display: "none" }}>
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
                            <Button
                              size="sm"
                              onClick={addImageArray}
                              radius="xl"
                            >
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
                        <div
                          className={classes.wrapper}
                          style={{ marginTop: 15, padding: 0 }}
                        >
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
                                <Text
                                  align="center"
                                  weight={700}
                                  size="lg"
                                  mt="xl"
                                >
                                  {status.accepted
                                    ? "Drop files here"
                                    : status.rejected
                                    ? "Image file less than 10mb"
                                    : "Upload Image"}
                                </Text>
                                <Text
                                  align="center"
                                  size="sm"
                                  mt="xs"
                                  color="dimmed"
                                >
                                  Drag&apos;n&apos;drop files here to upload
                                  company logo. We can accept only <i>.png</i>{" "}
                                  files that are less than 10mb in size. This
                                  logo will used for print invoice
                                </Text>
                              </div>
                            )}
                          </Dropzone>
                        </div>
                      )}
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Grid pt={15}>
                        {imagesArray.map((row, index) => (
                          <Grid.Col span={4}>
                            <Image
                              width={"100%"}
                              fit="contain"
                              src={row.images}
                            ></Image>
                            <ActionIcon
                              onClick={() => delteArrayImage(row.count)}
                              color="red"
                              variant="light"
                              style={{ marginTop: -30, marginLeft: 5 }}
                            >
                              <Trash />
                            </ActionIcon>
                          </Grid.Col>
                        ))}
                      </Grid>
                      {imagesArray.length > 0 ? (
                        <Button
                          mt={10}
                          type="submit"
                          onClick={() => SubmitImage()}
                          color="orange"
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button mt={10} disabled color="orange">
                          Submit
                        </Button>
                      )}
                    </Grid.Col>
                  </Grid>
                </div>
              </Paper>
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click the login button to get matched
            </Stepper.Completed>
          </Stepper>

          {/* <Group position="center" mt="xl">
     <Button variant="default" onClick={prevStep}>
       Back
     </Button>
     <Button color="orange" onClick={nextStep}>
       Next step
     </Button>
   </Group> */}
        </Container>
      ) : (
        <Container>Payment Fail</Container>
      )}

      {/* Footer */}
      <Footers />
    </>
  );
}
