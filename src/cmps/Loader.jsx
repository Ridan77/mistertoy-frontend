export function Loader({ text = 'Loading, please wait...' }) {
    return (
        <section className="loader-container">
            <div className="animation">
                <span className="animate__animated animate__bounce animate__infinite animate__delay-1s"></span>
                <span className="dot2"></span>
                <span></span>
            </div>
            <p>{text}</p>
        </section>
    )
}
