import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '../state/ArticlesContext';
import { classifySectionByFileName } from '../utils/classify';

export const UploadPage: React.FC = () => {
  const { sections, addArticle } = useArticles();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [sectionId, setSectionId] = useState(sections[0]?.id ?? '');
  const [tags, setTags] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const autoSection = classifySectionByFileName(file.name);
    setSectionId(autoSection);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fileName) return;

    const title = fileName.replace(/\.[^/.]+$/, '');
    const content = `## Загруженный документ\nФайл **${fileName}** был загружен пользователем.\n\nСодержимое документа конвертируется на последующих этапах, сейчас показан шаблонный текст.`;
    const summary = 'Импортированный документ';

    const article = addArticle({ title, sectionId, tags, content, summary });
    navigate(`/article/${article.id}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Загрузка документа
      </Typography>
      <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>Выбрать файл
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {fileName && (
        <Typography variant="body1" color="text.secondary">
          Выбран файл: {fileName}
        </Typography>
      )}
      <TextField
        select
        label="Раздел"
        value={sectionId}
        onChange={(e) => setSectionId(e.target.value)}
        helperText="Раздел предлагается автоматически по имени файла"
        required
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
      />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button type="submit" variant="contained" disabled={!fileName}>
          Создать статью
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Отмена
        </Button>
      </Stack>
    </Box>
  );
};
