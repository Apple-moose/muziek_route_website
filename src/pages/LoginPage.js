import React, { useState, useEffect, useCallback } from "react";
import "../style/global.scss";
import { Clock } from "../components/Clock.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendHate, sendLike, loginUser } from "../store/favorites/actions";
import { selectFav } from "../store/favorites/selectors.js";
import { Container, Row, Button, Form } from "react-bootstrap";

const LoginPage = () => {
  const userFav = useSelector(selectFav);
  const fav = userFav.favArray;
  const userId = userFav.userId;

  const [usernameState, setUsernameState] = useState("");
  const [show_no, setShow_no] = useState("");
  const [loginCompleted, setLoginCompleted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowChange = (e) => {
    e.preventDefault();
    setShow_no(e.target.value);
  };
  //--------------Random Username generator--------------------------------

  const getRandomUsername = () => {
    return new Promise((resolve) => {
      const randomIndex = Math.floor(Math.random() * 1000);
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const randomLetters =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));

      const generatedUsername = `user-${randomLetters}-${randomIndex}`;

      setUsernameState(generatedUsername);
      resolve(generatedUsername);
    });
  };

  //-----------------VOTING SYSTEM------------------------------
  const sendPrefs = useCallback(() => {
    fav.forEach((f) => {
      if (f.like === 1 && f.dislike === 0) {
        dispatch(sendLike(userId, f.id));
      } else if (f.like === 0 && f.dislike === 1) {
        dispatch(sendHate(userId, f.id));
      }
    });
  }, [fav, userId, dispatch]);
  //-----------------DEPENDENCIES-------------------------------

  useEffect(() => {
    if (loginCompleted && userId) {
      sendPrefs();
      alert("Thank you. Your preferences are on the way!");
      navigate("../.");
    }
  }, [userId, loginCompleted, sendPrefs, navigate]);

  //--------------------RENDER----------------------------

  return (
    <Container
      style={{
        backgroundColor: "black",
        backgroundImage: `url('V_M_fiets_BG.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "start",
        backgroundRepeat: "2",
        height: "100vh",
        width: "100vw",
        zIndex: 1,
      }}
      fluid
      className="text-white"
    >
      <Clock />
      <Row className="fs-1 mb-3 justify-content-center">
        ⭐️ Send Us Your Musical Preferences: ⭐️
      </Row>
      <Row className="ms-5 me-5 mt-5 mb-5">
        <Form.Select
          id="show_no"
          name="show_no"
          className="fs-2"
          value={show_no}
          onChange={handleShowChange}
        >
          <option value="">Select Concert 🙏</option>
          <option value="13">🕐 ⇢13h</option>
          <option value="14">🕑 ⇢14h</option>
          <option value="15">🕒 ⇢15h</option>
          <option value="16">🕓 ⇢16h</option>
        </Form.Select>
      </Row>
      {!show_no ? (
        <h1 className="text-center">👤</h1>
      ) : (
        <div className="text-center">
          <Form>
            <Form.Group className="mb-3 ms-0 me-5">
              <Row className="ms-0 me-5">
                <Form.Control
                  id="username"
                  name="username"
                  type="text"
                  className="fs-3 mb-2 ms-5 me-5"
                  placeholder="--> User name ? 🤔"
                  value={usernameState}
                  onChange={(e) => setUsernameState(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent the default form submission on 'Enter'
                    }
                  }}
                  autoFocus
                  autoComplete="off"
                />
              </Row>{" "}
            </Form.Group>
            <Row className="mt-2 ms-5 me-5 mb-5">
              {!usernameState ? (
                <Button
                  type="button"
                  variant="success"
                  className="fs-2 w-100"
                  onClick={() => {
                    alert(
                      "Please provide us with a username or send your preferences Anonymously!"
                    );
                  }}
                >
                  ✋
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="success"
                  className="fs-2 w-100"
                  onClick={async () => {
                    try {
                      await dispatch(loginUser(usernameState, show_no));
                      setLoginCompleted(true);
                    } catch (error) {
                      console.error("dispatch failed:", error);
                      alert(
                        "An error occurred while sending your data in. Please try again."
                      );
                    }
                  }}
                >
                  <>
                    Send as: <b>⭐️{usernameState}⭐️</b>
                  </>
                </Button>
              )}
            </Row>
            <Row className="ms-2 me-2">
              <Button
                type="button"
                variant="warning"
                className="fs-1 fw-bold fst-italic w-100"
                onClick={async () => {
                  try {
                    const generatedUsername = await getRandomUsername();
                    await dispatch(loginUser(generatedUsername, show_no));
                    setLoginCompleted(true);
                  } catch (error) {
                    console.error("Dispatch failed:", error);
                    alert(
                      "An error occurred while sending your data. Please try again."
                    );
                  }
                }}
              >
                👉or Send Us Your Preferences Anonymously
              </Button>
            </Row>
          </Form>
        </div>
      )}
    </Container>
  );
};
export { LoginPage };
