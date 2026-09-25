import Container from "./container";
function Section({ children, className = "", id }) {
  return (
    <section id={id} className={` py-10 md:py-14 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
export default Section;
