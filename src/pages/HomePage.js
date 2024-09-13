import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/global.scss";
import { selectFav } from "../store/favorites/selectors.js";
import { bootstrapUser, resetFavData } from "../store/favorites/slice.js";
import { songList } from "../components/songList";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { NoLike, Like, DisLike } from "../components/likeButtons";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { Container, Col, Image, Row, Button, Modal } from "react-bootstrap";
export default function HomePage() {
  const fav = useSelector(selectFav);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [chosenSong, setChosenSong] = useState("");
  const [nextSong, setNextSong] = useState("");
  const [previousSong, setPreviousSong] = useState("");
  const onClickShowMenu = () => setShowMenu(true);
  const onClickShowSongs = () => setShowSongs(true);
  const onClickShowLyrics = () => setShowLyrics(true);
  const hideMenu = () => setShowMenu(false);
  const hideSongs = () => setShowSongs(false);
  const hideLyrics = () => setShowLyrics(false);

  const audioAnoush = new Audio("AnoushHi.mp3");
  const audioPat = new Audio("CmonPat.wav");

  const playAudioAnoush = () => {
    audioAnoush.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const playAudioPat = () => {
    audioPat.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const lyricsUrl = (doc) => {
    return `/song_list_jpegs/${doc}.jpg`;
  };

  const findNextSong = (id) => {
    let nextSongId = Number(id) + 1;
    const song = songList.find(
      (s) => nextSongId.toString() === s.id.toString()
    );
    setNextSong(song);
  };

  const findPreviousSong = (id) => {
    let nextSongId = Number(id) - 1;
    const song = songList.find(
      (s) => nextSongId.toString() === s.id.toString()
    );
    setPreviousSong(song);
  };

  const findUserData = (favId) => {
    return fav.find((u) => u.id === favId);
  };

  const buttonColors = [
    "primary",
    "secondary",
    "warning",
    "success",
    "danger",
    "info",
  ];

  // Function to get a random color from the array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * buttonColors.length);
    return buttonColors[randomIndex];
  };

  useEffect(() => {
    if (chosenSong) {
      findNextSong(chosenSong.id);

      if (chosenSong.id !== 1) {
        findPreviousSong(chosenSong.id);
      }
    }
  }, [chosenSong]);

  useEffect(() => {
    dispatch(bootstrapUser());
  }, [dispatch]);

  return (
    <>
      <Container fluid className="bg-black" style={{ overflowX: "hidden" }}>
        <Row className="mb-5 me-0 text-white text-center">
          <Col md={1} className="text-center ms-2 mb-2 mt-4 fs-1">
            <Button
              type="button"
              onClick={onClickShowMenu}
              style={{ background: "transparent", border: "none" }}
            >
              <BsFillGrid3X3GapFill size={80} />
            </Button>
          </Col>
          <Col md={10}>
            <div className="mt-5 fs-1">⭐️Welkom Muziek Routers!⭐️</div>
          </Col>
        </Row>
        <Row style={{ position: "relative", width: "100%", margin: "0" }}>
          <Image
            src="V_M_fiets.jpg"
            alt="oh oh...not found!"
            className="background"
            style={{ width: "100%", height: "auto" }}
          />
          <div
            onClick={playAudioAnoush}
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              width: "21%",
              height: "60%",
              cursor: "pointer",
              // backgroundColor: "red",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
          <div
            onClick={playAudioPat}
            style={{
              position: "absolute",
              top: "12%",
              left: "52%",
              width: "21%",
              height: "60%",
              cursor: "pointer",
              // backgroundColor: "blue",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
        </Row>
      </Container>
      <Modal show={showMenu} onHide={hideMenu}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className="fs-1 fw-b">Where to?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Button
              variant="success"
              className="fs-1 fw-b ms-0 me-0 text-center"
              onClick={() => {
                onClickShowSongs();
                hideMenu();
              }}
            >
              List of Songs
            </Button>
          </Row>
          <Row className="mb-3">
            <Button
              variant="info"
              className="fs-1 fw-b ms-0 me-0 text-center"
              onClick={hideMenu}
            >
              Bio Anouschka
            </Button>
          </Row>
          <Row className="mb-3">
            <Button
              variant="primary"
              className="fs-1 fw-b ms-0 me-0 text-center"
              onClick={hideMenu}
            >
              Bio Patrice
            </Button>
          </Row>
          <Row className="mb-3">
            <Button
              variant="warning"
              className="fs-2 fw-b ms-0 me-0 text-center"
              onClick={hideMenu}
            >
              Contact us
            </Button>
          </Row>
        </Modal.Body>
        <Modal.Body className="text-end">
          <Button variant="secondary" onClick={hideMenu}>
            Close
          </Button>
        </Modal.Body>
      </Modal>

      {/* -o-o-o--o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showSongs} onHide={hideSongs} className="modalList">
        <Modal.Header
          closeButton
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex flex-column w-100">
            <Modal.Title className="fs-2 fw-b">
              Repertory: (click on title for lyrics)
            </Modal.Title>
          </div>
          <div>
            <Button
              variant="warning"
              className="fs-4 fw-b ms-3"
              onClick={() => {
                dispatch(resetFavData());
              }}
            >
              Reset
            </Button>
          </div>
        </Modal.Header>

        {songList.map((song) => {
          return (
            <Row key={song.id} className="align-items-center ms-2 mb-2">
              <Col md={8} className="text-start fs-1">
                <Button
                  variant={getRandomColor()}
                  className="text-light fs-4 fw-b text-start w-100"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add shadow to the text
                  }}
                  onClick={() => {
                    setChosenSong(song);
                    onClickShowLyrics();
                    hideSongs();
                  }}
                >
                  {song.title} - {song.artist}
                </Button>
              </Col>
              {!findUserData(song.id) ? (
                <NoLike key={song.id} id={song.id} />
              ) : (
                fav.map((u) => {
                  if (u.id === song.id) {
                    if (u.like === 1 && u.dislike === 0) {
                      return <Like key={`like-${u.id}`} id={song.id} />;
                    } else if (u.like === 0 && u.dislike === 1) {
                      return <DisLike key={`dislike-${u.id}`} id={song.id} />;
                    } else if (u.like === 0 && u.dislike === 0) {
                      return <NoLike key={`dislike-${u.id}`} id={song.id} />;
                    }
                  }
                  return null;
                })
              )}
            </Row>
          );
        })}

        <Modal.Body className="text-end">
          <Button
            variant="secondary"
            onClick={() => {
              hideSongs();
              onClickShowMenu();
            }}
          >
            close
          </Button>
        </Modal.Body>
      </Modal>

      {/* -o-o-o--o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showLyrics} onHide={hideLyrics} className="modalLyrics">
        <Modal.Header closeButton className="text-center">
          <Modal.Title className="fs-2 fw-b w-100">
            {chosenSong.title} by {chosenSong.artist}
          </Modal.Title>
        </Modal.Header>
        <Row className="ms-2 me-2">
          <Col md={4} className="text-start">
            {!chosenSong ? null : chosenSong.id.toString() !== "1" ? (
              <span>
                <IoMdSkipBackward
                  size={65}
                  color="orange"
                  onClick={() => {
                    setChosenSong(previousSong);
                  }}
                />
                {previousSong ? <b>{previousSong.title}</b> : null}
              </span>
            ) : null}
          </Col>
          <Col md={4} className="text-center mt-3">
            <Button
              variant="warning"
              onClick={() => {
                hideLyrics();
                onClickShowSongs();
              }}
            >
              Back to List
            </Button>
          </Col>
          <Col md={4} className="text-end">
            {" "}
            {nextSong ? <b>{nextSong.title}</b> : null}
            <IoMdSkipForward
              size={65}
              color="orange"
              onClick={() => {
                setChosenSong(nextSong);
              }}
            />
          </Col>
        </Row>
        <Modal.Body>
          <Image
            src={lyricsUrl(chosenSong.doc)}
            alt="oh oh...image not found!"
            style={{ width: "200%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Body className="text-end">
          <Button
            variant="secondary"
            onClick={() => {
              hideLyrics();
              onClickShowSongs();
            }}
          >
            Back to List
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
