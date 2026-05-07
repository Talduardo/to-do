import { List, Task, CreateListDTO, CreateTaskDTO, UpdateTaskDTO } from '../types';

// frontend/src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_URL || '/lists';

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro desconhecido.' }));
    throw new Error(err.error || 'Erro na requisição.');
  }
  return res.json() as Promise<T>;
};

// ── Listas ──────────────────────────────────────────────────────────────────

export const fetchLists = (): Promise<List[]> =>
  fetch(BASE).then((r) => handleResponse<List[]>(r));

export const fetchListById = (id: number): Promise<List> =>
  fetch(`${BASE}/${id}`).then((r) => handleResponse<List>(r));

export const createList = (dto: CreateListDTO): Promise<List> =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then((r) => handleResponse<List>(r));

export const updateList = (id: number, dto: CreateListDTO): Promise<List> =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then((r) => handleResponse<List>(r));

export const deleteList = (id: number): Promise<{ message: string }> =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' }).then((r) =>
    handleResponse<{ message: string }>(r)
  );

// ── Tarefas ──────────────────────────────────────────────────────────────────

export const fetchTasks = (listId: number): Promise<Task[]> =>
  fetch(`${BASE}/${listId}/tasks`).then((r) => handleResponse<Task[]>(r));

export const createTask = (listId: number, dto: CreateTaskDTO): Promise<Task> =>
  fetch(`${BASE}/${listId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then((r) => handleResponse<Task>(r));

export const updateTask = (
  listId: number,
  taskId: number,
  dto: UpdateTaskDTO
): Promise<Task> =>
  fetch(`${BASE}/${listId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then((r) => handleResponse<Task>(r));

export const deleteTask = (
  listId: number,
  taskId: number
): Promise<{ message: string }> =>
  fetch(`${BASE}/${listId}/tasks/${taskId}`, { method: 'DELETE' }).then((r) =>
    handleResponse<{ message: string }>(r)
  );
