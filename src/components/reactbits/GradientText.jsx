import './GradientText.css';

export default function GradientText({ children, className = '', style }) {
  return (
    <span className={`gradient-text ${className}`} style={style}>
      {children}
    </span>
  );
}
