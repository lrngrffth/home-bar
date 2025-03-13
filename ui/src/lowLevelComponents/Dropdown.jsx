import { styled } from "@mui/material/styles";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Description, Field, Label, Select } from '@headlessui/react'



// const StyledSelect = styled(Select) ((props) => ({
//     color: '#C68F9D',
//     backgroundColor: '#FFE3F0',
//     // fontSize: props["newStyle"] == 'large' ? '30px': '12px',
//     textTransform: 'none',
//     borderColor: '#C68F9D',
//     // fontWeight: '300',
// }));

// const StyledMenuItem = styled(MenuItem) ((props) => ({
//     color: '#C68F9D',
//     backgroundColor: '#FFE3F0',
//     // fontSize: props["newStyle"] == 'large' ? '30px': '12px',
//     textTransform: 'none',
//     borderColor: '#C68F9D',
//     '&$active': {
//         backgroundColor: '#FFE3F0'
//     }
    
//     // fontWeight: '300',
// }));

// export function Dropdown({value, handleChange, label, options}) {
//     console.log(options)
//     return (
//         <FormControl>
//             <InputLabel>{label}</InputLabel>
//             <StyledSelect
//                 labelId="dropdown"
//                 id="dropdown"
//                 value={value}
//                 label={label}
//                 onChange={handleChange}
//                 className="w-64"
//             >
//                 {options && options.map((option, i) => (
//                     <StyledMenuItem value={option["name"]}>{option["name"]}</StyledMenuItem>
//                 ))}

//             </StyledSelect>
//         </FormControl>
//     )
// }


export function Dropdown({value, handleChange, label, options}) {
    return (
        <Field>
            <Label className="font-semibold pb-3">{label}</Label>
            <Select
                labelId="dropdown"
                id="dropdown"
                value={value}
                label={label}
                onChange={handleChange}
                className="flex flex-col w-64 color-dusk-rose bg-cotton-candy border-dusk-rose border text-base"
            >
                {options && options.map((option, i) => (
                    <option value={option}>{option}</option>
                ))}

            </Select>
        </Field>
    )
}