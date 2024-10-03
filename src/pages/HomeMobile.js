import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/globalMobile.scss";
import { selectFav } from "../store/favorites/selectors.js";
import {
  selectSongList,
  selectSongsByTitle,
  selectSongsByArtist,
} from "../store/songs/selectors.js";
import {
  bootstrapUser,
  resetFavData,
  resetUserLoginData,
} from "../store/favorites/slice.js";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import {
  NoLike,
  Like,
  DisLike,
  LikeListMobile,
  DisLikeListMobile,
} from "../components/likeButtonsMobile";
import {
  removeUser,
  sendHate,
  sendLike,
  resetVotes,
} from "../store/favorites/actions";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import {
  Container,
  Col,
  Image,
  Row,
  Button,
  Modal,
  Form,
  Stack,
} from "react-bootstrap";

export default function HomePageMobile() {
  const userFav = useSelector(selectFav);
  const fav = userFav.favArray;
  const songList = useSelector(selectSongList);
  const songsByTitle = useSelector(selectSongsByTitle);
  const songsByArtist = useSelector(selectSongsByArtist);
  const userId = userFav.userId;
  const username = userFav.username;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showBioPat, setShowBioPat] = useState(false);
  const [showBioAnousch, setShowBioAnousch] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [chosenSong, setChosenSong] = useState("");
  const [nextSong, setNextSong] = useState("");
  const [previousSong, setPreviousSong] = useState("");
  const [listSorting, setListSorting] = useState("id");
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
  const audioMoose = new Audio("moose_sound.mp3");

  //-----------------AUDIOS--------------------------------

  const playMoose = () => {
    audioMoose.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

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

  //-----------------EMAIL LINK--------------------------------

  const email = "PatriceMartelSpanishGuitar@gmail.com";
  const subject = "From MuziekRoute Concert...";
  const body = "Here's my contact. Please contact me";
  const subject2 = "For Apple_moose services";

  //-----------------LYRICS--------------------------------

  const lyricsUrl = (doc) => {
    return `./lyrics_htm/${doc}.htm`;
  };

  const searchFavData = (favId) => {
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

  //-----------------VOTING SYSTEM------------------------------
  const sendPrefs = () => {
    fav.forEach((f) => {
      if (f.like === 1 && f.dislike === 0) {
        dispatch(sendLike(userId, f.id));
      } else if (f.like === 0 && f.dislike === 1) {
        dispatch(sendHate(userId, f.id));
      }
    });
  };

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
        marginleft="0"
        style={{ overflowX: "hidden", padding: 0, margin: 0 }}
      >
        <Row>
          {!localStorage.muziekRoute_username ||
          localStorage.muziekRoute_username.startsWith("user-") ? (
            <div className="mt-5 mb-4 text-center fs-3 text-white">
              ⭐️Welkom Muziek Routers!⭐️
            </div>
          ) : (
            <div className="mt-5 mb-4 text-center fs-3 text-white">
              ⭐️Welkom {userFav.username}⭐️
            </div>
          )}
        </Row>
        <Row className="mb-4 mt-4 me-0 text-white text-center">
          <Button
            type="button"
            onClick={onClickShowMenu}
            style={{ background: "transparent", border: "none" }}
          >
            <BsFillGrid3X3GapFill size={50} />
          </Button>
        </Row>
        <Row
          className="p-0 m-0"
          style={{ position: "relative", width: "100%" }}
        >
          <Image
            src="V_M_fiets_mobile.jpg"
            alt="oh oh...not found!"
            className="background"
            style={{ width: "100%", height: "auto" }}
          />
          <div
            onClick={playAudioValk}
            style={{
              position: "absolute",
              top: "0%",
              left: "10%",
              width: "45%",
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
              right: "8%",
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
              height: "50%",
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
              height: "33%",
              cursor: "pointer",
              // backgroundColor: "yellow",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
          <div
            onClick={playAudioAnoushHi}
            style={{
              position: "absolute",
              top: "54%",
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
              height: "40%",
              cursor: "pointer",
              // backgroundColor: "blue",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          ></div>
          <div
            onClick={playAudioBike}
            style={{
              position: "absolute",
              bottom: "32%",
              right: "1%",
              width: "25%",
              height: "30%",
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

      {/* -o-o-o- MENU -o-o-o-o-o-o-oo-o-o--o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o- */}

      <Modal show={showMenu} onHide={hideMenu}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className="fs-1 fw-b">Menu: Where to?</Modal.Title>
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
              className="fs-1 fw-b ms-0 me-0 text-center"
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
              onClick={playMoose}
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

      {/* -o-o-o- SONGLIST -o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showSongs} onHide={hideSongs} className="modalListMobile">
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
        <Modal.Header className="mb-4">
          <Form.Select
            id="sortList"
            name="sortSongList"
            className="fs-3"
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
            <div key={`s-${song.id}`}>
              <Row className="ms-2 me-2 mb-2 mt-2">
                <Button
                  variant={searchFavData(song.id)?.color || "outline-secondary"}
                  className="text-light fs-6 fw-b text-start w-100"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={() => {
                    setChosenSong(song);
                    onClickShowLyrics();
                    hideSongs();
                  }}
                >
                  {song.title} - {song.artist}
                </Button>
              </Row>

              <Row
                key={`likes-${song.id}`}
                className="d-flex w-90 justify-content-center mb-1 mt-1"
              >
                {!searchFavData(song.id) ? (
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
            </div>
          );
        })}

        <Row className="mt-5 mb-3">
          <Button
            variant={!localStorage.muziekRoute_username ? "secondary" : "info"}
            className="text-left fs-1"
            onClick={async () => {
              if (!userId && !username) {
                hideSongs();
                navigate("./login");
              } else {
                try {
                  await dispatch(resetVotes(userId));
                  sendPrefs();
                  alert("SUCCESS! We have received your concert preferences");
                } catch (error) {
                  alert("Failed to erase login data. Please try again.");
                }
              }
            }}
          >
            Send us your Musical Preferences!
          </Button>
        </Row>
        <Stack direction="horizontal" gap={4} className="mt-5 mb-5">
          <Button
            variant="danger"
            className="fs-6 fw-b"
            onClick={async () => {
              try {
                await dispatch(removeUser(userId));
                dispatch(resetUserLoginData());
                alert("Your Login Data is now erased");
              } catch (error) {
                alert("Failed to erase login data. Please try again.");
              }
            }}
          >
            Reset Login Data
          </Button>

          <Button
            variant="warning"
            className="fs-5 fw-b ms-2"
            onClick={() => {
              hideSongs();
              onClickShowMenu();
            }}
          >
            Back to Menu
          </Button>
        </Stack>
      </Modal>

      {/* -o-o-o- LYRICS -o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal
        show={showLyrics}
        onHide={hideLyrics}
        className="modalLyricsMobile"
      >
        <Modal.Header closeButton className="text-center">
          <Modal.Title className="fs-3 fw-b w-100">
            <Row>
              <div>
                {searchFavData(chosenSong.id)?.color === "success" ? (
                  <>
                    <LikeListMobile />
                    &nbsp;
                  </>
                ) : searchFavData(chosenSong.id)?.color === "danger" ? (
                  <>
                    <DisLikeListMobile />
                    &nbsp;
                  </>
                ) : null}
                {chosenSong.title} by {chosenSong.artist}
              </div>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Row className="ms-2 me-2 mt-1">
          <Col md={4} className="text-start">
            {!chosenSong ? null : chosenSong.id.toString() !== "1" ? (
              <span>
                <IoMdSkipBackward
                  size={45}
                  color="orange"
                  onClick={() => {
                    setChosenSong(previousSong);
                  }}
                />
                {previousSong ? <b>{previousSong.title}</b> : null}
              </span>
            ) : null}
          </Col>
          <Col md={4} className="text-center">
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
                  size={45}
                  color="orange"
                  onClick={() => {
                    setChosenSong(nextSong);
                  }}
                />{" "}
              </>
            ) : null}
          </Col>
        </Row>
        <Row
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            marginLeft: "2%",
            marginTop: "5%",
            marginRight: "2%",
          }}
        >
          <iframe
            src={lyricsUrl(chosenSong.doc)}
            style={{ width: "100vh", height: "100vh" }}
            title="HTML content"
          />
        </Row>
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

      {/* -o-o-o- BIO'S -o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showBioPat} onHide={hideBioPat} className="modalBioMobile">
        <Row className="ms-2 me-3 text-end">
          <Button
            variant="warning"
            onClick={() => {
              hideBioPat();
              onClickShowMenu();
            }}
          >
            Back to Menu
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

      <Modal
        show={showBioAnousch}
        onHide={hideBioAnousch}
        className="modalBioMobile"
      >
        <Row className="ms-2 me-3 text-end">
          <Button
            variant="warning"
            onClick={() => {
              hideBioAnousch();
              onClickShowMenu();
            }}
          >
            Back to Menu
          </Button>
        </Row>
        <Modal.Body>
          <Image
            src="bio_anousch_website.jpg"
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

      <Modal show={showContact} onHide={hideContact} className="modalBioMobile">
        <Row className="ms-2 mt-1 me-2 text-end">
          <Button
            variant="warning"
            onClick={() => {
              hideContact();
              onClickShowMenu();
            }}
          >
            Back to Menu
          </Button>
        </Row>
        <Row>
          <Modal.Body>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`}
            >
              <Image
                src="V_M_frank.jpg"
                alt="oh oh...image not found!"
                className="text-center"
                style={{ width: "100%", height: "auto", cursor: "pointer" }}
              />
            </a>
          </Modal.Body>
        </Row>
        <Row>
          <Modal.Body>
            <a
              href="https://www.buymeacoffee.com/Valkenhoff_Martel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="buy_me_a_coffe.jpg"
                alt="oh oh...image not found!"
                className="text-center"
                style={{ width: "100%", height: "auto", cursor: "pointer" }}
              />
            </a>
          </Modal.Body>
        </Row>
        <div>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`}
          >
            <Image
              size={30}
              src="pat_spaanse_gitaar.jpg"
              alt="logo not found!"
              style={{ width: "100%", height: "auto", cursor: "pointer" }}
            />
          </a>
        </div>
        <Row className="justify-content-center">
          <Col xs={4} className="text-center">
            <div>
              <Image
                onClick={playMoose}
                size={10}
                src="Moose-Icon(Small).png"
                alt="logo not found!"
                className="mt-5"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
          </Col>
          <Col xs={8} className="mt-4">
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(
                subject2
              )}&body=${encodeURIComponent(body)}`}
            >
              Apple-Moose: <b>(github.com/Apple-moose)</b>
              <p>
                em@il: <b>patrissio@gmail.com</b>
              </p>
            </a>
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
