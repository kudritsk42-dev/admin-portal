import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Article, Section, initialArticles, sections as initialSections } from '../data/mockData';

export type ArticleInput = Omit<Article, 'id' | 'updatedAt'> & { id?: string };

type ArticlesContextValue = {
  sections: Section[];
  articles: Article[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  addArticle: (data: ArticleInput) => Article;
  updateArticle: (id: string, data: ArticleInput) => Article | undefined;
  deleteArticle: (id: string) => void;
};

const STORAGE_KEY = 'corporate-wiki-data';

const ArticlesContext = createContext<ArticlesContextValue | undefined>(undefined);

const loadFromStorage = (): { articles: Article[] } | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.warn('Не удалось прочитать данные из localStorage', error);
    return null;
  }
};

const persistToStorage = (articles: Article[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ articles }));
};

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections] = useState<Section[]>(initialSections);
  const [articles, setArticles] = useState<Article[]>(() => {
    const stored = typeof window !== 'undefined' ? loadFromStorage() : null;
    return stored?.articles ?? initialArticles;
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      persistToStorage(articles);
    }
  }, [articles]);

  const addArticle = (data: ArticleInput): Article => {
    const newArticle: Article = {
      ...data,
      id: data.id ?? crypto.randomUUID(),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setArticles((prev) => [newArticle, ...prev]);
    return newArticle;
  };

  const updateArticle = (id: string, data: ArticleInput): Article | undefined => {
    let updated: Article | undefined;
    setArticles((prev) =>
      prev.map((article) => {
        if (article.id === id) {
          updated = {
            ...article,
            ...data,
            id: article.id,
            updatedAt: new Date().toISOString().slice(0, 10),
          };
          return updated;
        }
        return article;
      }),
    );
    return updated;
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const value = useMemo<ArticlesContextValue>(
    () => ({ sections, articles, searchQuery, setSearchQuery, addArticle, updateArticle, deleteArticle }),
    [articles, sections, searchQuery],
  );

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>;
};

export const useArticles = (): ArticlesContextValue => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles должен использоваться внутри ArticlesProvider');
  }
  return context;
};
