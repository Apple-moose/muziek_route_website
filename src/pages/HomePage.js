import React from "react";
import "../style/global.scss";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import V_M_fiets from "../components/V_M_fiets.jpg";
import { Col, Image, Row } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      <div className="bg-black">
        <Row className="mb-5 text-white text-center">
          <Col md={1} className="text-center ms-5 mb-2 mt-4 fs-1">
            <span className="Options-header">
              <BsFillGrid3X3GapFill size={100} />
              <div className="Options-window">{/* <OptionsMenu /> */}</div>
            </span>
          </Col>
          <Col md={10} className="">
            <div className="mt-5 fs-1">⭐️Welkom Muziek Routers!⭐️</div>
          </Col>
        </Row>
        <Row>
          <Image
            src={V_M_fiets}
            alt="oh oh...not found!"
            className="background"
          />
        </Row>
      </div>
    </>
  );
}
