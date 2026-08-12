export default function Loader({ text = "Discovering places..." }) {
  return (
    <div className="loader-wrap" role="status">
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
}
