import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const CustomTextField = styled(TextField)({
    '& label': {
        color: 'var(--fontColor)'
    },
    '& input': {
        color: 'var(--fontColor)'
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: 'var(--borderColor)'
    },
    '& .MuiInput-underline:hover:before': {
        borderBottomColor: 'var(--borderColor) !important;'
    }

});

// export const CustomTextField = styled(TextField)({
//     '& label': {
//         color: 'var(--fontColor)'
//     },
//     '& input': {
//         color: 'var(--fontColor)'
//     },
//     '& .MuiInput-underline:before': {
//         borderBottomColor: 'var(--borderColor)'
//     },
//     '& .MuiInput-underline:hover:before': {
//         borderBottomColor: 'var(--borderColor) !important;'
//     }
// })