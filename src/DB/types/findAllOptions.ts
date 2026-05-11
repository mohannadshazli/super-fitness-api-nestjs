export interface FindAllOptions {
  where?: string;

  params?: Record<string, any>;

  orderBy?: string;

  page?: number;

  limit?: number;

  orderDirection?: 'ASC' | 'DESC';

  select?: string[];
}