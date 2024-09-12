import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/global.scss";
import anoushHiAudio from "../components/AnoushHi.mp3";
import cmonPatAudio from "../components/CmonPat.wav";
import noSunshine from "../components/noSunshine.pdf";
import { songList } from "../components/songList";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import V_M_fiets from "../components/V_M_fiets.jpg";
import { Container, Col, Image, Row, Button, Modal } from "react-bootstrap";

export default function HomePage() {
  //   const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [chosenSong, setchosenSong] = useState("");
  const onClickShowMenu = () => setShowMenu(true);
  const onClickShowSongs = () => setShowSongs(true);
  const onClickShowLyrics = () => setShowLyrics(true);
  const hideMenu = () => setShowMenu(false);
  const hideSongs = () => setShowSongs(false);
  const hideLyrics = () => setShowLyrics(false);

  const audioAnoush = new Audio(anoushHiAudio);
  const audioPat = new Audio(cmonPatAudio);

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
    return `../components/${doc}.pdf`;
  };

  return (
    <>
      <Container fluid className="bg-black" style={{ overflowX: "hidden" }}>
        <Row className="mb-5 me-0 text-white text-center">
          <Col md={1} className="text-center ms-5 mb-2 mt-4 fs-1">
            <Button
              type="button"
              onClick={onClickShowMenu}
              style={{ background: "transparent", border: "none" }}
            >
              <BsFillGrid3X3GapFill size={100} />
            </Button>
          </Col>
          <Col md={10}>
            <div className="mt-5 fs-1">⭐️Welkom Muziek Routers!⭐️</div>
          </Col>
        </Row>
        <Row style={{ position: "relative", width: "100%", margin: "0" }}>
          <Image
            src={V_M_fiets}
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
              //   backgroundColor: "red",
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
              //   backgroundColor: "blue",
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

      <Modal show={showSongs} onHide={hideSongs}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className="fs-4 fw-b">
            Repertory: (click on title for lyrics)
          </Modal.Title>
        </Modal.Header>
        {songList.map((song) => {
          return (
            <Modal.Body key={song.id}>
              <Button
                variant="outline-danger"
                className="text-dark fs-4 fw-b ms-0 me-0 text-center"
                onClick={() => {
                  setchosenSong(song.doc);
                  onClickShowLyrics();
                  hideSongs();
                }}
              >
                {song.title} -{song.artist}
              </Button>
            </Modal.Body>
          );
        })}
        ;
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

      <Modal show={showLyrics} onHide={hideLyrics}>
        <Modal.Body>
          <iframe
            // src={lyricsUrl(chosenSong)}
            src={noSunshine}
            width="200%"
            height="1000px"
            style={{ border: "none" }}
            title="PDF Viewer"
          ></iframe>
        </Modal.Body>
        <Modal.Body className="text-end">
          <Button
            variant="secondary"
            onClick={() => {
              hideLyrics();
              onClickShowSongs();
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
