import LabelIcon from '@mui/icons-material/Label';
import { Box, Button, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticles } from '../state/ArticlesContext';

export const EditArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles, sections, addArticle, updateArticle } = useArticles();
  const navigate = useNavigate();

  const existing = useMemo(() => articles.find((a) => a.id === id), [articles, id]);
  const isNew = !existing;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [sectionId, setSectionId] = useState(existing?.sectionId ?? sections[0]?.id ?? '');
  const [tags, setTags] = useState<string[]>(existing?.tags ?? []);
  const [content, setContent] = useState(existing?.content ?? '');
  const [summary, setSummary] = useState(existing?.summary ?? '');

  const handleAddTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !sectionId) return;

    const payload = { title, sectionId, tags, content, summary };
    const saved = isNew ? addArticle(payload) : updateArticle(existing!.id, payload);
    if (saved) {
      navigate(`/article/${saved.id}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">{isNew ? 'Новая статья' : 'Редактирование статьи'}</Typography>
      <TextField label="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
      <TextField
        select
        label="Раздел"
        value={sectionId}
        onChange={(e) => setSectionId(e.target.value)}
        required
        fullWidth
      >
        {sections.map((section) => (
          <MenuItem key={section.id} value={section.id}>
            {section.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Теги (через запятую)"
        value={tags.join(', ')}
        onChange={(e) => setTags(
          e.target.value
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        )}
        helperText="Используйте запятую для разделения тегов"
        fullWidth
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} icon={<LabelIcon />} />
        ))}
      </Stack>
      <TextField
        label="Краткое описание"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
        fullWidth
        multiline
        minRows={2}
      />
      <TextField
        label="Контент (markdown)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        fullWidth
        multiline
        minRows={8}
      />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button type="submit" variant="contained">
          Сохранить
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button variant="text" onClick={() => handleAddTag('черновик')}>Добавить тег "черновик"</Button>
      </Stack>
    </Box>
  );
};
