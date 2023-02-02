import { ActionIcon, Card, Container, createStyles, Grid, Group, Image, Badge, Button, Text, Divider } from '@mantine/core';
import React from 'react';
import { BrandInstagram, BrandTwitter, BrandYoutube, Phone, User } from 'tabler-icons-react';
import About from '../assets/Aboutus.png';
import footerlogo from "../assets/footerlogo.png";
import LazyShow from '../components/LazyShow';
import ProdileHeader from "../components/ProfileHeader";
const useStyles = createStyles((theme) => ({

    title: {
        fontWeight: 700,
        fontFamily: ` ${theme.fontFamily}`,
        lineHeight: 1.2,
    },
    section: {
        width: 250,

    },
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
    cards: {
        position: 'relative',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    rating: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: theme.spacing.xs + 2,
        pointerEvents: 'none',
    },

    title: {
        display: 'block',
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xs / 2,
    },

    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    },
    body: {
        paddingLeft: theme.spacing.xs,

    },
    footer: {
        marginTop: 120,
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    logo: {
        maxWidth: 400,
        marginLeft: 50,
        marginRight: 'auto',
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    descriptions: {
        marginTop: 5,

        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: 50,

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    wrappers: {
        width: 220,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,


        '&:hover': {
            textDecoration: 'underline',
        },
    },

    titless: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,

        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    titleg: {
        fontSize: theme.fontSizes.xs,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },



}));
export default function ProfileDashboard() {
    const { classes, cx } = useStyles();

    const footerdata = [
        {
            title: "MY ACCOUNT",
            links: [
                { label: 'Dashboard', link: '/' },
                { label: 'Dashboard', link: '/' },
                { label: 'Dashboard', link: '/' },
            ],
        },
        {
            title: "LEGAL INFORMATION",
            links: [
                { label: 'Dashboard', link: '/' },
                { label: 'Dashboard', link: '/' },
                { label: 'Dashboard', link: '/' },


            ],
        },
        {
            title: "CONTACT INFORMATION",
            links: [
                { label: 'Dashboard', link: '/' },
                { label: 'Dashboard', link: '/' },


            ],
        },
    ]

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
    return (
        <>
            <div className={classes.root}>
                {/* Header Part */}
                <Container size="xl" sx={{ height: '5.3vh' }}>
                    <ProdileHeader />
                </Container>
            </div>
            <Text size='xl' mt={40} sx={{ textAlign: "center" }}>Welcome Back..!</Text>
            <Container size='xl' mt={40}>
                <Grid mb={40} >
                    <Grid.Col xs={3}>
                        <LazyShow>
                            <Card withBorder radius="md" className={cx(classes.cards,)} >
                                <Card.Section>
                                    <a >
                                        <Image src={About} height={280} />
                                    </a>
                                </Card.Section>
                                <Badge className={classes.rating} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                    New here
                                </Badge>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Text className={classes.title} weight={500} component="a">
                                            Name:
                                        </Text>
                                        <Text className={classes.title} weight={500} component="a">
                                            T V Rahul Reddy
                                        </Text>
                                    </div>
                                    <Button color='orange' mt={10} variant='subtle'>Edit</Button>
                                </div>

                                <div style={{ display: "flex", marginTop: -5, justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Text className={classes.title} weight={500} component="a">
                                            Plan:
                                        </Text>
                                        <Text className={classes.title} weight={500} component="a">
                                            Basic
                                        </Text>
                                    </div>
                                    <Button color='orange' mt={10} size='xs' variant='subtle' radius='xl' >Upgrade</Button>
                                </div>
                                <div style={{ display: "flex", marginTop: -5, justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Text className={classes.title} weight={500} component="a">
                                            Phone Number:
                                        </Text>
                                        <Text className={classes.title} weight={500} component="a">
                                            Shown
                                        </Text>
                                    </div>
                                    <Button color='orange' mt={10} size='xs' variant='subtle' radius='xl' >Upgrade</Button>
                                </div>


                            </Card>
                        </LazyShow>
                    </Grid.Col>
                    <Grid.Col xs={9}>
                        <Grid mt={2} xs={12}>
                            <Grid>


                                <Grid.Col xs={12}>
                                    <Text size='xl' ml={10} mb={10}>Your Last searched Profiles</Text>
                                    <Grid>
                                        <Grid.Col xs={6}>
                                            <LazyShow>

                                                <Card withBorder radius="md" p={0} className={classes.card}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <Image src={About} height={152} width={152} />
                                                            <div className={classes.body}>
                                                                <Text className={classes.title} mt="xs" >
                                                                    Rahul Reddy T V
                                                                </Text>
                                                                <Group >
                                                                    <Text className={classes.titleg} mt="xs" >
                                                                        Raashi
                                                                    </Text>
                                                                    <Text className={classes.titleg} mt="xs" >
                                                                        Nakshatra
                                                                    </Text>
                                                                </Group>
                                                                <Group >
                                                                    <Text className={classes.titleg}  >
                                                                        Gotra
                                                                    </Text>
                                                                    <Text className={classes.titleg}  >
                                                                        Height
                                                                    </Text>
                                                                </Group>
                                                                <Group >
                                                                    <Text className={classes.titleg}  >
                                                                        Mother Tongue
                                                                    </Text>
                                                                    <Text className={classes.titleg}  >
                                                                        Emplyoed
                                                                    </Text>
                                                                </Group>
                                                                <div style={{ display: "flex", flexDirection: "row" }} >
                                                                    <Phone color='orange' />
                                                                    <Text size='md' ml={5} color='orange'>
                                                                        Request Phone no
                                                                    </Text>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </LazyShow>
                                        </Grid.Col>
                                        <Grid.Col xs={6}>
                                            <LazyShow>

                                                <Card withBorder radius="md" p={0} className={classes.card}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <Image src={About} height={152} width={152} />
                                                            <div className={classes.body}>
                                                                <Text className={classes.title} mt="xs" >
                                                                    Rahul Reddy T V
                                                                </Text>
                                                                <Group >
                                                                    <Text className={classes.titleg} mt="xs" >
                                                                        Raashi
                                                                    </Text>
                                                                    <Text className={classes.titleg} mt="xs" >
                                                                        Nakshatra
                                                                    </Text>
                                                                </Group>
                                                                <Group >
                                                                    <Text className={classes.titleg}  >
                                                                        Gotra
                                                                    </Text>
                                                                    <Text className={classes.titleg}  >
                                                                        Height
                                                                    </Text>
                                                                </Group>
                                                                <Group >
                                                                    <Text className={classes.titleg}  >
                                                                        Mother Tongue
                                                                    </Text>
                                                                    <Text className={classes.titleg}  >
                                                                        Emplyoed
                                                                    </Text>
                                                                </Group>
                                                                <div style={{ display: "flex", flexDirection: "row" }} >
                                                                    <Phone color='orange' />
                                                                    <Text size='md' ml={5} color='orange'>
                                                                        Request Phone no
                                                                    </Text>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </LazyShow>
                                        </Grid.Col>

                                    </Grid>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <LazyShow>
                                        <Card withBorder radius="md" p={20} className={classes.card}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Phone color='orange' />
                                                <Text> No of People reqested your phone</Text>
                                                <Text>4</Text>
                                            </div>
                                        </Card>
                                    </LazyShow>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <LazyShow>
                                        <Card withBorder radius="md" p={20} className={classes.card}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Phone color='orange' />
                                                <Text> No of People you requested</Text>
                                                <Text>4</Text>
                                            </div>
                                        </Card>
                                    </LazyShow>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <LazyShow>
                                        <Card withBorder radius="md" p={20} className={classes.card}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <User color='orange' />
                                                <Text> No of People visited your profile</Text>
                                                <Text>4</Text>
                                            </div>
                                        </Card>
                                    </LazyShow>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <LazyShow>
                                        <Card withBorder radius="md" p={20} className={classes.card}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <User color='orange' />
                                                <Text> No of Profiles you visited</Text>
                                                <Text>4</Text>
                                            </div>
                                        </Card>
                                    </LazyShow>
                                </Grid.Col>
                            </Grid>
                        </Grid>
                    </Grid.Col>


                </Grid>
                <Text size='xl' mb={20} sx={{ textAlign: "center" }}>Latest Profiles</Text>
                <Grid>
                    <Grid.Col xs={4}>
                        <LazyShow>
                            <Card withBorder radius="md" p={0} className={classes.card}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Image src={About} height={152} width={152} />
                                        <div className={classes.body}>
                                            <Text className={classes.title} mt="xs" >
                                                Rahul Reddy T V
                                            </Text>
                                            <Group >
                                                <Text className={classes.titleg} mt="xs" >
                                                    Raashi
                                                </Text>
                                                <Text className={classes.titleg} mt="xs" >
                                                    Nakshatra
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Gotra
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Height
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Mother Tongue
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Emplyoed
                                                </Text>
                                            </Group>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <Phone color='orange' />
                                                <Text size='md' ml={5} color='orange'>
                                                    Request Phone no
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </LazyShow>
                    </Grid.Col>
                    <Grid.Col xs={4}>
                        <LazyShow>
                            <Card withBorder radius="md" p={0} className={classes.card}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Image src={About} height={152} width={152} />
                                        <div className={classes.body}>
                                            <Text className={classes.title} mt="xs" >
                                                Rahul Reddy T V
                                            </Text>
                                            <Group >
                                                <Text className={classes.titleg} mt="xs" >
                                                    Raashi
                                                </Text>
                                                <Text className={classes.titleg} mt="xs" >
                                                    Nakshatra
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Gotra
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Height
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Mother Tongue
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Emplyoed
                                                </Text>
                                            </Group>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <Phone color='orange' />
                                                <Text size='md' ml={5} color='orange'>
                                                    Request Phone no
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </LazyShow>
                    </Grid.Col>
                    <Grid.Col xs={4}>
                        <LazyShow>
                            <Card withBorder radius="md" p={0} className={classes.card}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Image src={About} height={152} width={152} />
                                        <div className={classes.body}>
                                            <Text className={classes.title} mt="xs" >
                                                Rahul Reddy T V
                                            </Text>
                                            <Group >
                                                <Text className={classes.titleg} mt="xs" >
                                                    Raashi
                                                </Text>
                                                <Text className={classes.titleg} mt="xs" >
                                                    Nakshatra
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Gotra
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Height
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Mother Tongue
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Emplyoed
                                                </Text>
                                            </Group>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <Phone color='orange' />
                                                <Text size='md' ml={5} color='orange'>
                                                    Request Phone no
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </LazyShow>

                    </Grid.Col>
                    <Grid.Col xs={4}>
                        <LazyShow>
                            <Card withBorder radius="md" p={0} className={classes.card}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Image src={About} height={152} width={152} />
                                        <div className={classes.body}>
                                            <Text className={classes.title} mt="xs" >
                                                Rahul Reddy T V
                                            </Text>
                                            <Group >
                                                <Text className={classes.titleg} mt="xs" >
                                                    Raashi
                                                </Text>
                                                <Text className={classes.titleg} mt="xs" >
                                                    Nakshatra
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Gotra
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Height
                                                </Text>
                                            </Group>
                                            <Group >
                                                <Text className={classes.titleg}  >
                                                    Mother Tongue
                                                </Text>
                                                <Text className={classes.titleg}  >
                                                    Emplyoed
                                                </Text>
                                            </Group>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <Phone color='orange' />
                                                <Text size='md' ml={5} color='orange'>
                                                    Request Phone no
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </LazyShow>
                    </Grid.Col>
                </Grid>
            </Container>
            <LazyShow>
                <footer className={classes.footer}>
                    <div className={classes.inner}>
                        <div className={classes.logo}>
                            <img src={footerlogo} />
                            <Text size="xs" color="dimmed" className={classes.descriptions}>
                                Find your perfect match using our customized filter..!
                            </Text>
                        </div>
                        <div className={classes.groups} >{groups}</div>
                    </div>
                    <div size='xl' className={classes.afterFooter}>
                        <Text ml={100}> &copy; {new Date().getFullYear()} Zevcore Pvt Ltd.</Text>

                        <Group mr={100} spacing={0} className={classes.social} position="right" noWrap>
                            <ActionIcon size="lg">
                                <BrandTwitter size={18} />
                            </ActionIcon>
                            <ActionIcon size="lg">
                                <BrandYoutube size={18} />
                            </ActionIcon>
                            <ActionIcon size="lg">
                                <BrandInstagram size={18} />
                            </ActionIcon>
                        </Group>
                    </div>
                </footer>
            </LazyShow>

        </>
    )
}
