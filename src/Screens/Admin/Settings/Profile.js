import BreadCrumb from "../../../Components/Admin/BreadCrumbs/Breadcrumbs";
import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Grid,
  Input,
  Image,
} from "@mantine/core";
import { PasswordInput, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Batman from "../../../assets/Batman.png";
import Aot from "../../../assets/Aot.jpg";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check, CloudDownload, X } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));
export default function Profile({}) {
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [data, setData] = useState("");
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [image, setImage] = useState("");
  const [rashi, setRashi] = useState([]);
  const { classes, theme } = useStyles();
  const [sortedData, setSortedData] = useState([]);
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
      phone_number: "",
    },

    validate: (values) => ({
      confirmPassword:
        values.confirmPassword !== values.password
          ? "Passwords did not match"
          : null,
    }),
  });

  useEffect(() => {
    // for fetching the data of nakshatra
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      await axios
        .get(URL + "user_login", config)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          form.setFieldValue("name", response.data.label);
          form.setFieldValue("email", response.data.email);
          form.setFieldValue("phone_number", response.data.phone_number);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);

  const handelUpdate = (values) => {
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
    console.log(image);
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);
    formData.append("image", image);
    formData.append("password", values.password);
    // Main axios part for sending data to backend editing unit data
    axios
      .post(URL + "admin_update", formData, config)
      .then((response) => {
        // For set edited data to table array

        // Set loading effect animation
        updateNotification({
          id: "load-data2",
          color: "teal",
          title: "Data Updated",
          message: " Data Updated Successfully",
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
  const ref = useRef();
  const multipleImage = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <div>
      <BreadCrumb Text="User Details" Title="Settings" titleLink="/settings" />
      <div>
        <Grid justify="center" align="center" mt={40}>
          <Grid.Col md={3} lg={3}>
            <Image
              src={PROFILE + data.image}
              sx={{ width: 200, margin: "auto", marginTop: 40 }}
              radius="sm"
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Upload a different photo ?
            </Text>
            <label htmlFor="contained-button-file2">
              <Input
                sx={{ display: "none" }}
                accept="image/png, image/gif, image/jpeg"
                ref={ref}
                onChange={multipleImage}
                id="contained-button-file2"
                type="file"
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="outline"
                  color="gold"
                  component="span"
                  startIcon={<CloudDownload />}
                >
                  Upload Image
                </Button>
              </div>
            </label>
          </Grid.Col>
          <Grid.Col md={6} lg={6}>
            <Card
              withBorder
              p="lg"
              radius="md"
              className={classes.card}
              shadow="sm"
            >
              <form
                onSubmit={form.onSubmit((values) => handelUpdate(values))}
                style={{ padding: 5 }}
              >
                <TextInput
                  label="Name"
                  placeholder="Name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  placeholder="example@mail.com"
                  {...form.getInputProps("email")}
                />
                <NumberInput
                  label="Phone Number"
                  placeholder="Phone number"
                  {...form.getInputProps("phone_number")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />

                <PasswordInput
                  mt="sm"
                  label="Confirm password"
                  placeholder="Confirm password"
                  {...form.getInputProps("confirmPassword")}
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
                  Update
                </Button>
              </form>
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
