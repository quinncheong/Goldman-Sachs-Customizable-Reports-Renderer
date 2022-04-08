import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Search as SearchIcon } from "../icons/search";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Home",
  },
//   {
//     href: "/customers",
//     icon: <UsersIcon fontSize="small" />,
//     title: "Inbox",
//   },
  {
    href: "/reports",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Report Status",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Schedule Report",
  },
  {
    href: "/register",
    icon: <SearchIcon fontSize="small" />,
    title: "View Report",
  },
  {
    href: "/login",
    icon: <LockIcon fontSize="small" />,
    title: "Data Files",
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
  },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box 
              sx={{ 
                px: 5,
                py: "11px",
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "space-around",
                my: 3,
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Box
                    component="img"
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                    src="/static/bulletin_logo.png"
                  />
                </a>
              </NextLink>
              <div>
                  <Typography color="inherit" variant="subtitle1">
                    Bulletin
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    By Goldman Sachs
                  </Typography>
              </div>
            </Box>
          </div>
          <div>
            <Box 
              sx={{ 
                px: 5,
                py: 1,
                alignItems: "left",
                display: "flex",
                justifyContent: 'flex-start'
              }}
            >
              <Typography color="#48B8F0" variant="body2">
                Main Menu
              </Typography>
            </Box>
          </div>
          {/* <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          /> */}
          
          <Box sx={{ flexGrow: 0, mb: 3,}}>
            {items.map((item, index) => {
              if (index == 0) {
                return (
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                );
              }
            })}
          </Box>
          <div>
            <Box 
              sx={{ 
                px: 5,
                py: 1,
                alignItems: "left",
                display: "flex",
                justifyContent: 'flex-start'
              }}
            >
              <Typography color="#48B8F0" variant="body2">
                Workspace
              </Typography>
            </Box>
          </div>
          
          <Box sx={{ flexGrow: 0, mb: 3, }}>
            {items.map((item, index) => {
              if (index >= 1 && index < 4) {
                return (
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                );
              }
            })}
          </Box>
          <div>
            <Box 
              sx={{ 
                px: 5,
                py: 1,
                alignItems: "left",
                display: "flex",
                justifyContent: 'flex-start'
              }}
            >
              <Typography color="#48B8F0" variant="body2">
                General
              </Typography>
            </Box>
          </div>

          <Box sx={{ flexGrow: 1 }}>
            {items.map((item, index) => {
              if (index == items.length - 2) {
                return (
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                );
              }
            })}
          </Box>

        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item, index) => {
            if (index == items.length - 1) {
              return (
                <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
              );
            }
          })}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#0D4EA6",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
