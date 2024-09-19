import "../style/global.scss";
import { useDispatch } from "react-redux";
import { addFav, dislikeFav, resetFav } from "../store/favorites/slice";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";
import { Col } from "react-bootstrap";

const NoLike = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Col md={2} className="text-center">
        <IoMdThumbsUp
          style={{
            width: "3rem",
            height: "auto",
            color: "grey",
          }}
          onClick={() => {
            dispatch(addFav(props.id));
          }}
        />
      </Col>
      <Col md={2} className="text-center">
        <IoMdThumbsDown
          style={{
            width: "3rem",
            height: "auto",
            color: "grey",
          }}
          onClick={() => {
            dispatch(dislikeFav(props.id));
          }}
        />
      </Col>
    </>
  );
};
export { NoLike };

const Like = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Col md={2} className="text-center">
        <IoMdThumbsUp
          style={{
            width: "4rem",
            height: "auto",
            color: "green",
          }}
          onClick={() => {
            dispatch(resetFav(props.id));
          }}
        />
      </Col>
    </>
  );
};
export { Like };

const DisLike = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Col md={2}></Col>
      <Col md={2} className="text-center">
        <IoMdThumbsDown
          style={{
            width: "4rem",
            height: "auto",
            color: "Red",
          }}
          onClick={() => {
            dispatch(resetFav(props.id));
          }}
        />
      </Col>
    </>
  );
};
export { DisLike };

const LikeList = () => {
  return (
    <>
      <IoMdThumbsUp
        style={{
          width: "2rem",
          height: "auto",
          marginBottom: "9",
          color: "green",
        }}
      />
    </>
  );
};
export { LikeList };

const DisLikeList = () => {
  return (
    <>
      <IoMdThumbsDown
        style={{
          width: "2rem",
          height: "auto",
          marginBottom: "2",
          color: "Red",
        }}
      />
    </>
  );
};
export { DisLikeList };
