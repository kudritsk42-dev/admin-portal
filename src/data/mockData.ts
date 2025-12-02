export type Section = {
  id: string;
  name: string;
  description: string;
};

export type Article = {
  id: string;
  title: string;
  sectionId: string;
  summary: string;
  tags: string[];
  content: string;
  updatedAt: string;
};

export const sections: Section[] = [
  {
    id: 'infra',
    name: 'Инфраструктура',
    description: 'Серверы, виртуализация и платформенная инфраструктура.',
  },
  {
    id: 'network',
    name: 'Сети',
    description: 'Корпоративные сети, Wi-Fi и каналы связи.',
  },
  {
    id: 'mail',
    name: 'Почта',
    description: 'Почтовые сервисы, Exchange и смежные системы.',
  },
  {
    id: 'security',
    name: 'Безопасность',
    description: 'Информационная безопасность и политики.',
  },
  {
    id: 'business',
    name: 'Бизнес-системы',
    description: 'Прикладные системы для бизнеса и сотрудников.',
  },
];

export const initialArticles: Article[] = [
  {
    id: 'mail-architecture',
    title: 'Архитектура почтового сервера',
    sectionId: 'mail',
    summary: 'Ключевые компоненты корпоративного почтового сервиса.',
    tags: ['exchange', 'smtp', 'архитектура'],
    updatedAt: '2024-10-05',
    content:
      '### Обзор\n- Используется кластер Exchange с балансировкой нагрузки.\n- Бэкенд хранится в DAG на два ЦОДа.\n- SMTP шлюзы вынесены в DMZ для фильтрации угроз.\n\nДоступ организован через Outlook и OWA, а для мобильных клиентов используется ActiveSync.',
  },
  {
    id: 'rds-farm',
    title: 'RDS ферма для удалённого доступа',
    sectionId: 'infra',
    summary: 'Описание фермы удалённых рабочих столов для подрядчиков.',
    tags: ['rds', 'удалённый доступ', 'windows'],
    updatedAt: '2024-09-12',
    content:
      '### Компоненты\n- Коллекция RDS на базе Windows Server 2022.\n- RD Gateway и MFA для внешнего доступа.\n- Авто-масштабирование через шаблоны в виртуальной среде.\n\nМониторинг и отчётность ведутся в Zabbix и Prometheus.',
  },
  {
    id: 'password-policy',
    title: 'Политика безопасности паролей',
    sectionId: 'security',
    summary: 'Правила, повышающие безопасность учётных записей.',
    tags: ['пароли', 'security', 'правила'],
    updatedAt: '2024-08-20',
    content:
      '### Требования\n- Минимум 12 символов, буквы разных регистров, цифры и спецсимволы.\n- Смена каждые 90 дней, история из 10 паролей.\n- Запрет повторного использования корпоративных паролей вне работы.\n\n### Контроль\nИспользуем Azure AD Password Protection и мониторинг утечек.',
  },
];
