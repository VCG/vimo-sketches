import * as THREE from "three";
import { createTheme } from "@mui/material";

export class Color {
  static orange = new THREE.Color("rgb(255,154,0)");

  static white = new THREE.Color("rgb(255,255,255)");
  static red = new THREE.Color("rgb(227,55,55)");
  static grey = new THREE.Color("rgb(229,229,229)");
  static pink = new THREE.Color("rgb(200,0,255)");
  static blue = new THREE.Color("rgb(62,62,231)");
  static black = new THREE.Color("rgb(0,0,0)");

  static theme = createTheme({
    palette: {
      stronger: {
        main: "#b94759",
        contrastText: "#000000",
      },
      strong: {
        main: "#f4a582",
        contrastText: "#000000",
      },
      neutral: {
        main: "#b2b2b2",
        contrastText: "#000000",
      },
      weak: {
        main: "#92c5de",
        contrastText: "#000000",
      },
      weaker: {
        main: "#0f73ad",
        contrastText: "#000000",
      },
    },
  });
}

export function hexToRgbA(hex, alpha = 1) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      ", " +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

export function mapQueryResult(result, idx) {
  let motifs = Object.entries(result).map(([k, v], i) => {
    return { ...v, nodeKey: k };
  });
  motifs.sort((a, b) => {
    return a.nodeKey.localeCompare(b.nodeKey);
  });
  return { name: "Motif Instance " + idx, neurons: motifs };
}
