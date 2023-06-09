import CloseIcon from "@mui/icons-material/Close";
import sign from "./sign.png";
import IconButton from "@mui/material/IconButton";

function AboutLab({ handleisAboutLabOpen }) {
  return (
    <div className="aboutLab">
      <div>
        <IconButton
          aria-label="close"
          onClick={handleisAboutLabOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "var(--color-white)",
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="font-normal">
          <p>
            <b>Welcome to our top-secret Platypus Research Lab!</b>
          </p>
          <p>
            Our team of renowned scientists has been studying these elusive
            creatures for years. We have a challenge for you: can you outsmart
            us and locate the platypus before we do? To begin, you'll need to
            strategically hide the platypus on the game board. Use the provided
            pieces to camouflage the platypus, carefully considering your
            placement. Click the rotation button on the left side to adjust the
            orientation of the piece, ensuring the platypus remains hidden from
            our keen eyes. But be warned, our team is equipped with advanced
            technology and extensive knowledge of the platypus habitat. We'll be
            searching diligently, analyzing every move you make. The race is on
            to see who can locate the platypus first - you or our team of expert
            researchers. Remember, the platypus is a master of disguise,
            blending seamlessly with its surroundings. The success of our
            research and your victory depend on your ability to outwit us. Will
            you be able to outmaneuver our team and locate the platypus faster?
            Get ready to dive into the exciting world of platypus research. The
            fate of this unique species lies in your hands. Good luck!
          </p>
        </div>
      </div>
      <div className="to-right">
        <div>Lab Director Signiture </div>
        <img id="sign" src={sign} alt="sign of director"></img>
      </div>
    </div>
  );
}

export default AboutLab;
