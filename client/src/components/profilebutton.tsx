import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from "react-redux";

const ProfileButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changePage = (page) => {
      dispatch({ type: 'changepage', page: page })
    }
    const changeAuth = (auth) => {
      dispatch({ type: 'changeauth',auth : auth })
    }
    return (
    <IconButton size='large' color="primary" aria-label="내 프로필" onClick={(e)=>{navigate("/profile"); changePage("Profile"); changeAuth(false)}}>
    <AccountCircleIcon fontSize="large"/>
    </IconButton>
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
