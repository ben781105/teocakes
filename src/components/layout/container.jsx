function Container({ children, className = "" }) {
  return (
    <div
      className={` w-full max-w-6xl mx-auto px-6 md:px-8 overflow-hidden  ${className}`}
    >
      {children}
    </div>
  );
}
export default Container;
