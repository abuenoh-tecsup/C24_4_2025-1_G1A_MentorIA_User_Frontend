import React, { useState } from "react";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: '#f7fafd' }}>
      <div className="card shadow p-4" style={{ maxWidth: 480, width: '100%', borderRadius: 16 }}>
        <div className="text-center mb-3">
          <div style={{ fontSize: 48, color: '#0d6efd' }}>
            <i className="bi bi-envelope-paper-fill"></i>
          </div>
          <h2 className="fw-bold mt-2">Contacto</h2>
          <p className="text-secondary mb-2" style={{ fontSize: 16 }}>
            ¿Tienes dudas, sugerencias o comentarios? <br />¡Escríbenos usando el formulario y te responderemos lo antes posible!
          </p>
        </div>
        {submitted ? (
          <div className="alert alert-success mt-4 text-center">¡Gracias por contactarnos! Te responderemos pronto.</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tucorreo@ejemplo.com"
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">Mensaje</label>
              <textarea
                className="form-control form-control-lg"
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="¿En qué podemos ayudarte?"
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" style={{ fontSize: 18, borderRadius: 8 }}>
              Enviar mensaje
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactPage; 