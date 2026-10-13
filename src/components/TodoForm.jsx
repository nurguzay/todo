import { useState } from "react";

function TodoForm({ onSave, editingTodo }) {
  const [formData, setFormData] = useState({
    title: editingTodo?.title ?? "",
    description: editingTodo?.description ?? "",
    category: editingTodo?.category ?? "Genel",
    priority: editingTodo?.priority ?? "medium",
    dueDate: editingTodo?.dueDate ?? "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    });
  };

  return (
    <div className="todo-form-card mb-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1">
          <i className="bi bi-plus-circle-fill me-2 text-primary"></i>
          {editingTodo ? "Görevi Düzenle" : "Yeni Görev Ekle"}
        </h4>

        <p className="text-muted mb-0">
          Görevin detaylarını aşağıdan belirleyebilirsin.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-card-text me-2"></i>
            Görev Başlığı *
          </label>

          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Örn: React projesini tamamla"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-text-paragraph me-2"></i>
            Açıklama
          </label>

          <textarea
            name="description"
            className="form-control"
            rows="3"
            placeholder="Görev hakkında kısa açıklama..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-folder me-2"></i>
              Kategori
            </label>

            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Genel">Genel</option>
              <option value="İş">İş</option>
              <option value="Kişisel">Kişisel</option>
              <option value="Eğitim">Eğitim</option>
              <option value="Proje">Proje</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-flag me-2"></i>
              Öncelik
            </label>

            <select
              name="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-calendar-event me-2"></i>
              Son Tarih
            </label>

            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`btn ${
            editingTodo ? "btn-warning" : "btn-primary"
          } px-4`}
        >
          <i
            className={`bi ${
              editingTodo
                ? "bi-pencil-square"
                : "bi-plus-lg"
            } me-2`}
          ></i>

          {editingTodo ? "Görevi Güncelle" : "Görev Ekle"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;