import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useShallow } from 'zustand/shallow';
import useGoogleApiStore from '../_stores/useGoogleApiStore';
import { AccountCircle } from '@mui/icons-material';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from 'react-router-dom';
import useSimpleTextInputDialog from '../_stores/useSimpleTextInputDialog';
import useBattleNetApiStore from '../_stores/useBattleNetApiStore';
import SimpleTextInputModal from './SimpleTextInputModal';

const Header: React.FC = () => {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { authStatus, initGoogleApi, signIn, signOut } = useGoogleApiStore(
    useShallow((state) => ({
      authStatus: state.authStatus,
      initGoogleApi: state.init,
      signIn: state.signIn,
      signOut: state.signOut,
    }))
  );

  const { setAccessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      setAccessToken: state.setAccessToken,
    }))
  );

  useEffect(() => {
    initGoogleApi();
  }, [initGoogleApi]);

  const handleSetToken = () => {
    useSimpleTextInputDialog.setState({
      isOpen: true,
      title: "Battle Net 토큰",
      name: "토큰",
      onConfirm: (text: string) => {
        setAccessToken(text);
      }
    });
  }

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        My Website
        </Typography>
        {/* 네비게이션 메뉴 */}
        <Button color={(!pathname.includes("/wow") && !pathname.includes("/project")) ? "secondary" : "inherit"} onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color={pathname.includes("/wow") ? "secondary" : "inherit"} onClick={() => navigate("/wow")}>
          WOW
        </Button>
        <Button color={pathname.includes("/project") ? "secondary" : "inherit"} onClick={() => navigate("/project")}>
          Project
        </Button>
        {process.env.NODE_ENV === "development" ?
          <Button color="inherit" onClick={handleSetToken}>BNET-TOKEN</Button> :
          <></>
        }
        {authStatus ?
          <>
            <IconButton size="large" edge="end" color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "account-button",
              }}
            >
              <MenuItem onClick={handleSignOut}>로그아웃</MenuItem>
            </Menu>
          </> :
          <Button color="inherit" onClick={handleSignIn}>로그인</Button>
        }
      </Toolbar>
      <SimpleTextInputModal />
    </AppBar>
  );
}

export default Header;