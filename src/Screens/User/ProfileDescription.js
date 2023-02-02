import {
  ActionIcon,
  Container,
  createStyles,
  Group,
  Grid,
  Text,
  Card,
  Tabs,
  Timeline,
  Divider,
  ScrollArea,
} from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import {
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  Photo,
  Phone,
  Check,
  X,
} from "tabler-icons-react";
import footerlogo from "../../assets/User/footerlogo.png";
import LazyShow from "../../Components/User/LazyShow";
import ProdileHeader from "../../Components/User/ProfileHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery from "../../Components/User/Gallery";
import Gallery2 from "../../Components/User/Gallery2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footers from "../../Components/User/Footer";

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
export default function ProfileDescription() {
  const { classes, cx } = useStyles();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef();
  const slider2 = useRef();
  const params = useParams();
  const [data, setData] = useState("");
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  // Footer Data
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

  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };

      await axios
        .get(URL + "app/user_one/" + params.id, config)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);

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
  const handlePhone = (e) => {
    console.log(e);
    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    axios
      .post(
        URL + "app/request_no",
        {
          user_id: e,
        },
        config
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleReject = (e) => {
    console.log(e);
    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    axios
      .post(
        URL + "app/reject_req",
        {
          request_user: e,
        },
        config
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleApprove = (e) => {
    console.log(e);
    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    axios
      .post(
        URL + "app/accept_req",
        {
          request_user: e,
        },
        config
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <div className={classes.root} pb={40}>
        {/* Header Part */}
        <Container size="lg" sx={{ height: "5.3vh" }}>
          <ProdileHeader />
        </Container>
      </div>
      {data != "" ? (
        <Container size="lg" mt={50}>
          <Grid>
            <Grid.Col md={4} lg={5}>
              {data.image != null ? (
                <Gallery2 slidesData={data.image.split(",")} />
              ) : (
                <Gallery2 slidesData={["image.png"]} />
              )}
            </Grid.Col>
            <Grid.Col md={8} lg={7}>
              <Card
                withBorder
                radius="md"
                ml={20}
                p={20}
                className={classes.card}
              >
                <Tabs color="orange">
                  {/*Personal Details  */}
                  <Tabs.Tab label="Personal Details" icon={<Phone size={14} />}>
                    <Grid>
                      <Grid.Col span={6}>
                        <Text color="dimmed" size="xs">
                          Date of Birth
                        </Text>
                        {data.date_of_birth != null ? (
                          <Text size="md">
                            {new Date(data.date_of_birth).toLocaleDateString(
                              "en-GB"
                            )}
                          </Text>
                        ) : (
                          <Text size="md">-</Text>
                        )}

                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          Age
                        </Text>

                        {data.date_of_birth != null ? (
                          <Text size="md">
                            {Math.floor(
                              (new Date() -
                                new Date(data.date_of_birth).getTime()) /
                                3.15576e10
                            )}
                          </Text>
                        ) : (
                          <Text size="md">-</Text>
                        )}
                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          Height
                        </Text>
                        <Text size="md">{data.height}</Text>
                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          Raashi
                        </Text>

                        {data.rashi_id != null ? (
                          <Text size="md"> {data.rashi.label}</Text>
                        ) : (
                          <Text size="md"> -</Text>
                        )}

                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          Nakshatra
                        </Text>

                        {data.nakshathra_id != null ? (
                          <Text size="md"> {data.nakshathra.label}</Text>
                        ) : (
                          <Text size="md"> -</Text>
                        )}

                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          Gotra
                        </Text>

                        {data.gothra_id != null ? (
                          <Text size="md"> {data.gothra.label}</Text>
                        ) : (
                          <Text size="md"> -</Text>
                        )}
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text color="dimmed" size="xs">
                          Subcaste
                        </Text>

                        {data.sub_cast_id != null ? (
                          <Text size="md"> {data.sub_cast.label}</Text>
                        ) : (
                          <Text size="md"> -</Text>
                        )}

                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          No of Brothers & No of Brothers married
                        </Text>
                        <Text size="md">
                          {data.no_brothers},{data.no_brothers_married}
                        </Text>
                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          No of Sisters & No of Sisters married
                        </Text>
                        <Text size="md">
                          {data.no_sisters},{data.no_sisters_married}
                        </Text>
                        <Divider mt={10} mb={10} />
                        {data.working_in != "" && data.working_in != null ? (
                          <>
                            <Text color="dimmed" size="xs">
                              Working in
                            </Text>
                            <Text size="md">{data.working_in}</Text>
                            <Divider mt={10} mb={10} />
                          </>
                        ) : null}

                        {data.salary_pa != "" && data.salary_pa != null ? (
                          <>
                            <Text color="dimmed" size="xs">
                              Salary/year
                            </Text>
                            <Text size="md">{data.salary_pa}</Text>

                            <Divider mt={10} mb={10} />
                          </>
                        ) : null}

                        {data.working_as != "" && data.working_as != null ? (
                          <>
                            <Text color="dimmed" size="xs">
                              Working as
                            </Text>
                            <Text size="md">{data.working_as}</Text>
                          </>
                        ) : null}
                      </Grid.Col>
                    </Grid>
                  </Tabs.Tab>
                  <Tabs.Tab label="Contact Details" icon={<Photo size={14} />}>
                    <Grid>
                      <Grid.Col span={6}>
                        <Text color="dimmed" size="xs">
                          Full Name
                        </Text>
                        <Text size="md">{data.label}</Text>

                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          Email
                        </Text>
                        <Text size="md">{data.email}</Text>
                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          Phone
                        </Text>
                        {typeof data.request_by !== "undefined" ? (
                          <>
                            {data.request_by.length != 0 ? (
                              <>
                                {data.request_by[0].status == 0 ? (
                                  <Group>
                                    <Text
                                      style={{
                                        color: "green",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleApprove(data.value)}
                                    >
                                      <Check mt={0} p={0} size={15} /> Approve{" "}
                                    </Text>
                                    <Text
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleReject(data.value)}
                                    >
                                      <X mt={0} p={0} size={15} /> Reject{" "}
                                    </Text>
                                  </Group>
                                ) : data.request_by[0].status == 1 ? (
                                  <Text style={{ color: "orange" }}>
                                    {data.phone_number}
                                  </Text>
                                ) : (
                                  <Text style={{ color: "red" }}>
                                    You have rejected the request
                                  </Text>
                                )}
                              </>
                            ) : data.request_for.length !== 0 ? (
                              <>
                                {data.request_for[0].status === 0 ? (
                                  <Text style={{ color: "orange" }}>
                                    Request is pending
                                  </Text>
                                ) : data.request_for[0].status === 1 ? (
                                  <Text style={{ color: "orange" }}>
                                    {data.phone_number}
                                  </Text>
                                ) : data.request_for[0].status === 2 ? (
                                  <Text style={{ color: "red" }}>
                                    {" "}
                                    Your request has been rejected
                                  </Text>
                                ) : null}
                              </>
                            ) : (
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => handlePhone(data.value)}
                              >
                                <Text style={{ color: "orange" }}>
                                  Request For Phone
                                </Text>
                              </div>
                            )}
                          </>
                        ) : (
                          <div onClick={() => handlePhone(data.value)}>
                            <Text style={{ color: "orange" }}>
                              Request For Phone
                            </Text>
                          </div>
                        )}
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text color="dimmed" size="xs">
                          Pincode
                        </Text>
                        <Text size="md">{data.pincode}</Text>
                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          State
                        </Text>
                        <Text size="md">{data.state}</Text>
                        <Divider mt={10} mb={10} />
                        <Text color="dimmed" size="xs">
                          City
                        </Text>
                        <Text size="md">{data.city}</Text>
                      </Grid.Col>
                    </Grid>
                  </Tabs.Tab>
                </Tabs>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      ) : null}
      {/* Footer Data */}
      <Footers />
    </>
  );
}
