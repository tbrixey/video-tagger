import { Slider, withStyles } from "@material-ui/core";

export const VideoProgressBar = withStyles({
  root: {
    height: 2,
    padding: "15px 0",
    background: "rgba(255,255,255,.15)",
    boxShadow: "inset 0 0 14px rgba(0,0,0,.2)",
  },
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
  marked: {
    marginBottom: 0,
  },
})(Slider);
