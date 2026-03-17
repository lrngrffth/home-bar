import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import { CircularProgress } from "@mui/material";


export const Loading = styled(CircularProgress) ((props) => ({
    color:  props["dark"] ? '#C68F9D' : '#564146',
    fontSize: props["newStyle"] == 'large' ? '30px': '12px',
    
}));