import { axios } from './axios';

export type Todo = { id: number; title: string; completed: boolean };

export const api = {
  list: async () => {
    const { data } = await axios.get<Todo[]>('/todos', {
      params: { _limit: 10 },
    });
    return data;
  },
  create: async (title: string) => {
    const { data } = await axios.post<Todo>('/todos', {
      title,
      completed: false,
      userId: 1,
    });
    return data;
  },
  toggle: async (id: number, current: boolean) => {
    const { data } = await axios.patch<Todo>(`/todos/${id}`, {
      completed: !current,
    });
    return data;
  },
  remove: async (id: number) => {
    await axios.delete<void>(`/todos/${id}`);
  },
};
