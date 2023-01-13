import {Component} from "react";
import {Link} from "react-router-dom";

class HomeButton extends Component {
    render() {
        return (
            <Link to="/" className="homeButton">
            {/*    add image house.fill.png from public directory*/}
                <img src={process.env.PUBLIC_URL + "/house.fill.png"} alt="Home" />
            </Link>
        );
    }
}

export default HomeButton;