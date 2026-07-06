import '../styles/Card.css'

const Card = ({ isLoading, stat, info }) => {
    return(
        <div className="Card">
            {isLoading ? (
                <h1 className="Loading">Loading...</h1>
            ) : <h1>{stat}</h1>}
            <h2>{info}</h2>
        </div>
    )
}

export default Card;
