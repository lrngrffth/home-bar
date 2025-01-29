import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";


export const Button = styled(MuiButton) ((props) => ({
    color: '#564146',
    backgroundColor: '#C68F9D',
    fontSize: props["newStyle"] == 'large' ? '30px': '20px',
    textTransform: 'none',
    borderRadius: 20,
    fontWeight: '300',
    paddingLeft: props["newStyle"] == 'large' ? 50 : 20,
    paddingRight: props["newStyle"] == 'large' ? 50 : 20
}));