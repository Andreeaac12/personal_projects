import "./Modal.css";
// import MyVideo from "../../../videos/bee.mov"
import Season from "../../../images/season22.jpg";
import Season2 from "../../../images/season21.jpg";
import Season3 from "../../../images/season20.jpg";
// import { DefaultPlayer as Video } from "react-html5video/dist";
// import "react-html5video/dist/styles.css";

export default function Modal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="content">
          <h2 className="story-text">Story</h2>

          <span>
            <p className="text-modal-gisou">
              Experience the Gisou holiday season
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
              ipsam eligendi eum? Minus laudantium, tenetur vero quis quibusdam
              minima. Laborum esse quia, magni dignissimos amet reiciendis
              incidunt accusantium. Porro, quod.
            </p>
          </span>
          <div className="first-season--container">
            <img src={Season} alt="Season 2022" className="img-opac" />
            <p className="season-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              aliquid non quisquam vitae quia laborum quibusdam voluptates,
              accusamus laudantium mollitia, iure.
            </p>
          </div>
          <div className="first-season--container img-opac" >
            <img src={Season2} alt="Season 2022" />
            <p className="season-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              aliquid non quisquam vitae quia laborum quibusdam voluptates,
              accusamus laudantium mollitia, iure.
            </p>
          </div>
          <div className="first-season--container img-opac">
            <img src={Season3} alt="Season 2022" />
            <p className="season-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              aliquid non quisquam vitae quia laborum quibusdam voluptates,
              accusamus laudantium mollitia, iure.
            </p>
          </div>

          {/* <Video width="300px" height="300px"><source src={MyVideo} type="video/mp4"/></Video> */}
        </div>
      </div>
      <p onClick={onClose} className="closeBtn">
        <i className="fa-solid fa-xmark"></i>
      </p>
    </div>
  );
}
