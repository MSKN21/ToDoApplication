import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import {
  FaSmileWink,
  FaUser,
  FaPhoneAlt,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaGithub,
  FaUserTie,
} from "react-icons/fa";
import avatar from "../styles/pics/avatar.png";

const about = () => {
  return (
    <div id="profileback">
      <nav id="profilenav">
        <div>
          <Link to="/">
            <IoArrowBackOutline id="backicon" />
          </Link>
        </div>
        <div id="proheader">About Us</div>
      </nav>
      <div id="profiledata">
        <div id="imgbox2">
          <img src={avatar} id="imagepro" />
          <div id="detailbox">
            <div id="dets">
              <FaUser id="deticons" />M Sai Krupananda
            </div>
            <div id="dets">
              <MdEmail id="deticons" />
              saikrupananda21 @gmail.com
            </div>
            <div id="dets">
              <FaPhoneAlt id="deticons" />
              8688554605
            </div>
            <div id="dets">
              <FaUserTie id="deticons" />
              Web Developer
            </div>
          </div>
        </div>
        <div id="abouttext">
          <q>
            Iam Sai Krupananda iam an Machine Learning Enthusiast making
            websites is one of my hobbie. Generally most of the people these
            days list their daily work before they start their work so i have
            decided to make a to do list App so that every one can make their
            daily tasks in a more structured and efficient hope this app helps
            you for your daily acomplishments Thank you{" "}
            <FaSmileWink color="yellow" />
          </q>
          <br />
          <p>
            “You’ll never change your life until you change something you do
            daily. The secret of your success is found in your daily routine.” —
            John C. Maxwell
          </p>
        </div>
        <div id="linksfollow">
          <h4 id="followh4">Follow Us</h4>
          <div id="folloeiconbox">
            <div>
              <FaInstagramSquare id="iconsinsta" />
            </div>
            <div>
              <FaFacebookSquare id="iconsfb" />
            </div>
            <div>
              <FaLinkedin id="iconsln" />
            </div>
            <div>
              <FaGithub id="iconsgit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
