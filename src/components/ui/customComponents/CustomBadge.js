import { Badge } from '@mui/material';
import styled from 'styled-components';

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      minWidth: 5,
      right: 7,
      top: 7,
      color: '#fff',
      height: '10px',
      width: '10px',
      backgroundColor: 'var(--notificationBgColor)',
      fontSize: '0.5rem',
      padding: '0',
    },
  }));