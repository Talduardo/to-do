import { useState, useEffect, useCallback } from 'react';
import { List, Task, TaskStatus } from './types';
import * as api from './services/api';
import { Sidebar } from './components/Sidebar';
import { TaskCard } from './components/TaskCard';
import { ListModal, TaskModal, DeleteModal } from './components/Modal';
import './styles/global.css';
import styles from './App.module.css';

type ModalState =
  | { type: 'newList' }
  | { type: 'editList'; list: List }
  | { type: 'deleteList'; list: List }
  | { type: 'newTask' }
  | { type: 'editTask'; task: Task }
  | { type: 'deleteTask'; task: Task }
  | null;

export default function App() {
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeListId, setActiveListId] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => setModal(null);

  // Carrega listas ao montar
  const loadLists = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.fetchLists();
      setLists(data);
      if (data.length > 0 && !activeListId) setActiveListId(data[0].id);
    } catch (e) {
      setError('Erro ao carregar listas. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  }, [activeListId]);

  // Carrega tarefas quando troca de lista
  const loadTasks = useCallback(async (listId: number) => {
    try {
      const data = await api.fetchTasks(listId);
      setTasks(data);
    } catch {
      setTasks([]);
    }
  }, []);

  useEffect(() => { loadLists(); }, []);
  useEffect(() => { if (activeListId) loadTasks(activeListId); }, [activeListId]);

  // Contagem de tarefas por lista (para a sidebar)
  const taskCounts = lists.reduce<Record<number, number>>((acc, l) => {
    acc[l.id] = activeListId === l.id ? tasks.length : (acc[l.id] ?? 0);
    return acc;
  }, {});

  // ── CRUD Listas ─────────────────────────────────────────────────────────

  const handleSaveList = async (name: string, id?: number) => {
    try {
      if (id) {
        const updated = await api.updateList(id, { name });
        setLists((prev) => prev.map((l) => (l.id === id ? updated : l)));
      } else {
        const created = await api.createList({ name });
        setLists((prev) => [...prev, created]);
        setActiveListId(created.id);
        setTasks([]);
      }
      closeModal();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Erro ao salvar lista.');
    }
  };

  const handleDeleteList = async (list: List) => {
    try {
      await api.deleteList(list.id);
      const remaining = lists.filter((l) => l.id !== list.id);
      setLists(remaining);
      if (activeListId === list.id) {
        setActiveListId(remaining.length > 0 ? remaining[0].id : null);
        setTasks([]);
      }
      closeModal();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Erro ao remover lista.');
    }
  };

  // ── CRUD Tarefas ────────────────────────────────────────────────────────

  const handleSaveTask = async (
    data: { title: string; description: string; status: TaskStatus },
    id?: number
  ) => {
    if (!activeListId) return;
    try {
      if (id) {
        const updated = await api.updateTask(activeListId, id, data);
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      } else {
        const created = await api.createTask(activeListId, data);
        setTasks((prev) => [...prev, created]);
      }
      closeModal();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Erro ao salvar tarefa.');
    }
  };

  const handleDeleteTask = async (task: Task) => {
    if (!activeListId) return;
    try {
      await api.deleteTask(activeListId, task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      closeModal();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Erro ao remover tarefa.');
    }
  };

  const handleChangeStatus = async (taskId: number, status: TaskStatus) => {
    if (!activeListId) return;
    try {
      const updated = await api.updateTask(activeListId, taskId, { status });
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    } catch {
      // silently fail on quick status change
    }
  };

  const activeList = lists.find((l) => l.id === activeListId);
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorScreen}>
        <p className={styles.errorIcon}>⚠</p>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryBtn} onClick={loadLists}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Sidebar
        lists={lists}
        taskCounts={taskCounts}
        activeListId={activeListId}
        onSelect={(id) => setActiveListId(id)}
        onNewList={() => setModal({ type: 'newList' })}
        onEditList={(l) => setModal({ type: 'editList', list: l })}
        onDeleteList={(l) => setModal({ type: 'deleteList', list: l })}
      />

      <main className={styles.main}>
        {!activeList ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>☰</span>
            <p>Selecione ou crie uma lista para começar</p>
          </div>
        ) : (
          <>
            <div className={styles.mainHeader}>
              <div>
                <h1 className={styles.listTitle}>{activeList.name}</h1>
                <p className={styles.listMeta}>
                  {tasks.length} tarefa{tasks.length !== 1 ? 's' : ''} · {doneCount} concluída{doneCount !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                className={styles.newTaskBtn}
                onClick={() => setModal({ type: 'newTask' })}
              >
                + Nova tarefa
              </button>
            </div>

            <div className={styles.taskList}>
              {tasks.length === 0 ? (
                <div className={styles.emptyTasks}>
                  <span>✓</span>
                  <p>Nenhuma tarefa ainda.</p>
                  <p className={styles.emptyHint}>Clique em "Nova tarefa" para começar.</p>
                </div>
              ) : (
                tasks.map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onEdit={() => setModal({ type: 'editTask', task: t })}
                    onDelete={() => setModal({ type: 'deleteTask', task: t })}
                    onChangeStatus={(s) => handleChangeStatus(t.id, s)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Modais */}
      {(modal?.type === 'newList') && (
        <ListModal onSave={handleSaveList} onClose={closeModal} />
      )}
      {(modal?.type === 'editList') && (
        <ListModal item={modal.list} onSave={handleSaveList} onClose={closeModal} />
      )}
      {(modal?.type === 'deleteList') && (
        <DeleteModal
          title="Remover lista"
          message={`Tem certeza que deseja remover a lista "${modal.list.name}"?`}
          warning={`Todas as tarefas vinculadas a esta lista também serão removidas permanentemente.`}
          onConfirm={() => handleDeleteList(modal.list)}
          onClose={closeModal}
        />
      )}
      {(modal?.type === 'newTask') && (
        <TaskModal onSave={handleSaveTask} onClose={closeModal} />
      )}
      {(modal?.type === 'editTask') && (
        <TaskModal item={modal.task} onSave={handleSaveTask} onClose={closeModal} />
      )}
      {(modal?.type === 'deleteTask') && (
        <DeleteModal
          title="Remover tarefa"
          message={`Tem certeza que deseja remover "${modal.task.title}"?`}
          onConfirm={() => handleDeleteTask(modal.task)}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
