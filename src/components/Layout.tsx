import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useArticles } from '../state/ArticlesContext';
import { getSectionName } from '../utils/classify';

const drawerWidth = 280;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sections, searchQuery, setSearchQuery } = useArticles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = useMemo(
    () => [
      ...sections.map((section) => ({
        path: `/section/${section.id}`,
        label: section.name,
        icon: <LibraryBooksIcon />,
      })),
      { path: '/upload', label: 'Загрузка документа', icon: <UploadFileIcon /> },
    ],
    [sections],
  );

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6">Разделы</Typography>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <LibraryBooksIcon />
          <Typography variant="h6" noWrap component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
            Корпоративная Wiki
          </Typography>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            placeholder="Поиск по статьям и тегам"
            sx={{ ml: 4, minWidth: 360, display: { xs: 'none', sm: 'block' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }} color="inherit">
            Быстрый доступ к разделам: {sections.map((s) => getSectionName(s.id)).join(', ')}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
