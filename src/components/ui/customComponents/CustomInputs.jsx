import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const CreateGroupInput = styled(TextField)({
    '& label': {
        color: 'var(--fontColor)'
    },
    '& input': {
        color: 'var(--fontColor)'
    }, 
    '& .MuiInputBase-root:before': {
        borderBottom: '1px solid var(--borderColor)'
    },
    '& .MuiInputBase-root:hover': {
        borderBottom: '1px solid white'
    }
    
})