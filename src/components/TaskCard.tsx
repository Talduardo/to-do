import { Task, TaskStatus } from '../types';
import styles from './TaskCard.module.css';

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: 'Pendente',
  progress: 'Em andamento',
  done: 'Concluída',
};

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: (status: TaskStatus) => void;
}

export function TaskCard({ task, onEdit, onDelete, onChangeStatus }: Props) {
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <p className={`${styles.title} ${task.status === 'done' ? styles.done : ''}`}>
            {task.title}
          </p>
          {task.description && (
            <p className={styles.desc}>{task.description}</p>
          )}
        </div>
        <div className={styles.actions}>
          <button title="Editar" onClick={onEdit}>✎</button>
          <button title="Remover" className={styles.dangerBtn} onClick={onDelete}>✕</button>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.statusGroup}>
          <span className={`${styles.badge} ${styles[task.status]}`}>
            {STATUS_LABEL[task.status]}
          </span>
          <select
            className={styles.select}
            value={task.status}
            onChange={(e) => onChangeStatus(e.target.value as TaskStatus)}
          >
            <option value="pending">Pendente</option>
            <option value="progress">Em andamento</option>
            <option value="done">Concluída</option>
          </select>
        </div>
        <span className={styles.date}>{fmtDate(task.createdAt)}</span>
      </div>
    </div>
  );
}
