import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";


export const Button = styled(MuiButton) ((props) => ({
    color:  props["dark"] ? '#C68F9D' : '#564146',
    backgroundColor: props["dark"] ? '#564146': '#C68F9D',
    fontSize: props["newStyle"] == 'large' ? '30px': '12px',
    textTransform: 'none',
    borderRadius: 20,
    fontWeight: '300',
    paddingLeft: props["newStyle"] == 'large' ? 50 : 10,
    paddingRight: props["newStyle"] == 'large' ? 50 : 10
}));