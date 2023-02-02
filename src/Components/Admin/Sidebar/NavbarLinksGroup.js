import { Box, Collapse, createStyles, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import { CalendarStats, ChevronLeft, ChevronRight } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({

    control: {
        fontWeight: 300,
        fontFamily: 'Poppins',
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.orange[0] : theme.colors.orange[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 200,
        fontFamily: 'Poppins',
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.orange[0] : theme.colors.orange[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },
    linkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.orange[0]
                    : theme.colors.orange[0],
            color: theme.colors.orange[1],

        },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}));


export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }) {
    const { classes, theme, cx } = useStyles();
    const [active, setActive] = useState('');
    const hasLinks = Array.isArray(links);

    const [opened, setOpened] = useState(initiallyOpened || false);
    let navigate = useNavigate();
    const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: link.label === active })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.label);
                navigate(link.link)
            }}
            key={link.label}
        >
            {link.label}
        </a>
    ));

    // For navigating 
    const handleLink = (e) => {
        navigate(e)
    }

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group position="apart" spacing={0} onClick={(e) => handleLink(link)}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" color='orange' size={30}>
                            <Icon size={18} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size={14}
                            style={{
                                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

const mockdata = {
    label: 'Releases',
    icon: CalendarStats,
    links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
    ],
};

export function NavbarLinksGroup() {
    return (
        <Box
            sx={(theme) => ({
                minHeight: 220,
                padding: theme.spacing.md,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            })}

        >
            <LinksGroup {...mockdata} />
        </Box>
    );
}