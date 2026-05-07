import { useState, useEffect, useRef } from 'react';
import { List, Task, TaskStatus } from '../types';
import styles from './Modal.module.css';

// ── Base Modal ──────────────────────────────────────────────────────────────

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: BaseModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── List Modal ───────────────────────────────────────────────────────────────

interface ListModalProps {
  item?: List;
  onSave: (name: string, id?: number) => void;
  onClose: () => void;
}

export function ListModal({ item, onSave, onClose }: ListModalProps) {
  const [name, setName] = useState(item?.name ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => { if (name.trim()) onSave(name.trim(), item?.id); };

  return (
    <Modal title={item ? 'Editar lista' : 'Nova lista'} onClose={onClose}>
      <div className={styles.body}>
        <label className={styles.label}>Nome da lista</label>
        <input
          ref={inputRef}
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Ex: Trabalho, Compras..."
        />
      </div>
      <div className={styles.footer}>
        <button className={styles.btnSecondary} onClick={onClose}>Cancelar</button>
        <button className={styles.btnPrimary} onClick={submit} disabled={!name.trim()}>
          {item ? 'Salvar' : 'Criar lista'}
        </button>
      </div>
    </Modal>
  );
}

// ── Task Modal ───────────────────────────────────────────────────────────────

interface TaskModalProps {
  item?: Task;
  onSave: (data: { title: string; description: string; status: TaskStatus }, id?: number) => void;
  onClose: () => void;
}

export function TaskModal({ item, onSave, onClose }: TaskModalProps) {
  const [title, setTitle] = useState(item?.title ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(item?.status ?? 'pending');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    if (title.trim()) onSave({ title: title.trim(), description, status }, item?.id);
  };

  return (
    <Modal title={item ? 'Editar tarefa' : 'Nova tarefa'} onClose={onClose}>
      <div className={styles.body}>
        <label className={styles.label}>Título</label>
        <input
          ref={inputRef}
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Título da tarefa"
        />

        <label className={styles.label} style={{ marginTop: 12 }}>Descrição (opcional)</label>
        <textarea
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes da tarefa..."
        />

        <label className={styles.label} style={{ marginTop: 12 }}>Status</label>
        <select
          className={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value="pending">Pendente</option>
          <option value="progress">Em andamento</option>
          <option value="done">Concluída</option>
        </select>
      </div>
      <div className={styles.footer}>
        <button className={styles.btnSecondary} onClick={onClose}>Cancelar</button>
        <button className={styles.btnPrimary} onClick={submit} disabled={!title.trim()}>
          {item ? 'Salvar' : 'Criar tarefa'}
        </button>
      </div>
    </Modal>
  );
}

// ── Delete Confirm Modal ─────────────────────────────────────────────────────

interface DeleteModalProps {
  title: string;
  message: string;
  warning?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteModal({ title, message, warning, onConfirm, onClose }: DeleteModalProps) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className={styles.body}>
        <p className={styles.confirmText}>{message}</p>
        {warning && <div className={styles.warning}>⚠ {warning}</div>}
      </div>
      <div className={styles.footer}>
        <button className={styles.btnSecondary} onClick={onClose}>Cancelar</button>
        <button className={styles.btnDanger} onClick={onConfirm}>Remover</button>
      </div>
    </Modal>
  );
}
