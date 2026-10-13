import { useEffect, useState } from "react";

import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

function TodoPage() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSave = (formData) => {
    if (editingTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id
            ? {
                ...todo,
                ...formData,
              }
            : todo
        )
      );

      setEditingTodo(null);
      return;
    }

    const newTodo = {
      id: Date.now(),
      ...formData,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    if (editingTodo?.id === id) {
      setEditingTodo(null);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));

    if (editingTodo?.completed) {
      setEditingTodo(null);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const activeCount = todos.filter(
    (todo) => !todo.completed
  ).length;

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div>
          <h1>
            <i className="bi bi-check2-square me-2"></i>
            TODO Uygulaması
          </h1>

          <p>
            React, LocalStorage ve CRUD işlemleri
          </p>
        </div>

        <div className="header-stats">
          <div>
            <strong>{todos.length}</strong>
            <span>Toplam</span>
          </div>

          <div>
            <strong>{activeCount}</strong>
            <span>Aktif</span>
          </div>

          <div>
            <strong>{completedCount}</strong>
            <span>Tamamlanan</span>
          </div>
        </div>
      </header>

      <main className="todo-layout">
        {/* SOL TARAF */}
        <section className="todo-left-panel">
          <TodoForm
            key={editingTodo?.id ?? "new"}
            onSave={handleSave}
            editingTodo={editingTodo}
          />
        </section>

        {/* SAĞ TARAF */}
        <section className="todo-right-panel">
          <div className="todo-list-header">
            <div>
              <h4 className="mb-1">
                <i className="bi bi-list-task me-2"></i>
                Görevler
              </h4>

              <small className="text-muted">
                {filteredTodos.length} görev gösteriliyor
              </small>
            </div>

            <div className="todo-filters">
              <button
                type="button"
                className={`btn btn-sm ${
                  filter === "all"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setFilter("all")}
              >
                <i className="bi bi-grid me-1"></i>
                Tümü
              </button>

              <button
                type="button"
                className={`btn btn-sm ${
                  filter === "active"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setFilter("active")}
              >
                <i className="bi bi-hourglass me-1"></i>
                Aktif
              </button>

              <button
                type="button"
                className={`btn btn-sm ${
                  filter === "completed"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setFilter("completed")}
              >
                <i className="bi bi-check-circle me-1"></i>
                Tamamlanan
              </button>

              {completedCount > 0 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleClearCompleted}
                  title="Tamamlanan görevleri temizle"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              )}
            </div>
          </div>

          {/* SADECE BURASI SCROLL */}
          <div className="todo-list-scroll">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>

                <h5>Görev bulunamadı</h5>

                <p>
                  Yeni bir görev ekleyerek başlayabilirsin.
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggle={handleToggle}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default TodoPage;