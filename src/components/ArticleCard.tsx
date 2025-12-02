import LabelIcon from '@mui/icons-material/Label';
import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Article } from '../data/mockData';
import { getSectionName } from '../utils/classify';

type Props = {
  article: Article;
  to?: string;
};

export const ArticleCard: React.FC<Props> = ({ article, to }) => (
  <Card variant="outlined">
    <CardActionArea component={RouterLink} to={to ?? `/article/${article.id}`}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {article.updatedAt ? `${getSectionName(article.sectionId)} • ${article.updatedAt}` : getSectionName(article.sectionId)}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {article.summary}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {article.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" icon={<LabelIcon />} />
          ))}
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card>
);
