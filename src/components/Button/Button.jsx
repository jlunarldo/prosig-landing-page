import "./button.css";

 function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const classes = `button button--${variant} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
export default Button;