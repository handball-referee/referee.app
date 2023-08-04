export default function mapRuleToAnchor(rule: string, language: string) {
  const matchBasicRule = rule.match(/^([0-9]+:[0-9]+)/);

  if (matchBasicRule) {
    return `#${matchBasicRule[1]}`;
  }

  const mapClarification = rule.match(/^Clarification\sNo.\s([0-9]+)/);
  if (mapClarification) {
    switch (mapClarification[1]) {
      case "1":
        switch (language) {
          case "es":
            return "#1.-concesión-de-puntos";
          case "de":
            return "#1.-wertung-der-punkte";
          case "fr":
            return "#1.-évaluation-des-points";
          default:
            return "#1.-awarding-of-points";
        }
      case "2":
        switch (language) {
          case "es":
            return "#2.-circunstancias-especiales";
          case "de":
            return "#2.-besondere-umstände";
          case "fr":
            return "#2.-circonstances-spéciales";
          default:
            return "#2.-special-circumstances";
        }
      case "3":
        switch (language) {
          case "es":
            return "#3.-ejecución-del-golpe-franco-después-de-la-señal-final";
          case "de":
            return "#3.-freiwurf-ausführung-nach-dem-schlusssignal";
          case "fr":
            return "#3.-exécution-d‘un-jet-franc-après-le-signal-de-fin-de-match";
          default:
            return "#3.-free-throw-execution-after-the-final-signal";
        }
      case "4":
        switch (language) {
          case "es":
            return "#4.-juego-pasivo";
          case "de":
            return "#4.-passives-spiel";
          case "fr":
            return "#4.-jeu-passif";
          default:
            return "#4.-passive-play";
        }
      case "5":
        switch (language) {
          case "es":
            return "#5.-conducta-antideportiva";
          case "de":
            return "#5.-unsportliches-verhalten";
          case "fr":
            return "#5.-compartement-antisportif";
          default:
            return "#5.-unsportsmanlike-conduct";
        }
      case "6":
        switch (language) {
          case "es":
            return "#6.-conducta-antideportiva-grave";
          case "de":
            return "#6.-grob-unsportliches-verhalten";
          case "fr":
            return "#6.-comportement-antisportif-grossier";
          default:
            return "#6.-seriously-unsportsmanlike-conduct";
        }
      case "7":
        switch (language) {
          case "es":
            return "#7.-definición-de-clara-ocasión-de-gol”";
          case "de":
            return "#7.-definition-einer-klaren-torgelegenheit”";
          case "fr":
            return "#7.-définition-d‘une-«-occasion-manifeste-de-but-»";
          default:
            return "#7.-definition-of-a-clear-chance-of-scoring”";
        }
      case "8":
        switch (language) {
          case "es":
            return "#8.-interrupción-por-el-cronometrador";
          case "de":
            return "#8.-unterbrechung-durch-den-zeitnehmer";
          case "fr":
            return "#8.-interruption-par-le-chronométreur";
          default:
            return "#8.-interruption-by-the-timekeeper";
        }
      case "9":
        switch (language) {
          case "es":
            return "#9.-jugador-contra-portero”-y-contraataque";
          case "de":
            return "#9.-shootout-und-schneller-gegenstoß";
          case "fr":
            return "#9.-«-shoot-out-»-et-contre-attaque-rapide";
          default:
            return "#9.-shoot-out-and-fast-break";
        }
      default:
        switch (language) {
          case "es":
            return "#aclaraciones-a-las-reglas-de-juego";
          case "de":
            return "#erläuterungen-zu-den-spielregeln";
          case "fr":
            return "#interprétations-des-règles-de-jeu";
          default:
            return "#clarifications-to-the-rules-of-the-game";
        }
    }
  }

  const matchSAR = rule.match(/^Substitution Area Regulations/);
  if (matchSAR) {
    switch (language) {
      case "es":
        return "#reglamento-relativo-a-la-zona-de-cambios";
      case "de":
        return "#auswechselraum-reglement";
      case "fr":
        return "#auswechselraum-reglement";
      default:
        return "#substitution-area-regulations";
    }
  }

  const matchHandSignals = rule.match(/^Hand signals/);
  if (matchHandSignals) {
    switch (language) {
      case "es":
        return "#gestoformas";
      case "de":
        return "#handzeichen";
        case "fr":
          return "#gestes-des-arbitres";
      default:
        return "#hand-signals";
    }
  }

  return "";
}
