import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../style/globalMobile.scss";
import {
  selectSongList,
  selectSongsByTitle,
  selectSongsByArtist,
} from "../store/songs/selectors.js";
import {
  Container,
  Col,
  Image,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export default function Query() {
  const songList = useSelector(selectSongList);
  const songsByTitle = useSelector(selectSongsByTitle);
  const songsByArtist = useSelector(selectSongsByArtist);

  return (
    <>
      <Container
        fluid
        className="bg-black p-0 m-0"
        marginleft="0"
        style={{ overflowX: "hidden", padding: 0, margin: 0 }}
      >
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
          </Row><Row className="">
          {songsByTitle.map((s) => {
            return (
                <p>
                ({s.id}, $${s.title}$$, '{s.artist}', NOW(), NOW()),
                </p>
            )


          })}
        </Row>
      </Container>
    </>
  );
}
