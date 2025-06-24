import { useForm } from "react-hook-form";

export default function SubmissionForm({ defaultValues, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" value={defaultValues.userId} {...register("userId")} />

      <div className="mb-3">
        <label className="form-label">URL del archivo</label>
        <input
          type="url"
          className={`form-control ${errors.fileUrl ? "is-invalid" : ""}`}
          {...register("fileUrl", { required: "Este campo es obligatorio" })}
        />
        {errors.fileUrl && (
          <div className="invalid-feedback">{errors.fileUrl.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Comentarios</label>
        <textarea
          className="form-control"
          rows={3}
          {...register("comments")}
        />
      </div>

      <button type="submit" className="btn btn-success">
        {defaultValues?.id ? "Volver a entregar" : "Enviar entrega"}
      </button>
    </form>
  );
}
