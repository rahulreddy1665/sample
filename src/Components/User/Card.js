const Card = ({ name, img }) => {
    return (
        <div className="card">
            <img src={img} alt={name} />
            <h2>{name}</h2>
        </div>
    );
};

export default Card;