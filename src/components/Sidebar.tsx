import { List } from '../types';
import styles from './Sidebar.module.css';

interface Props {
  lists: List[];
  taskCounts: Record<number, number>;
  activeListId: number | null;
  onSelect: (id: number) => void;
  onNewList: () => void;
  onEditList: (list: List) => void;
  onDeleteList: (list: List) => void;
}

export function Sidebar({
  lists,
  taskCounts,
  activeListId,
  onSelect,
  onNewList,
  onEditList,
  onDeleteList,
}: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.title}>Minhas listas</span>
        <button className={styles.newBtn} onClick={onNewList} title="Nova lista">
          +
        </button>
      </div>

      <div className={styles.list}>
        {lists.length === 0 && (
          <p className={styles.empty}>Nenhuma lista criada.</p>
        )}
        {lists.map((l) => (
          <div
            key={l.id}
            className={`${styles.item} ${activeListId === l.id ? styles.active : ''}`}
            onClick={() => onSelect(l.id)}
          >
            <div className={styles.itemLeft}>
              <span className={styles.itemIcon}>☰</span>
              <span className={styles.itemName}>{l.name}</span>
            </div>
            <div className={styles.itemRight}>
              <span className={styles.count}>{taskCounts[l.id] ?? 0}</span>
              <div className={styles.actions}>
                <button
                  title="Editar lista"
                  onClick={(e) => { e.stopPropagation(); onEditList(l); }}
                >
                  ✎
                </button>
                <button
                  title="Remover lista"
                  className={styles.dangerBtn}
                  onClick={(e) => { e.stopPropagation(); onDeleteList(l); }}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
