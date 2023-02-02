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
  Pagination,
  ScrollArea,
  Table,
  Select,
  Slider,
  Text,
  TextInput,
  Grid,
  Image,
  UnstyledButton,
  useMantineTheme,
  RangeSlider,
  MultiSelect,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ProdileHeader from "../../Components/User/ProfileHeader";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import LazyShow from "../../Components/User/LazyShow";

// For bulk upload convert excel file to json
// Pdf Exports and Xl export

import React, { useEffect, useRef, useState } from "react";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Dots,
  Pencil,
  Selector,
  Trash,
  X,
  User,
  Filter,
} from "tabler-icons-react";

import { useModals } from "@mantine/modals";
import { Navigate, useNavigate } from "react-router-dom";

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
export default function Search() {
  let navigate = useNavigate();
  const { classes } = useStyles();
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token"));
  const [marriageType, setMarriageType] = useState([]);
  const [rashi, setRashi] = useState([]);
  const [nakshathra, setNakshathra] = useState([]);
  const [gotra, setGotra] = useState([]);
  const [gotraId, setGotraId] = useState([]);
  const [marriageId, setMarriageId] = useState([]);
  const [nakshathraId, setNakshathraId] = useState([]);
  const [rashiId, setRashiId] = useState([]);
  const [age, setAge] = useState([18, 35]);
  const [height, setHeight] = useState([4, 6]);
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);

  useEffect(() => {
    // for fetching the data of marriageType
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      // For get all the marriage type list
      await axios
        .get(URL + "marriageType", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));

          setMarriageType(clean);
          var data = response.data.data;
          var array = [];
          for (let i = 0; i < data.length; i++) {
            array[i] = data[i].value;
          }
          setMarriageId(array);
        })
        .catch((error) => {
          console.log("error", error);
        });
      // For get all the rashi list
      await axios
        .get(URL + "rashi", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));

          setRashi(clean);
          var data = response.data.data;
          var array = [];
          for (let i = 0; i < data.length; i++) {
            array[i] = data[i].value;
          }
          setRashiId(array);
        })
        .catch((error) => {
          console.log("error", error);
        });
      // For get all the nakshatra list
      await axios
        .get(URL + "nakshatra", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));

          setNakshathra(clean);

          var data = response.data.data;
          var array = [];
          for (let i = 0; i < data.length; i++) {
            array[i] = data[i].value;
          }
          setNakshathraId(array);
        })
        .catch((error) => {
          console.log("error", error);
        });
      // For get all the gotra list
      await axios
        .get(URL + "gotra", config)
        .then((response) => {
          var data = response.data.data;
          var clean = data.map((data) => ({
            value: data.value.toString(),
            label: data.label.toString(),
          }));

          setGotra(clean);
          var data = response.data.data;
          var array = [];
          for (let i = 0; i < data.length; i++) {
            array[i] = data[i].value;
          }
          setGotraId(array);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);

  const form = useForm({
    initialValues: {
      marriage_type: [],
      gotra_id: [],
      city: "",
      age: "",
      height: "",
      nakshatra_id: [],
      rashi_id: [],
    },
  });

  // search the users list by the filtering variables
  const handleSearch = (values) => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    var gotra_id = [];
    if (values.gotra_id.length != 0) {
      for (let i = 0; i < values.gotra_id.length; i++) {
        gotra_id[i] = Number(values.gotra_id[i]);
      }
    } else {
      gotra_id = gotraId;
    }
    var marriage_type = [];
    if (values.marriage_type.length != 0) {
      for (let i = 0; i < values.marriage_type.length; i++) {
        marriage_type[i] = Number(values.marriage_type[i]);
      }
    } else {
      marriage_type = marriageId;
    }

    var nakshatra_id = [];
    console.log(values.nakshatra_id.length, nakshathraId);
    if (values.nakshatra_id.length != 0) {
      for (let i = 0; i < values.nakshatra_id.length; i++) {
        nakshatra_id[i] = Number(values.nakshatra_id[i]);
      }
    } else {
      nakshatra_id = nakshathraId;
    }
    var rashi_id = [];
    if (values.rashi_id.length != 0) {
      for (let i = 0; i < values.rashi_id.length; i++) {
        rashi_id[i] = Number(values.rashi_id[i]);
      }
    } else {
      rashi_id = rashiId;
    }
    // Backend url for search the users by filter data
    axios
      .post(
        URL + "app/filter_users",
        {
          age: age,
          city: values.city,
          height: height,
          rashi_id: rashi_id,
          nakshatra_id: nakshatra_id,
          marriage_type: marriage_type,
          gotra_id: gotra_id,
        },
        config
      )
      .then((response) => {
        setData(response.data.data);
        setShowSearch(false);
      })
      .catch((error) => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "Rashi didnt added ",
        });
      });
  };
  const profiledetails = (e) => {
    navigate("/profiledetails/" + e);
  };
  return (
    <>
      <div className={classes.root}>
        {/* Header Part */}
        <Container size="lg" sx={{ height: "5.3vh" }}>
          <ProdileHeader />
        </Container>
      </div>
      {showSearch == true ? (
        <>
          <Text size="xl" mt={40} sx={{ textAlign: "center" }}>
            Search Profiles Based On Criteria
          </Text>
          <Container size="lg" mt={40}>
            <Card withBorder radius="md" p={40} className={classes.card}>
              {/* For search and filter the users list view */}
              <form onSubmit={form.onSubmit((values) => handleSearch(values))}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: 20,
                    justifyContent: "space-between",
                  }}
                >
                  {/* For select the marriage type */}
                  <div style={{ width: "48%" }}>
                    <MultiSelect
                      styles={{
                        hovered: { backgroundColor: "#fdf5ef" },
                        selected: {
                          color: "orange",
                          backgroundColor: "#fff0e6",
                        },
                      }}
                      classNames={{ selected: "zc_selected" }}
                      searchable
                      clearable
                      label="Select Marriage Type"
                      placeholder="Select Marriage Type"
                      data={marriageType}
                      {...form.getInputProps("marriage_type")}
                    />
                  </div>
                  {/* For select the rashi type */}
                  <div style={{ width: "48%" }}>
                    <MultiSelect
                      styles={{
                        hovered: { backgroundColor: "#fdf5ef" },
                        selected: {
                          color: "orange",
                          backgroundColor: "#fff0e6",
                        },
                      }}
                      classNames={{ selected: "zc_selected" }}
                      searchable
                      clearable
                      label="Select Raashi"
                      placeholder="Select Raashi"
                      data={rashi}
                      {...form.getInputProps("rashi_id")}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: 20,
                    justifyContent: "space-between",
                  }}
                >
                  {/* For select the nakshatra type */}
                  <div style={{ width: "48%" }}>
                    <MultiSelect
                      styles={{
                        hovered: { backgroundColor: "#fdf5ef" },
                        selected: {
                          color: "orange",
                          backgroundColor: "#fff0e6",
                        },
                      }}
                      classNames={{ selected: "zc_selected" }}
                      searchable
                      clearable
                      label="Select Nakshatra"
                      placeholder="Select Nakshatra"
                      data={nakshathra}
                      {...form.getInputProps("nakshatra_id")}
                    />
                  </div>
                  {/* For seelct the gotra type */}
                  <div style={{ width: "48%" }}>
                    <MultiSelect
                      styles={{
                        hovered: { backgroundColor: "#fdf5ef" },
                        selected: {
                          color: "orange",
                          backgroundColor: "#fff0e6",
                        },
                      }}
                      classNames={{ selected: "zc_selected" }}
                      searchable
                      clearable
                      label="Select Gothra"
                      placeholder="Select Gothra"
                      data={gotra}
                      {...form.getInputProps("gotra_id")}
                    />
                  </div>
                </div>
                {/* For the city name preferred */}
                <div style={{ width: "48%", marginTop: 20 }}>
                  <TextInput
                    label="City"
                    mt={5}
                    placeholder="Enter City"
                    {...form.getInputProps("city")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: 20,
                    justifyContent: "space-between",
                  }}
                >
                  {/* select the age range two */}
                  <div style={{ width: "48%" }}>
                    <Text>
                      Select Age Range ({age[0]},{age[1]} )
                    </Text>
                    <div className="range-slider">
                      <input
                        type="range"
                        min="18"
                        max="60"
                        step="1"
                        value={age[0]}
                        onChange={(e) => {
                          var data = age;
                          data[0] = e.target.value;
                          setAge([...data]);
                        }}
                      />

                      <input
                        type="range"
                        min="18"
                        max="60"
                        step="1"
                        value={age[1]}
                        onChange={(e) => {
                          var data = age;
                          data[1] = e.target.value;
                          setAge([...data]);
                        }}
                        v-model="sliderMax"
                      />
                    </div>
                  </div>
                  {/* select the height range */}
                  <div style={{ width: "48%" }}>
                    <Text>
                      Select Height Range ({height[0]},{height[1]} )
                    </Text>
                    <div className="range-slider">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={height[0]}
                        onChange={(e) => {
                          var data = height;
                          data[0] = e.target.value;
                          setHeight([...data]);
                        }}
                      />

                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={height[1]}
                        onChange={(e) => {
                          var data = height;
                          data[1] = e.target.value;
                          setHeight([...data]);
                        }}
                        v-model="sliderMax"
                      />
                    </div>
                  </div>
                </div>
                {/* For filter the users list */}
                <Button mt={20} type="submit" color="orange">
                  Search
                </Button>
              </form>
            </Card>
          </Container>
        </>
      ) : (
        <>
          <Container
            sx={{
              textAlign: "right",
            }}
            size="lg"
            mt={30}
          >
            <Button
              style={{
                border: "none",
              }}
              p={2}
              alignItems="right"
              variant="outline"
              color="orange"
              size="lg"
              onClick={() => setShowSearch(true)}
            >
              <Filter /> Filter Again
            </Button>
          </Container>
          <Container
            style={{
              clear: "both",
            }}
            size="lg"
            mt={10}
          >
            {data.length != 0 ? (
              <Grid mt={10}>
                {data.map((row, index) => (
                  <Grid.Col md={4} lg={3}>
                    <LazyShow>
                      <Card
                        withBorder
                        radius="md"
                        onClick={() => profiledetails(row.value)}
                        p="md"
                        style={{
                          backgroundImage:
                            `linear-gradient(180deg, rgba(0, 0,0, 0.02) 50%, rgba(20, 20, 20, 0.900) 80%),url(` +
                            PROFILE +
                            row.image.split(",")[0] +
                            `)`,

                          width: "100%",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: 400,
                          position: "relative",
                          cursor: "pointer",

                          boxShadow:
                            "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            left: 0,
                          }}
                        >
                          <div
                            style={{
                              color: "white",
                              paddingLeft: 15,
                            }}
                            mt="md"
                          >
                            <Text size="xl" weight={500}>
                              {row.label}
                            </Text>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <div style={{ display: "flex" }}>
                                  {row.rashi_id != null ? (
                                    <Text size="xs" mt="xs">
                                      R: {row.rashi.label}
                                    </Text>
                                  ) : (
                                    <Text size="xs" mt="xs">
                                      R: -
                                    </Text>
                                  )}
                                  <Text size="xs" p={0} mt="xs">
                                    &nbsp; | &nbsp;
                                  </Text>
                                  {row.nakshathra_id != null ? (
                                    <Text size="xs" mt="xs">
                                      N: {row.nakshathra.label}
                                    </Text>
                                  ) : (
                                    <Text size="xs" mt="xs">
                                      N: -
                                    </Text>
                                  )}
                                </div>
                                <div
                                  style={{ display: "flex", marginTop: -10 }}
                                >
                                  {row.gothra_id != null ? (
                                    <Text size="xs" mt="xs">
                                      G: {row.gothra.label}
                                    </Text>
                                  ) : (
                                    <Text size="xs" mt="xs">
                                      G: -
                                    </Text>
                                  )}
                                  <Text size="xs" mt="xs">
                                    &nbsp; | &nbsp;
                                  </Text>
                                  <Text size="xs" mt="xs">
                                    H: {row.height} (
                                    {Number(row.height * 30.48).toFixed(0)})
                                  </Text>
                                </div>
                                <div
                                  style={{ display: "flex", marginTop: -10 }}
                                >
                                  <Text size="xs" mt="xs">
                                    {row.mother_tongue}
                                  </Text>
                                  <Text size="xs" mt="xs">
                                    &nbsp; | &nbsp;
                                  </Text>
                                  <Text size="xs" mt="xs">
                                    {row.city}
                                  </Text>
                                </div>
                              </div>
                              <div
                                style={{
                                  backgroundColor: "#FF9248",
                                  borderTopLeftRadius: 10,
                                  borderBottomLeftRadius: 10,
                                  marginBottom: 10,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 45,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: -2,
                                    paddingBottom: -2,
                                    color: "white",
                                    fontWeight: 600,
                                    margin: 0,
                                  }}
                                >
                                  {Math.floor(
                                    (new Date() -
                                      new Date(row.date_of_birth).getTime()) /
                                      3.15576e10
                                  )}
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </LazyShow>
                  </Grid.Col>
                ))}
              </Grid>
            ) : (
              <Text
                size="xl"
                mt={40}
                sx={{ textAlign: "center", cursor: "pointer" }}
              >
                No data available
              </Text>
            )}
          </Container>
        </>
      )}
    </>
  );
}
