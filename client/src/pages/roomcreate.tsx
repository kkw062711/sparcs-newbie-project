import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import { Box, Typography, Button, TextField, Divider } from "@mui/material";
// MUI import

const RoomcreatePage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Roomcreate' })
  }, []);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "30px" }}>
      <Box sx={{
        border: '2px solid', borderRadius: '20px', padding: "30px",
        borderColor: 'primary.dark', margin: '0px 0px 20px 0px'
      }}>
        <Typography sx={{
          fontSize: "30px", fontWeight: 'bold',
          margin: '0px', color: 'primary.dark'
        }}> 방 정보 입력 </Typography>

        <Box // 필수 정보
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center',
            margin: '20px 0px 20px 0px'
          }}>
          <Typography sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '30px 0px 20px 0px'
          }}  >
            필수 정보
          </Typography>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          {/* 방 이름 */}
          <Box sx={{ display: 'flex', margin: '0px 0px 10px 0px' }}>
            <Typography sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '20px 14px 0px 14px'
            }}>
              방 이름 (공구 물품) -
            </Typography>

            <TextField // 이름 입력칸
              label={""}
              variant="standard"
              sx={{ width: '16vw', margin: '15px 15px 0px 15px' }}
              onChange={(e) => { }}
            />
          </Box>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          {/* 물품 가격 */}
          <Box sx={{ display: 'flex', margin: '0px 0px 10px 0px' }}>
            <Typography sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '20px 10px 0px 10px'
            }}>
              가격 -
            </Typography>

            <TextField // 가격 입력칸
              label={""}
              variant="standard"
              sx={{ width: '6vw', margin: '15px 15px 0px 15px' }}
              onChange={(e) => { }} />
            <Typography sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '20px 0px 0px 0px'
            }}>
              원
            </Typography>

          </Box>
        </Box>

        <Box // 선택 정보
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center',
            margin: '20px 0px 20px 0px'
          }}>
          <Typography sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '30px 0px 20px 0px'
          }}>
            선택 정보
          </Typography>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 20px 0px 8px" }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', margin: '-5px 0px 0px 20px' }}>
              <Typography sx={{
                fontSize: "20px", fontWeight: 'bold',
                margin: '0px 14px 0px 14px'
              }}>
                사진 -
              </Typography>
              <Button variant="outlined" onClick={(e) => { }}
                sx={{
                  margin: '-3px 10px 5px 0px'
                }}>
                <Typography
                  sx={{
                    fontSize: '15px', fontWeight: 'bold',
                    alignSelf: 'center'
                  }}>
                  사진 업로드
                </Typography>
              </Button>
            </Box>
            <Box sx={{
              width: '15vw', height: '15vw',
              border: '2px solid', borderRadius: '20px', padding: "20px",
              borderColor: 'primary.dark', margin: '0px 0px 20px 0px'
            }} />
          </Box>
          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 20px 0px 20px" }} />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontWeight: 'bold', fontSize: '20px',
                margin: '0px 0px 0px 5px'
              }}>
              설명 -
            </Typography>
            <TextField
              multiline
              rows={7}
              variant="filled"
              sx={{ margin: '0px 0px 20px 0px', width: '400px' }} />

          </Box>


        </Box>
        <Box // 방 만들기/ 수정하기
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center',
            margin: '20px 0px 10px 0px'
          }}>
          <Button variant="outlined" onClick={(e) => { }}
            sx={{
              margin: '15px 10px 0px 0px', justifySelf: 'flex-end'
            }}>
            <Typography
              sx={{ color: 'primary.dark', fontSize: '25px', fontWeight: 'bold' }}>
              방 만들기
            </Typography>
          </Button>

        </Box>
      </Box>
    </Box>
  )
};

export default RoomcreatePage;
