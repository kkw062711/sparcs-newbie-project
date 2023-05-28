import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonAdd, Settings, Logout, AccountCircle } from '@mui/icons-material/';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from "@mui/material";
import store from "./store";

const ProfileButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    // <IconButton size='large' color="primary" aria-label="내 프로필" onClick={(e)=>{navigate("/profile")}}>
    // <AccountCircleIcon fontSize="large"/>
    // </IconButton>
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', margin: '0px 20px 0px 0px' }}>
        <Tooltip title="내 프로필">
          <IconButton onClick={(e) => { setAnchorEl(e.currentTarget) }}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="primary" aria-label="내 프로필">
            <AccountCircle fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={(e) => { setAnchorEl(null) }}
        onClick={(e) => { setAnchorEl(null) }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={(e) => { setAnchorEl(null); navigate('/profile') }}>
          <AccountCircle fontSize='large' color='secondary' sx={{ margin: '0px 8px 0px 0px' }} /> 프로필 보기
        </MenuItem>
        <MenuItem onClick={(e) => { setAnchorEl(null); store.dispatch({ type: 'changeauth', auth: '0' }); navigate('/') }}>
          <Logout fontSize='large' color='secondary' sx={{ margin: '0px 8px 0px 0px' }} /> 로그아웃
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ProfileButton;



// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';

// export default function IconButtonSizes() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={1}>
//       <IconButton aria-label="delete" size="small">
//         <DeleteIcon fontSize="inherit" />
//       </IconButton>
//       <IconButton aria-label="delete" size="small">
//         <DeleteIcon fontSize="small" />
//       </IconButton>
//       <IconButton aria-label="delete" size="large">
//         <DeleteIcon />
//       </IconButton>
//       <IconButton aria-label="delete" size="large">
//         <DeleteIcon fontSize="inherit" />
//       </IconButton>
//     </Stack>
//   );
// }
