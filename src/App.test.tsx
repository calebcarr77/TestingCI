import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import axios from 'axios';

vi.mock('axios', () => {
  const mock = {
    create: () => mock,
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: { response: { use: vi.fn() } },
  };
  return { default: mock };
});

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

const ok = <T,>(data: T) => ({ data });

describe('Todo app', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('loads, adds, toggles, and deletes todos', async () => {
    // 1. Initial list
    mockedAxios.get.mockResolvedValueOnce(
      ok([{ id: 1, title: 'Seed', completed: false }])
    );

    // 2. Create new todo
    mockedAxios.post.mockResolvedValueOnce(
      ok({ id: 2, title: 'New Task', completed: false })
    );

    // 3. Toggle existing todo
    mockedAxios.patch.mockResolvedValueOnce(
      ok({ id: 1, title: 'Seed', completed: true })
    );

    // 4. Delete todo
    mockedAxios.delete.mockResolvedValueOnce(ok({}));

    render(<App />);

    // should show Seed
    expect(await screen.findByText('Seed')).toBeInTheDocument();

    // add new todo
    await userEvent.type(screen.getByLabelText(/new todo/i), 'New Task');
    await userEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(await screen.findByText('New Task')).toBeInTheDocument();

    // toggle checkbox
    await userEvent.click(
      screen.getByRole('checkbox', { name: /toggle seed/i })
    );

    // delete
    await userEvent.click(screen.getByRole('button', { name: /delete seed/i }));

    expect(await screen.findByText('New Task')).toBeInTheDocument();
    expect(screen.queryByText('Seed')).toBeNull();
  });
});
