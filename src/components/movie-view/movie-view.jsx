import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";

export const MovieView = ({ user, movies, token }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    const addToFavorites = () => {
        fetch(`https://myflixapplication.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie._id)}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json"
        })
            .then((res) => {
                if (res.ok) {
                    alert("Movie added to favorites!")
                    return (res.json);
                } else {
                    alert("Could not add to favorites");
                }
            })
            .catch((e) => {
                alert("Error: " + e);
            });
    }

    return (
        <div className="movieview-container">
            <Row>
                <Col>
                    <img src={movie.ImagePath} alt={movie.Title + " Cover Image"} style={{ width: "100%" }} />
                    <div className="text-center"><small className="picture-reference">Cover art provided by <a href={movie.ImagePath} className="picture-link">Wikipedia</a></small></div>
                </Col>
                <Col>
                    <div>
                        <span className="moviecard-title">{movie.Title}</span>
                    </div>
                    <div>
                        <p className="label">Director</p>
                        <span className="moviecard-director">{movie.Director.Name}</span>
                    </div>
                    <div>
                        <p className="label">Genre</p>
                        <span className="moviecard-genre">{movie.Genre.Name}</span>
                    </div>
                    <span className="footer"><motion.button
                        text-center
                        className="add-to-favorites-large"
                        transition={{ duration: .3 }}
                        whileHover={{ scale: 1.5, rotateZ: 360 }}
                        whileTap={{ scale: 1 }}
                        onClick={addToFavorites}>⭐</motion.button></span>

                </Col>
            </Row>
            <Row>
                <div className="text-center description">
                    <span className="movie-description align-items-center">{movie.Description}</span><br />
                </div>
                <div className="footer">
                    <Link to={`/`}>
                        <motion.div
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 1 }}>
                            <Button className="back-button">Back</Button>
                        </motion.div>
                    </Link>
                </div>


            </Row>
        </div>
    );
};