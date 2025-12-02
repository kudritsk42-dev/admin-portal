import LabelIcon from '@mui/icons-material/Label';
import { Box, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import { useArticles } from '../state/ArticlesContext';
import { getSectionName } from '../utils/classify';

export const SectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = useArticles();
  const [filter, setFilter] = useState('');

  const sectionName = getSectionName(id ?? '');

  const sectionArticles = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return articles.filter(
      (article) =>
        article.sectionId === id &&
        (!q || article.title.toLowerCase().includes(q) || article.tags.some((tag) => tag.toLowerCase().includes(q))),
    );
  }, [articles, filter, id]);

  const tags = Array.from(new Set(sectionArticles.flatMap((article) => article.tags)));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {sectionName}
        </Typography>
        <TextField
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Фильтр по названию и тегам"
          fullWidth
          margin="normal"
        />
        {tags.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" icon={<LabelIcon />} />
            ))}
          </Stack>
        )}
      </Box>
      <Grid container spacing={2}>
        {sectionArticles.map((article) => (
          <Grid item xs={12} md={6} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
