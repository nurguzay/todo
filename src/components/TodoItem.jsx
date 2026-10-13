function TodoItem({
  todo,
  onDelete,
  onEdit,
  onToggle,
}) {
  const getPriorityBadge = () => {
    switch (todo.priority) {
      case "high":
        return "text-bg-danger";
      case "medium":
        return "text-bg-warning";
      case "low":
        return "text-bg-success";
      default:
        return "text-bg-secondary";
    }
  };

  const getPriorityText = () => {
    switch (todo.priority) {
      case "high":
        return "Yüksek";
      case "medium":
        return "Orta";
      case "low":
        return "Düşük";
      default:
        return "Belirsiz";
    }
  };

  return (
    <div
      className={`card todo-card mb-3 border-0 shadow-sm ${
        todo.completed ? "todo-completed" : ""
      }`}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between gap-3">

          <div className="d-flex gap-3 flex-grow-1">
            <div className="pt-1">
              <input
                type="checkbox"
                className="form-check-input todo-checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
            </div>

            <div className="flex-grow-1">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <h5
                  className={`mb-0 fw-bold ${
                    todo.completed
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }`}
                >
                  {todo.title}
                </h5>

                <span className={`badge ${getPriorityBadge()}`}>
                  <i className="bi bi-flag-fill me-1"></i>
                  {getPriorityText()}
                </span>

                <span className="badge text-bg-light border">
                  <i className="bi bi-folder-fill me-1"></i>
                  {todo.category || "Genel"}
                </span>
              </div>

              {todo.description && (
                <p className="text-muted mb-3">
                  {todo.description}
                </p>
              )}

              <div className="todo-meta d-flex flex-wrap gap-3">
                <span>
                  <i className="bi bi-check-circle me-1"></i>
                  {todo.completed
                    ? "Tamamlandı"
                    : "Devam Ediyor"}
                </span>

                {todo.dueDate && (
                  <span>
                    <i className="bi bi-calendar3 me-1"></i>
                    Son Tarih: {todo.dueDate}
                  </span>
                )}

                {todo.createdAt && (
                  <span>
                    <i className="bi bi-clock me-1"></i>
                    Oluşturuldu:{" "}
                    {new Date(todo.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => onEdit(todo)}
            >
              <i className="bi bi-pencil-square me-1"></i>
              Düzenle
            </button>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(todo.id)}
            >
              <i className="bi bi-trash3 me-1"></i>
              Sil
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TodoItem;