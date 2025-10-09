import '@testing-library/jest-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.stubEnv('VITE_API_BASE_URL', 'http://test.local');
