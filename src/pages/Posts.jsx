import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import styles from './Posts.module.css';

function Posts() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const searchQuery = searchParams.get('q') || '';
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTask = currentPage * postsPerPage;
  const indexOfFirstTask = indexOfLastTask - postsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / postsPerPage);

  const handleSearch = (e) => {
    setSearchParams({ q: e.target.value });
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search tasks..."
        className={styles.searchInput}
        onChange={handleSearch}
        value={searchQuery}
      />
      <div className={styles.postGrid}>
        {currentTasks.map((task) => (
          <div
            key={task._id}
            className={styles.cardWrapper}
            style={{ animation: 'fadeIn 0.5s' }}
          >
            <Card title={task.title}>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300 font-medium">{task.status}</span>
                <button
                  className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => handleDelete(task._id)}
                  aria-label="Delete task"
                >
                  Delete
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Posts;