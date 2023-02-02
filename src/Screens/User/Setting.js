import {
  ActionIcon,
  Card,
  Container,
  createStyles,
  Grid,
  Group,
  Image,
  Badge,
  Button,
  Text,
  Divider,
  Tabs,
  TextInput,
  NumberInput,
  PasswordInput,
  Select,
  RadioGroup,
  Radio,
  Textarea,
  Modal,
} from "@mantine/core";
import { ModalsProvider, useModals } from "@mantine/modals";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useCallback,
} from "react";

import {
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  Phone,
  User,
  ArrowRampRight,
  X,
  CloudUpload,
  Photo,
  Key,
  Trash,
  Check,
  Diamond,
} from "tabler-icons-react";
import About from "../../assets/User/Aboutus.png";
import footerlogo from "../../assets/User/footerlogo.png";
import LazyShow from "../../Components/User/LazyShow";
import ProdileHeader from "../../Components/User/ProfileHeader";
import axios from "axios";
import Footer from "./footer.json";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { RichTextEditor } from "@mantine/rte";

import {
  Dropzone,
  DropzoneStatus,
  MIME_TYPES,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
    fontFamily: ` ${theme.fontFamily}`,
    lineHeight: 1.2,
  },
  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  cards: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },
  body: {
    paddingLeft: theme.spacing.xs,
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
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
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
  titleg: {
    fontSize: theme.fontSizes.xs,
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
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
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
}));

function Setting() {
  const { classes, cx } = useStyles();
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [user, setUser] = useState("");
  const [marriageType, setMarriageType] = useState([]);
  const [gotra, setGotra] = useState([]);
  const [rashi, setRashi] = useState([]);
  const [nakshathra, setNakshathra] = useState([]);
  const [education, setEducation] = useState([]);
  const [education_type, setEducationType] = useState([]);
  const [subCast, setSubCast] = useState([]);
  const [sect, setSect] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArray2, setImagesArray2] = useState([]);
  const [successImage, setSuccessImage] = useState("");

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
  const [deleteIndex, setDeleteIndex] = useState(0);

  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };

      await axios
        .get(URL + "app/login_Data", config)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          setDeleteIndex(response.data.value);
          form.setFieldValue("label", response.data.label);
          form.setFieldValue("email", response.data.email);
          form.setFieldValue("phone_number", response.data.phone_number);
          form.setFieldValue(
            "date_of_birth",
            new Date(response.data.date_of_birth)
          );
          form.setFieldValue("relocate", response.data.relocate);
          form.setFieldValue("address1", response.data.address1);
          form.setFieldValue("height", parseFloat(response.data.height));
          form.setFieldValue("parent_name", response.data.parent_name);
          form.setFieldValue("address2", response.data.address2);
          form.setFieldValue("pincode", Number(response.data.pincode));
          form.setFieldValue("city", response.data.city);
          form.setFieldValue("state", response.data.state);
          form.setFieldValue("country", response.data.country);
          form.setFieldValue("country", response.data.country);
          form.setFieldValue("no_brothers", response.data.no_brothers);
          form.setFieldValue("no_sisters", response.data.no_sisters);
          form.setFieldValue(
            "no_sisters_married",
            response.data.no_sisters_married
          );
          form.setFieldValue(
            "no_brothers_married",
            response.data.no_brothers_married
          );
          form.setFieldValue("mother_tongue", response.data.mother_tongue);

          if (response.data.marriage_type_id !== null) {
            form.setFieldValue(
              "marriage_type_id",
              response.data.marriage_type_id.toString()
            );
          }

          if (response.data.gothra_id !== null) {
            form.setFieldValue("gothra_id", response.data.gothra_id.toString());
          }

          if (response.data.rashi_id !== null) {
            form.setFieldValue("rashi_id", response.data.rashi_id.toString());
          }

          if (response.data.nakshathra_id !== null) {
            form.setFieldValue(
              "nakshathra_id",
              response.data.nakshathra_id.toString()
            );
          }

          if (response.data.sub_cast_id !== null) {
            form.setFieldValue(
              "sub_cast_id",
              response.data.sub_cast_id.toString()
            );
          }

          if (response.data.sect_id !== null) {
            form.setFieldValue("sect_id", response.data.sect_id.toString());
          }

          if (response.data.education_id !== null) {
            form.setFieldValue(
              "education_id",
              response.data.education_id.toString()
            );
          }

          if (response.data.education_type_id !== null) {
            form.setFieldValue(
              "education_type_id",
              response.data.education_type_id.toString()
            );
          }

          if (response.data.image != null && response.data.image != "") {
            var image = response.data.image.split(",");
            var array = [];
            for (let i = 0; i < image.length; i++) {
              array[i] = { count: i, images: image[i] };
            }
            setImagesArray2(array);
            console.log(array);
          } else {
            setImagesArray2([]);
          }
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
          setMarriageType(clean);
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
        .get(URL + "sub_cast", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));
          setSubCast(clean);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);

  const form = useForm({
    initialValues: {
      label: "",
      relocate: "No",
      email: "",
      phone_number: "",
      date_of_birth: new Date(),
      address1: "",
      address2: "",
      pincode: "",
      height: 0,
      city: "",
      state: "",
      country: "",
      no_brothers: "",
      no_sisters: "",
      no_sisters_married: "",
      no_brothers_married: "",
      mother_tongue: "",
      marriage_type_id: "",
      gothra_id: "",
      rashi_id: "",
      nakshathra_id: "",
      sub_cast_id: "",
      sect_id: "",
      education_id: "",
      education_type_id: "",
      marriage_status: "no",
      partner_id: "",
      publish_story: "no",
      review: "",
    },
  });

  // For update the personal details and update
  const handelPersonal = (value) => {
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
    // For update the personal details and update
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "app/login_user_update",
        {
          label: value.label,
          email: value.email,
          address1: value.address1,
          address2: value.address2,
          pincode: value.pincode,
          state: value.state,
          city: value.city,
          parent_name: value.parent_name,
          country: value.country,
          phone_number: value.phone_number,
        },
        config
      )
      .then((response) => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Update",
          message: "Data Update successfully",
          icon: <Check />,
        });
      })
      .catch((error) => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: " Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };
  {
    /* For update the personal details like height sisters brothers,gothra,rashi,nakshathra,sub-cast,sub-cast,marriage type */
  }
  const handelDetails = (value) => {
    showNotification({
      loading: true,
      id: "load-data",
      title: `Saving...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    //For update the user details list of users
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "app/login_personal_update",
        {
          height: value.height,
          marriage_type_id: value.marriage_type_id,
          sub_cast_id: value.sub_cast_id,
          sect_id: value.sect_id,
          gothra_id: value.gothra_id,
          rashi_id: value.rashi_id,
          nakshathra_id: value.nakshathra_id,
          no_brothers: value.no_brothers,
          no_brothers_married: value.no_brothers_married,
          no_sisters: value.no_sisters,
          no_sisters_married: value.no_sisters_married,
          education_id: value.education_id,
          relocate: form.values.relocate,
          education_type_id: value.education_type_id,
          mother_tongue: value.mother_tongue,
          account_created_by: value.account_created_by,
          working_in: value.working_in,
          working_as: value.working_as,
          salary_pa: value.salary_pa,
          working_city: value.working_city,
          residential: value.residential,
          currently_working: value.currently_working,
          public_private: value.public_private,
        },
        config
      )
      .then((response) => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Update",
          message: "Data Update successfully",
          icon: <Check />,
        });
      })
      .catch((error) => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Login Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };

  const handelPassword = (value) => {
    console.log("hi");
    showNotification({
      loading: true,
      id: "load-data",
      title: `Saving...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "app/update_password",
        {
          old_password: value.old_password,
          password: value.password,
        },
        config
      )
      .then((response) => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Data Update",
          message: "Password Update successfully",
          icon: <Check />,
        });
      })
      .catch((error) => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Login Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };
  const editForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
      old_password: "",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
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

  //   for image croper
  const ref45 = useRef();
  const changeHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      ref.current.value = "";
    }
  };
  const changeHandler2 = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSuccessImage(reader.result));
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
    setImage("");
    setUpImg("");
    console.log(imagesArray);
  };

  // For update the user image details list
  const handleUserEdit = () => {
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
    // Main axios part for sending data to backend editing Package data
    axios
      .post(
        URL + "user_update",
        {
          data: form.values,
          images: imagesArray,
          images2: imagesArray2,
          value: deleteIndex,
        },
        config
      )
      .then((response) => {
        // For set edited data to table array
        setImagesArray([]);

        // Set loading effect animation
        updateNotification({
          id: "load-data2",
          color: "teal",
          title: "Data Updated",
          message: "Image Data Updated Successfully",
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
  const modals = useModals();
  let navigate = useNavigate();

  //
  const handelMarried2 = () => {
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
    // Main axios part for sending data to backend editing Package data
    // for delete the user account
    axios
      .post(
        URL + "married_update",
        {
          review: form.values.review,
          publish_story: form.values.publish_story,
          partner_id: form.values.partner_id,
          marriage_status: form.values.marriage_status,
          images: successImage,
        },
        config
      )
      .then((response) => {
        // For set edited data to table array

        localStorage.clear();
        navigate("/login");
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
  const handelMarried = () => {
    // Notifications / Snackbar

    modals.openConfirmModal({
      title: "Account Closing",
      children: (
        <>
          <Text size="sm">
            We wish you all the best as you embark on this wonderful union.
            Wishing you a long and happy marriage. Cheers! from Vipra Bandhana
            Team.
          </Text>
        </>
      ),

      labels: {
        confirm: "Confirm",
        cancel: "Cancel",
      },
      confirmProps: { color: "orange" },

      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        handelMarried2();
      },
    });
  };
  const deleteAccount = () => {
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
    // Main axios part for sending data to backend editing Package data
    axios
      .post(
        URL + "delete_account",
        {
          reason_delete: deleteReason,
        },
        config
      )
      .then((response) => {
        // For set edited data to table array

        localStorage.clear();
        navigate("/login");
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
  const [opened, setOpened] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  return (
    <div>
      <div className={classes.root}>
        {/* Header Part */}
        <Container size="lg" sx={{ height: "5.3vh" }}>
          <ProdileHeader />
        </Container>
      </div>
      <Container size="lg" mt={50}>
        <Card shadow="sm">
          <Text size="xl" mt={5} sx={{ textAlign: "center" }}>
            Profile Setting
          </Text>
          <Tabs color="orange">
            <Tabs.Tab label="Personal Details" icon={<Phone size={14} />}>
              {/*Personal Details Edit for  */}
              {/* For edit name and login details  */}
              <form
                onSubmit={form.onSubmit((values) => handelPersonal(values))}
              >
                <Grid gutter="xs">
                  <Grid.Col span={4}>
                    <TextInput
                      label="Name"
                      mt={0}
                      value={form.values.label}
                      placeholder="Name"
                      {...form.getInputProps("label")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Email"
                      mt={0}
                      value={form.values.label}
                      placeholder="Email"
                      {...form.getInputProps("email")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NumberInput
                      label="Phone no."
                      mt={0}
                      value={form.values.phone_number}
                      placeholder="Phone no."
                      {...form.getInputProps("phone_number")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <DatePicker
                      label="Date Of Birth"
                      mt={0}
                      value={form.values.date_of_birth}
                      placeholder="Date Of Birth"
                      {...form.getInputProps("date_of_birth")}
                    />
                  </Grid.Col>
                  {/* <Grid.Col span={4}>
                    <TextInput
                      label="Address 1"
                      mt={0}
                      value={form.values.address1}
                      placeholder="Address 1"
                      {...form.getInputProps("address1")}
                    />
                  </Grid.Col> */}
                  {/* <Grid.Col span={4}>
                    <TextInput
                      label="Address 2"
                      mt={0}
                      value={form.values.address2}
                      placeholder="Address 2"
                      {...form.getInputProps("address2")}
                    />
                  </Grid.Col> */}
                  <Grid.Col span={4}>
                    <NumberInput
                      label="Pincode"
                      mt={0}
                      value={form.values.pincode}
                      placeholder="Pincode"
                      {...form.getInputProps("pincode")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="City"
                      mt={0}
                      value={form.values.city}
                      placeholder="City"
                      {...form.getInputProps("city")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="State"
                      mt={0}
                      value={form.values.state}
                      placeholder="State"
                      {...form.getInputProps("state")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Country"
                      mt={0}
                      value={form.values.country}
                      placeholder="Country"
                      {...form.getInputProps("country")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Parent Name"
                      mt={0}
                      value={form.values.parent_name}
                      placeholder="Parent Name"
                      {...form.getInputProps("parent_name")}
                    />
                  </Grid.Col>
                </Grid>

                <Button
                  radius="md"
                  mt="xl"
                  type="submit"
                  size="md"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  Update
                </Button>
              </form>
            </Tabs.Tab>
            <Tabs.Tab label="Details" icon={<ArrowRampRight size={14} />}>
              {/* For edit the personal details of users */}
              {/* For update the personal details like height sisters brothers,gothra,rashi,nakshathra,sub-cast,sub-cast,marriage type */}
              <form onSubmit={form.onSubmit((values) => handelDetails(values))}>
                <Grid>
                  <Grid.Col span={4}>
                    <NumberInput
                      label="Height"
                      mt={5}
                      step={0.1}
                      precision={3}
                      placeholder="Height"
                      value={form.values.height}
                      {...form.getInputProps("height")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="No. Brother"
                      mt={0}
                      value={form.values.no_brothers}
                      placeholder="No. Brother"
                      {...form.getInputProps("no_brothers")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="No. Sister"
                      mt={0}
                      value={form.values.no_sisters}
                      placeholder="No. Sister"
                      {...form.getInputProps("no_sisters")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="No. Sister Married"
                      mt={0}
                      value={form.values.no_sisters_married}
                      placeholder="No. Sister Married"
                      {...form.getInputProps("no_sisters_married")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="No. Brother Married"
                      mt={0}
                      value={form.values.no_brothers_married}
                      placeholder="No. Brother Married"
                      {...form.getInputProps("no_brothers_married")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Select
                      label="Select Gotra"
                      searchable
                      aria-expanded={true}
                      styles={{
                        hovered: { backgroundColor: "#fdf5ef" },
                        selected: {
                          color: "orange",
                          backgroundColor: "#fff0e6",
                        },
                      }}
                      classNames={{ selected: "zc_selected" }}
                      placeholder="Select Gotra"
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
                      label="Select Rashi"
                      searchable
                      placeholder="Select Rashi"
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
                      label="Select Nakshathra"
                      searchable
                      placeholder="Select Nakshathra"
                      {...form.getInputProps("nakshathra_id")}
                      data={nakshathra}
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
                      label="Select Sub-Cast"
                      searchable
                      placeholder="Select Sub-Cast"
                      {...form.getInputProps("sub_cast_id")}
                      data={subCast}
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
                      label="Select Sect"
                      searchable
                      placeholder="Select Sect"
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
                      label="Select Marriage Type"
                      searchable
                      placeholder="Select Marriage Type"
                      {...form.getInputProps("marriage_type_id")}
                      data={marriageType}
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
                      label="Select Education"
                      searchable
                      placeholder="Select Education"
                      {...form.getInputProps("education_id")}
                      data={education}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <RadioGroup
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

                <Button
                  radius="md"
                  mt="xl"
                  type="submit"
                  size="md"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  Update
                </Button>
              </form>
            </Tabs.Tab>

            <Tabs.Tab label="Images" icon={<Photo size={14} />}>
              {/* For Images change of deleting image or update the iamges details */}
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
                          Drag&apos;n&apos;drop files here to upload company
                          logo. We can accept only <i>.png</i> files that are
                          less than 10mb in size. This logo will used for print
                          invoice
                        </Text>
                      </div>
                    )}
                  </Dropzone>
                </div>
              )}

              <Grid pt={25}>
                {imagesArray.map((row, index) => (
                  <Grid.Col span={1}>
                    <Image width={80} fit="contain" src={row.images}></Image>
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
                      <Grid.Col span={1}>
                        <Image
                          width={80}
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
                radius="md"
                mt="xl"
                size="md"
                type="submit"
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                onClick={() => handleUserEdit()}
              >
                Update
              </Button>
            </Tabs.Tab>
            <Tabs.Tab label="Password Change" icon={<Key size={14} />}>
              {/* For password change  */}
              <form
                onSubmit={editForm.onSubmit((values) => handelPassword(values))}
              >
                <Grid>
                  <Grid.Col span={4}>
                    <PasswordInput
                      label="Current Password"
                      mt={0}
                      value={editForm.values.old_password}
                      placeholder="Current Password"
                      {...editForm.getInputProps("old_password")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <PasswordInput
                      label="New Password"
                      mt={0}
                      value={editForm.values.password}
                      placeholder="New Password"
                      {...editForm.getInputProps("password")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <PasswordInput
                      label="Confirm Password"
                      mt={0}
                      value={editForm.values.confirmPassword}
                      placeholder="Confirm Password"
                      {...editForm.getInputProps("confirmPassword")}
                    />
                  </Grid.Col>
                </Grid>

                <Button
                  radius="md"
                  mt="xl"
                  size="md"
                  type="submit"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  Update
                </Button>
              </form>
            </Tabs.Tab>
            <Tabs.Tab label="Account Close" icon={<X size={14} />}>
              {/* For close the account */}
              <form
                onSubmit={editForm.onSubmit((values) => handelMarried(values))}
              >
                <Grid>
                  <Grid.Col>
                    <RadioGroup
                      value={form.values.marriage_status}
                      onChange={(e) => form.setFieldValue("marriage_status", e)}
                      label="Did you find your partner on Vipra Bandhana ?"
                      required
                    >
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </RadioGroup>
                  </Grid.Col>
                  {/* if marriage get the  viprabandhana user he match with to delete his / her account also */}
                  {form.values.marriage_status == "yes" ? (
                    <>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Please enter profile Id of your partner"
                          mt={0}
                          value={form.values.partner_id}
                          placeholder="Partner Id"
                          {...form.getInputProps("partner_id")}
                        />
                      </Grid.Col>
                      <Grid.Col>
                        <RadioGroup
                          value={form.values.publish_story}
                          onChange={(e) =>
                            form.setFieldValue("publish_story", e)
                          }
                          label="Can we publish your success story"
                          required
                        >
                          <Radio value="yes" label="Yes" />
                          <Radio value="no" label="No" />
                        </RadioGroup>
                      </Grid.Col>
                      {/* For publish the story of the marriege user in dashboard */}
                      {form.values.publish_story == "yes" ? (
                        <>
                          <Grid.Col span={12}>
                            <RichTextEditor
                              controls={[
                                ["bold", "italic", "underline"],
                                ["h1", "h2", "h3"],
                                ["alignLeft", "alignCenter", "alignRight"],
                              ]}
                              label="Enter Review"
                              mt={0}
                              value={form.values.review}
                              placeholder="Enter Review"
                              {...form.getInputProps("review")}
                            />
                          </Grid.Col>
                          <Grid.Col span={12}>
                            {successImage !== "" && successImage !== null ? (
                              <div style={{ width: 400 }}>
                                <ReactCrop
                                  ruleOfThirds={true}
                                  style={{ marginTop: 5 }}
                                  src={successImage}
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
                                      width: Math.round(
                                        completedCrop?.width ?? 0
                                      ),
                                      height: Math.round(
                                        completedCrop?.height ?? 0
                                      ),
                                      marginBottom: 20,
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div
                                className={classes.wrapper}
                                style={{ marginTop: 15 }}
                              >
                                <Dropzone
                                  ref={ref45}
                                  onChange={changeHandler2}
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
                                        Drag&apos;n&apos;drop files here to
                                        upload company logo. We can accept only{" "}
                                        <i>.png</i> files that are less than
                                        10mb in size. This logo will used for
                                        print invoice
                                      </Text>
                                    </div>
                                  )}
                                </Dropzone>
                              </div>
                            )}
                          </Grid.Col>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </Grid>
                {/* For delete the user account */}
                <Button
                  radius="md"
                  mt="xl"
                  size="md"
                  type="submit"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  Update
                </Button>
              </form>

              <hr></hr>
              {/* For confirmation modal will popup with instruction of account delete */}
              <Button
                onClick={() => setOpened(true)}
                radius="md"
                mt="xl"
                size="md"
                type="submit"
                variant="gradient"
                gradient={{ from: "red", to: "red" }}
              >
                Delete Account
              </Button>

              <Modal
                opened={opened}
                size="lg"
                onClose={() => setOpened(false)}
                title="Reason for deleting your account!"
              >
                <RichTextEditor
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e)}
                  placeholder="Describe the reson for deleting account "
                  controls={[
                    ["bold", "italic", "underline"],
                    ["unorderedList", "h1", "h2", "h3"],
                    ["alignLeft", "alignCenter", "alignRight"],
                  ]}
                />
                <Button mt={15} onClick={deleteAccount} color="orange">
                  Submit
                </Button>
                <p style={{ margin: 0, paddingTop: 5, fontSize: 9 }}>
                  {" "}
                  <span style={{ color: "red" }}>*</span> Once if you delete
                  account you need to contact the admin to reopen the account
                </p>
              </Modal>
            </Tabs.Tab>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
}

export default Setting;
