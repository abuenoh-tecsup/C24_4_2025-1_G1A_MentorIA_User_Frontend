export function SubmissionDetails({ submission }) {
  return (
    <ul className="list-unstyled">
      <li>
        <strong>Archivo:</strong>{" "}
        <a href={submission.fileUrl} target="_blank" rel="noreferrer">
          Ver archivo
        </a>
      </li>
      <li>
        <strong>Comentarios:</strong>{" "}
        {submission.comments || "Sin comentarios"}
      </li>
      <li>
        <strong>Estado:</strong> {submission.status}
      </li>
      <li>
        <strong>Fecha de entrega:</strong>{" "}
        {new Date(submission.submissionDate).toLocaleString()}
      </li>
      <li>
        <strong>Nota:</strong> {submission.grade ?? "—"}
      </li>
    </ul>
  );
}
