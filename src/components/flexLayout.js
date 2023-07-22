export const Row = ({ children, style, className }) => {
  <div className={`d-flex row ${className}`} style={style}>
    {children}
  </div>;
};

export const Col = ({ children, style, className }) => (
  <div className={`d-flex col ${className}`} style={style}>
    {children}
  </div>
);
