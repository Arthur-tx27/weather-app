import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      {icon && <img src={icon} alt="" className={styles.icon} />}
      <input className={`${styles.input} ${className}`} {...props} />
    </div>
  );
}
