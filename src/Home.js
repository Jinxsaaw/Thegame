import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Home = ({ name, updateName }) => {
  const [confirmationBox, setConfirmationBox] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && confirmationBox) {
        if (location.pathname === "/") {
          history.push("/game");
        }
      } else if (e.key === "Enter" && !confirmationBox) {
        e.preventDefault();
        if (location.pathname === "/") {
          // This works but it's bad practice (direct DOM manipulation), instead conditionally render divs
          // document.querySelector(".container").style.display = "flex";
          // document.querySelector(".home").style.display = "none";

          // Seting it to true or false doesn't work for some reason!
          setConfirmationBox(!confirmationBox);
        }
      } else if (e.key === "Escape" && confirmationBox) {
        if (location.pathname === "/") {
          setConfirmationBox(!confirmationBox);
          // Explained above
          // document.querySelector(".container").style.display = "none";
          // document.querySelector(".home").style.display = "flex";
        }
      }
    };
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [confirmationBox, history]);

  const handleCancelClick = () => {
    // Explained above
    // document.querySelector(".container").style.display = "none";
    // document.querySelector(".home").style.display = "flex";
    setConfirmationBox(!confirmationBox);
  };

  const handleEnterClick = () => {
    history.push("/game");
  };

  return (
    <>
      {!confirmationBox && (
        <div className="home">
          <form>
            <label>Enter your name:</label>
            <br />
            <input
              type="text"
              placeholder="Name.."
              value={name}
              onChange={(e) => updateName(e.target.value)}
              required
            />
          </form>
        </div>
      )}
      {!!confirmationBox && (
        <div className="container">
          <div className="confirmation-text">
            {`Hi ${name}!`}
            <br />
            {`Are you ready for a challenge? (;`}
          </div>
          <div className="button-container">
            <button
              className="cancel-button"
              onClick={() => handleCancelClick()}
            >
              Cancel
            </button>
            <button
              className="confirmation-button"
              onClick={() => handleEnterClick()}
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
