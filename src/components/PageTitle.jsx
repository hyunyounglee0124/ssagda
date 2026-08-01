export default function PageTitle({ title, description, actions }) {
  return (
    <div className="page-title-row">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-title-actions">{actions}</div>}
    </div>
  );
}
