import styles from "./sectiongeneric.module.css";


function SectionGeneric({
  id,
  eyebrow,
  title,
  children,
  className = "",
  highlight,
  backgroundColor="var(--cream)",
  titleMaxWidth
}) {
    const renderTitle = () => {
  if (!highlight) return title;

  const index = title.indexOf(highlight);

  if (index === -1) return title;

  return (
    <>
      {title.slice(0, index)}
      <span className={styles.sectionHighlight}>
        {highlight}
      </span>
      {title.slice(index + highlight.length)}
    </>
  );
};
    

  return (
    <section
      id={id}
      className={`${styles.sec} ${className}`.trim()}
      style={{ backgroundColor }}
    >
      <div className={styles.wrap}>
        {eyebrow && (
            <p className={styles.sectionEyebrow}>
              {eyebrow}
            </p>
          )}

          {title && (
          <h2  className={styles.sectionTitle} 
                 style={{ maxWidth: titleMaxWidth }}
                >
            {renderTitle()}
          </h2>
        )}
        {children && (
          <div className={styles.sectionContent}  style={{ marginTop: "16px" }}>
            {children}
          </div>
        )}
      
      </div>
    </section>
  );
}

export default SectionGeneric;
