import Container from "./container"
function Section({children,className='',id}){

    return(
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            <Container>{children}</Container>
        </section>
    )
}export default Section