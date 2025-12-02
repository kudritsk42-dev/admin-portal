import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LabelIcon from '@mui/icons-material/Label';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useArticles } from '../state/ArticlesContext';
import { getSectionName } from '../utils/classify';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles, deleteArticle } = useArticles();
  const navigate = useNavigate();

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return <Typography>Статья не найдена</Typography>;
  }

  const handleDelete = () => {
    deleteArticle(article.id);
    navigate(`/section/${article.sectionId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">{article.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {getSectionName(article.sectionId)} • Обновлено {article.updatedAt}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {article.tags.map((tag) => (
          <Chip key={tag} label={tag} icon={<LabelIcon />} />
        ))}
      </Stack>
      <Divider />
      <ReactMarkdown>{article.content}</ReactMarkdown>
      <Divider />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(`/article/${article.id}/edit`)}>
          Редактировать
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Удалить
        </Button>
      </Stack>
    </Box>
  );
};
