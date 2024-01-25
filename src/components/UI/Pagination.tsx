import styles from "./Pagination.module.css";

interface IProps {
  tasksPerPage: number;
  totalTasks?: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination = ({ tasksPerPage, totalTasks, paginate }: IProps) => {
  const pageNumbers = [];

  if (totalTasks) {
    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button onClick={() => paginate(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
