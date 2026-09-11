import './Button.css';

function Button({ label, color, fontSize, padding, onClick, style }) {
  return (
    <div className="app-button" style={style}>
      <button
        style={{
          backgroundColor: color,
          fontSize: fontSize,
          padding: padding,
        }}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;