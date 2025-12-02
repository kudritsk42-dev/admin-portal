import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import { useArticles } from '../state/ArticlesContext';

export const HomePage: React.FC = () => {
  const { articles, sections, searchQuery } = useArticles();
  const navigate = useNavigate();

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return articles;
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [articles, searchQuery]);

  const latest = filteredArticles.slice(0, 4);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="h5">Последние статьи</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="outlined" onClick={() => navigate('/upload')}>
            Загрузка документа
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/article/new/edit')}>
            Новая статья
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {latest.map((article) => (
          <Grid item xs={12} md={6} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>

      <Box>
        <Typography variant="h5" gutterBottom>
          Разделы
        </Typography>
        <Grid container spacing={2}>
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.id}>
              <ArticleCard
                article={{
                  id: `section-${section.id}`,
                  title: section.name,
                  sectionId: section.id,
                  summary: section.description,
                  tags: [],
                  updatedAt: '',
                  content: '',
                }}
                to={`/section/${section.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
