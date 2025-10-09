import { useEffect, useState } from 'react';
import { api, type Todo } from './utils/services/todo';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .list()
      .then(setTodos)
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const created = await api.create(title.trim());
      setTodos((t) => [created, ...t]);
      setTitle('');
    } catch (e: any) {
      setError(e.message || 'Failed to add');
    }
  }

  async function toggle(todo: Todo) {
    try {
      const updated = await api.toggle(todo.id, todo.completed);
      setTodos((t) => t.map((x) => (x.id === todo.id ? updated : x)));
    } catch (e: any) {
      setError(e.message || 'Failed to toggle');
    }
  }

  async function remove(id: number) {
    try {
      await api.remove(id);
      setTodos((t) => t.filter((x) => x.id !== id));
    } catch (e: any) {
      setError(e.message || 'Failed to delete');
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          aria-label="New todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={!title.trim()}
        >
          Add
        </button>
      </form>

      {loading && <p>Loading…</p>}
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-red-700"
        >
          {error}
        </p>
      )}

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
          >
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggle(t)}
                aria-label={`toggle ${t.title}`}
                className="h-4 w-4"
              />
              <span
                className={
                  t.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }
              >
                {t.title}
              </span>
            </label>

            <button
              onClick={() => remove(t.id)}
              aria-label={`delete ${t.title}`}
              className="rounded-md px-2 py-1 text-sm text-red-700 hover:bg-red-50"
            >
              Delete
            </button>
          </li>
        ))}
        {!loading && todos.length === 0 && (
          <li className="text-gray-500">No tasks yet — add one above.</li>
        )}
      </ul>

      <p className="mt-6 text-xs text-gray-500">
        Uses {import.meta.env.VITE_API_BASE_URL || 'JSONPlaceholder'}
      </p>
    </main>
  );
}
