import React from "react";
import loadable from "@loadable/component";
import Loading from "../Loading";

export const Foreword = loadable((props) => import(`./${props.lang}/Foreword`), {
  fallback: <Loading/>,
});

export const Rule1 = loadable((props) => import(`./${props.lang}/1`), {
  fallback: <Loading/>,
});

export const Rule2 = loadable((props) => import(`./${props.lang}/2`), {
  fallback: <Loading/>,
});

export const Rule3 = loadable((props) => import(`./${props.lang}/3`), {
  fallback: <Loading/>,
});

export const Rule4 = loadable((props) => import(`./${props.lang}/4`), {
  fallback: <Loading/>,
});

export const Rule5 = loadable((props) => import(`./${props.lang}/5`), {
  fallback: <Loading/>,
});

export const Rule6 = loadable((props) => import(`./${props.lang}/6`), {
  fallback: <Loading/>,
});

export const Rule7 = loadable((props) => import(`./${props.lang}/7`), {
  fallback: <Loading/>,
});

export const Rule8 = loadable((props) => import(`./${props.lang}/8`), {
  fallback: <Loading/>,
});

export const Rule9 = loadable((props) => import(`./${props.lang}/9`), {
  fallback: <Loading/>,
});

export const Rule10 = loadable((props) => import(`./${props.lang}/10`), {
  fallback: <Loading/>,
});

export const Rule11 = loadable((props) => import(`./${props.lang}/11`), {
  fallback: <Loading/>,
});

export const Rule12 = loadable((props) => import(`./${props.lang}/12`), {
  fallback: <Loading/>,
});

export const Rule13 = loadable((props) => import(`./${props.lang}/13`), {
  fallback: <Loading/>,
});

export const Rule14 = loadable((props) => import(`./${props.lang}/14`), {
  fallback: <Loading/>,
});

export const Rule15 = loadable((props) => import(`./${props.lang}/15`), {
  fallback: <Loading/>,
});

export const Rule16 = loadable((props) => import(`./${props.lang}/16`), {
  fallback: <Loading/>,
});

export const Rule17 = loadable((props) => import(`./${props.lang}/17`), {
  fallback: <Loading/>,
});

export const Rule18 = loadable((props) => import(`./${props.lang}/18`), {
  fallback: <Loading/>,
});

export const Clarification1 = loadable((props) => import(`./${props.lang}/Clarification1`), {
  fallback: <Loading/>,
});

export const Clarification2 = loadable((props) => import(`./${props.lang}/Clarification2`), {
  fallback: <Loading/>,
});

export const Clarification3 = loadable((props) => import(`./${props.lang}/Clarification3`), {
  fallback: <Loading/>,
});

export const Clarification4 = loadable((props) => import(`./${props.lang}/Clarification4`), {
  fallback: <Loading/>,
});

export const Clarification5 = loadable((props) => import(`./${props.lang}/Clarification5`), {
  fallback: <Loading/>,
});

export const Clarification6 = loadable((props) => import(`./${props.lang}/Clarification6`), {
  fallback: <Loading/>,
});

export const Clarification7 = loadable((props) => import(`./${props.lang}/Clarification7`), {
  fallback: <Loading/>,
});

export const Clarification8 = loadable((props) => import(`./${props.lang}/Clarification8`), {
  fallback: <Loading/>,
});

export const HandSignals = loadable((props) => import(`./${props.lang}/HandSignals`), {
  fallback: <Loading/>,
});

export const SAR = loadable((props) => import(`./${props.lang}/SAR`), {
  fallback: <Loading/>,
});

export const Guidelines = loadable((props) => import(`./${props.lang}/Guidelines`), {
  fallback: <Loading/>,
});

export const GuidelinesPlayingCourt = loadable((props) => import(`./${props.lang}/GuidelinesPlayingCourt`), {
  fallback: <Loading/>,
});
