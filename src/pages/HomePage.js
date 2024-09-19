import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/global.scss";
import { selectFav } from "../store/favorites/selectors.js";
import {
  selectSongList,
  selectSongsByTitle,
  selectSongsByArtist,
} from "../store/songs/selectors.js";
import { bootstrapUser, resetFavData } from "../store/favorites/slice.js";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import {
  NoLike,
  Like,
  DisLike,
  LikeList,
  DisLikeList,
} from "../components/likeButtons";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import {
  Container,
  Col,
  Image,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export default function HomePage() {
  const fav = useSelector(selectFav);
  const songList = useSelector(selectSongList);
  const songsByTitle = useSelector(selectSongsByTitle);
  const songsByArtist = useSelector(selectSongsByArtist);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showBioPat, setShowBioPat] = useState(false);
  const [showBioAnousch, setShowBioAnousch] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [chosenSong, setChosenSong] = useState("");
  const [listSorting, setListSorting] = useState("names");
  const [nextSong, setNextSong] = useState("");
  const [previousSong, setPreviousSong] = useState("");
  const onClickShowMenu = () => setShowMenu(true);
  const onClickShowSongs = () => setShowSongs(true);
  const onClickShowLyrics = () => setShowLyrics(true);
  const onClickShowBioPat = () => setShowBioPat(true);
  const onClickShowBioAnousch = () => setShowBioAnousch(true);
  const onClickShowContact = () => setShowContact(true);

  const hideMenu = () => setShowMenu(false);
  const hideSongs = () => setShowSongs(false);
  const hideLyrics = () => setShowLyrics(false);
  const hideBioPat = () => setShowBioPat(false);
  const hideBioAnousch = () => setShowBioAnousch(false);
  const hideContact = () => setShowContact(false);

  const audioAnoush = new Audio("Anousch_love.mp3");
  const audioAnoushHi = new Audio("AnoushHi.mp3");
  const audioPat = new Audio("Pat_love.mp3");
  const audioGuitar = new Audio("guitar.mp3");
  const audioBike = new Audio("bike.mp3");
  const audioValk = new Audio("Valkenhoff.mp3");
  const audioMartel = new Audio("Martel.mp3");

  //-----------------AUDIOS--------------------------------
  const playAudioAnoush = () => {
    audioAnoush.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const playAudioAnoushHi = () => {
    audioAnoushHi.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const playAudioPat = () => {
    audioPat.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const playAudioGuitar = () => {
    audioGuitar.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const playAudioBike = () => {
    audioBike.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const playAudioValk = () => {
    audioValk.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  const playAudioMartel = () => {
    audioMartel.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  //-----------------LYRICS--------------------------------

  const lyricsUrl = (doc) => {
    return `/song_list_jpegs/${doc}.jpg`;
  };

  const findUserData = (favId) => {
    return fav.find((u) => u.id === favId);
  };
  //--------------Lyrics SORTING---------------------------

  const sortedSongList = (s) => {
    if (s === "id") return songList;
    if (s === "title") return songsByTitle;
    if (s === "artist") return songsByArtist;
    if (s === "favorites") return findLikes();
    else return songList;
  };

  const findLikes = () => {
    let array1 = fav.filter((s) => s.like === 1);
    let likedSongs = array1.map((t) => songList.find((i) => i.id === t.id));
    return likedSongs.filter((song) => song);
  };

  //-----------------COLORS--------------------------------

  // const buttonColors = ["primary", "warning", "success", "danger", "info"];

  // const getRandomColor = () => {
  //   const randomIndex = Math.floor(Math.random() * buttonColors.length);
  //   return buttonColors[randomIndex];
  // };

  //-----------------DEPENDENCIES-------------------------------

  useEffect(() => {
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

    if (chosenSong) {
      findNextSong(chosenSong.id);
      if (chosenSong.id !== 1) {
        findPreviousSong(chosenSong.id);
      }
    }
  }, [chosenSong, songList]);

  useEffect(() => {
    dispatch(bootstrapUser());
    !localStorage.songListSorting
      ? setListSorting("id")
      : setListSorting(localStorage.getItem("songListSorting"));
  }, [dispatch]);

  //-----------------RENDER--------------------------------

  return (
    <>
      <Container
        fluid
        className="bg-black p-0 m-0"
        style={{ overflowX: "hidden", padding: 0, margin: 0, marginLeft: 0 }}
      >
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
            onClick={playAudioValk}
            style={{
              position: "absolute",
              top: "0%",
              left: "5%",
              width: "55%",
              height: "10%",
              cursor: "pointer",
              // backgroundColor: "grey",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
          <div
            onClick={playAudioMartel}
            style={{
              position: "absolute",
              top: "0%",
              right: "5%",
              width: "30%",
              height: "10%",
              cursor: "pointer",
              // backgroundColor: "purple",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
          <div
            onClick={playAudioGuitar}
            style={{
              position: "absolute",
              top: "11%",
              left: "2%",
              width: "27%",
              height: "80%",
              cursor: "pointer",
              // backgroundColor: "red",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
          <div
            onClick={playAudioAnoush}
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              width: "21%",
              height: "60%",
              cursor: "pointer",
              // backgroundColor: "yellow",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
          <div
            onClick={playAudioAnoushHi}
            style={{
              position: "absolute",
              top: "81%",
              left: "30%",
              width: "35%",
              height: "10%",
              cursor: "pointer",
              // backgroundColor: "pink",
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
          <div
            onClick={playAudioBike}
            style={{
              position: "absolute",
              bottom: "1%",
              right: "1%",
              width: "25%",
              height: "50%",
              cursor: "pointer",
              // backgroundColor: "green",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
        </Row>
        <Row
          className="fs-1 mt-5 mb-5 bk-black"
          style={{ height: "150px" }}
        ></Row>
      </Container>

      {/* -o-o-o-o-o-o-o-o-o-oo-o-o--o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o- */}

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
              onClick={() => {
                onClickShowBioAnousch();
                hideMenu();
              }}
            >
              Bio Anouschka
            </Button>
          </Row>
          <Row className="mb-3">
            <Button
              variant="primary"
              className="fs-1 fw-b ms-0 me-0 text-center"
              onClick={() => {
                onClickShowBioPat();
                hideMenu();
              }}
            >
              Bio Patrice
            </Button>
          </Row>
          <Row className="mb-3">
            <Button
              variant="warning"
              className="fs-2 fw-b ms-0 me-0 text-center"
              onClick={() => {
                onClickShowContact();
                hideMenu();
              }}
            >
              Contact us
            </Button>
          </Row>
        </Modal.Body>
        <Modal.Body className="d-flex justify-content-between align-items-center">
          <div>
            Powered by Apple
            <Image
              size={30}
              src="Moose-Icon(Small).png"
              alt="logo not found!"
              className="text-left"
              style={{ width: "10%", height: "auto" }}
            />
            Moose
          </div>
          <Button variant="secondary" className="ms-auto" onClick={hideMenu}>
            Close
          </Button>
        </Modal.Body>
      </Modal>

      {/* -o-o-o--o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showSongs} onHide={hideSongs} className="modalList">
        <Row className="ms-2 me-2">
          <Button
            variant="warning"
            onClick={() => {
              hideSongs();
              onClickShowMenu();
            }}
          >
            Back to Menu
          </Button>
        </Row>
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column w-100">
            <Modal.Title className="fs-6 fw-b">
              Song List: <p>(click on title for lyrics)</p>
            </Modal.Title>
          </div>
          <div>
            <Button
              variant="secondary"
              className="fs-6 fw-b ms-2"
              onClick={() => {
                dispatch(resetFavData());
              }}
            >
              Reset
            </Button>
          </div>{" "}
        </Modal.Header>
        <Modal.Header className="mb-3">
          <Form.Select
            id="sortList"
            name="sortSongList"
            value={listSorting}
            onChange={(e) => {
              setListSorting(e.target.value);
              localStorage.setItem("songListSorting", e.target.value);
            }}
          >
            <option value="id">Sort list by:</option>
            <option value="title">List by Song Title</option>
            <option value="artist">List by Artist Name</option>
            <option value="favorites">List only your Favorites</option>
          </Form.Select>
        </Modal.Header>

        {sortedSongList(listSorting).map((song) => {
          return (
            <Row key={song.id} className="align-items-center ms-2 mb-2">
              <Col md={8} className="text-start fs-1">
                <Button
                  variant={findUserData(song.id)?.color || "outline-secondary"}
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

        <Row className="mt-5 mb-3">
          <Button
            variant="secondary"
            className="text-left fs-2"
            onClick={() => {
              hideSongs();
              onClickShowMenu();
            }}
          >
            Send Preferences to server
          </Button>
        </Row>
        <Modal.Body className="text-end">
          <Button
            variant="dark"
            onClick={() => {
              hideSongs();
              onClickShowMenu();
            }}
          >
            Back to Menu
          </Button>
        </Modal.Body>
      </Modal>

      {/* -o-o-o--o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showLyrics} onHide={hideLyrics} className="modalLyrics">
        <Modal.Header closeButton className="text-center">
          <Modal.Title className="fs-3 fw-b w-100">
            <Row>
              <div>
                {findUserData(chosenSong.id)?.color === "success" ? (
                  <>
                    <LikeList />
                    &nbsp;
                  </>
                ) : findUserData(chosenSong.id)?.color === "danger" ? (
                  <>
                    <DisLikeList />
                    &nbsp;
                  </>
                ) : null}
                {chosenSong.title} by {chosenSong.artist}
              </div>
            </Row>
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
            {nextSong ? (
              <>
                <b>{nextSong.title}</b>
                <IoMdSkipForward
                  size={65}
                  color="orange"
                  onClick={() => {
                    setChosenSong(nextSong);
                  }}
                />{" "}
              </>
            ) : null}
          </Col>
        </Row>
        <Modal.Body>
          <Image
            src={lyricsUrl(chosenSong.doc)}
            alt="oh oh...image not found!"
            style={{ width: "100%", height: "auto" }}
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

      {/* -o-o-o--o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showBioPat} onHide={hideBioPat} className="modalBio">
        <Row className="ms-2 me-3 text-end">
          <Button
            variant="warning"
            onClick={() => {
              hideBioPat();
              onClickShowMenu();
            }}
          >
            Back to List
          </Button>
        </Row>
        <Modal.Body>
          <Image
            src="bio_pat_website.jpg"
            alt="oh oh...image not found!"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Body className="text-end">
          <Button
            variant="secondary"
            onClick={() => {
              hideBioPat();
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showBioAnousch} onHide={hideBioAnousch} className="modalBio">
        <Row className="ms-2 me-3 text-end">
          <Button
            variant="warning"
            onClick={() => {
              hideBioAnousch();
              onClickShowMenu();
            }}
          >
            Back to List
          </Button>
        </Row>
        <Modal.Body>
          <Image
            src="V_M_frank.jpg"
            alt="oh oh...image not found!"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Body className="text-end">
          <Button
            variant="secondary"
            onClick={() => {
              hideBioAnousch();
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showContact} onHide={hideContact} className="modalBio">
        <Row className="ms-2 me-3 text-end">
          <Button
            variant="warning"
            onClick={() => {
              hideContact();
              onClickShowMenu();
            }}
          >
            Back to List
          </Button>
        </Row>
        <Row>
          <Modal.Body>
            <Image
              src="V_M_frank.jpg"
              alt="oh oh...image not found!"
              className="text-center"
              style={{ width: "100%", height: "auto" }}
            />
          </Modal.Body>
        </Row>
        <div>
          <Image
            size={30}
            src="pat_spaanse_gitaar.jpg"
            alt="logo not found!"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Row className="justify-content-center">
          <Col xs={4} className="text-center">
            <div>
              <Image
                size={10}
                src="Moose-Icon(Small).png"
                alt="logo not found!"
                className="text-left mt-4"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
          </Col>
          <Col xs={8} className="mt-5 fs-2">
            Apple-Moose: <b>(github.com/Apple-moose)</b>
            <p>
              em@il: <b>patrissio@gmail.com</b>
            </p>
          </Col>
        </Row>
        <Modal.Body className="text-end">
          <Button
            variant="secondary"
            onClick={() => {
              hideContact();
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
