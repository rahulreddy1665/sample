import {
  Accordion,
  ActionIcon,
  Col,
  Container,
  createStyles,
  Card,
  Group,
  Text,
  Image,
  Title,
  Button,
  ScrollArea,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  Phone,
  User,
} from "tabler-icons-react";
// import image from './image.svg';
import About from "../../assets/User/Aboutus.png";
import Footer from "../../Components/User/Footer";
import Header from "../../Components/User/Header";
import LazyShow from "../../Components/User/LazyShow";
import Batman from "../../assets/User/Batman.png";
import Contact from "../../assets/User/Contact.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Policy from "../../assets/User/policy.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 5,
    paddingBottom: theme.spacing.xl * 2,
  },
  root: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundAttachment: 'fixed',
    // minHeight: '500px',
    backgroundImage: `linear-gradient(to bottom, black, rgba(255,255,255,0)),  url(${Policy})`,
    paddingTop: theme.spacing.xl * 1,
    paddingBottom: theme.spacing.xl * 4,
  },
  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Poppins`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
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
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginRight: 20,
    marginTop: 50,
  },

  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.";

export default function Profile() {
  const { classes } = useStyles();
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [data, setData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      console.log(token);
      if (token !== null && typeof token != "undefined") {
        await axios
          .get(URL + "app/users_all", config)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        await axios
          .get(URL + "app/users_all2", config)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    };

    fetchData();
  }, []);

  // Responsive carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // For navigating profile details
  const profiledetails = (e) => {
    navigate("/profiledetails/" + e);
  };
  return (
    <>
      <Header />
      <div className={classes.root}>
        <Container size="lg" sx={{ height: "25.3vh" }}>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title} pt={80}>
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                >
                  Privacy Policy
                </Text>
              </Title>
            </div>
          </div>
        </Container>
      </div>
      <Container size="lg" pb={50} pt={30}>
        <LazyShow>
          <Text style={{ fontWeight: 700 }}>Privacy Policy</Text>
          <p>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like). Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham. Where can I get some? There are many variations of passages
            of Lorem Ipsum available, but the majority have suffered alteration
            in some form, by injected humour, or randomised words which don't
            look even slightly believable. If you are going to use a passage of
            Lorem Ipsum, you need to be sure there isn't anything embarrassing
            hidden in the middle of text. All the Lorem Ipsum generators on the
            Internet tend to repeat predefined chunks as necessary, making this
            the first true generator on the Internet. It uses a dictionary of
            over 200 Latin words, combined with a handful of model sentence
            structures, to generate Lorem Ipsum which looks reasonable. The
            generated Lorem Ipsum is therefore always free from repetition,
            injected humour, or non-characteristic words etc.
          </p>
        </LazyShow>
      </Container>
      <Footer />
    </>
  );
}
