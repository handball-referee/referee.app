export default function mapRuleToAnchor(rule: string, language: string) {
  const matchBasicRule = rule.match(/^([0-9]+:[0-9]+)/);

  if (matchBasicRule) {
    return `#${matchBasicRule[1]}`;
  }

  const mapClarification = rule.match(/^Clarification\s([0-9]+)/);
  if (mapClarification) {
    switch (mapClarification[1]) {
      case "2":
        switch (language) {
          case "de":
            return "#2.-time-out";
          case "es":
            return "#2.-tiempo-muerto";
          case "fr":
            return "#2.-arrêt-de-temps-de-jeu";
          default:
            return "#2.-time-out";
        }
      case "3":
        switch (language) {
          case "de":
            return "#3.-team-time-out";
          case "es":
            return "#3.-tiempo-muerto-de-equipo";
          case "fr":
            return "#3.-temps-mort-d’équipe";
          default:
            return "#3.-team-time-out";
        }
      case "4":
        switch (language) {
          case "de":
            return "#4.-passives-spiel";
          case "es":
            return "#4.-juego-pasivo";
          case "fr":
            return "#4.-jeu-passif";
          default:
            return "#4.-passive-play";
        }
      case "6":
        switch (language) {
          case "de":
            return "#6.-definition-einer-klaren-torgelegenheit";
          case "es":
            return "#6.--definición-de-clara-ocasión-de-gol";
          case "fr":
            return "#6.-définition-d’une-«-occasion-manifeste-de-but-»";
          default:
            return "#6.-definition-of-clear-chance-of-scoring";
        }
      case "7":
        switch (language) {
          case "de":
            return "#7.-eingreifen-durch-den-zeitnehmer";
          case "es":
            return "#7.-intervención/interrupción-por-parte-del-cronometrador-o-del-delegado";
          case "fr":
            return "#7.-intervention-du-chronométreur-ou-d’un-délégué";
          default:
            return "#7.-intervention-by-the-timekeeper-or-a-delegate";
        }
      case "8":
        switch (language) {
          case "de":
            return "#8.-verletzter-spieler";
          case "es":
            return "#8.-jugador-lesionado";
          case "fr":
            return "#8.-joueur-blessé";
          default:
            return "#8.-injured-player";
        }
      default:
        switch (language) {
          case "de":
            return "#erläuterungen-zu-den-spielregeln";
          case "es":
            return "#aclaraciones-a-las-reglas-de-juego";
          case "fr":
            return "#interprétations-des-règles-de-jeu";
          default:
            return "#clarifications-to-the-rules-of-the-game";
        }
    }
  }

  const mapGuidelines = rule.match(/^Guidelines(?:\s(.+))?|^New Guideline/);
  if (mapGuidelines) {
    switch (mapGuidelines[1]) {
      case "8:10c":
        switch (language) {
          case "de":
            return "#abstandsvergehen";
          case "es":
            return "#no-respetar-la-distancia";
          case "fr":
            return "#non-respect-de-la-distance";
          default:
            return "#not-respecting-the-distance";
        }
      case "8:10d":
        switch (language) {
          case "de":
            return "#disqualifikation-in-den-letzten-30-sekunden";
          case "es":
            return "#descalificación-durante-los-últimos-30-segundos-de-juego";
          case "fr":
            return "#disqualification-pendant-les-30-dernières-secondes-de-jeu";
          default:
            return "#disqualification-during-the-last-30-seconds";
        }
      default:
        switch (language) {
          case "de":
            return "#guidelines-und-interpretationen";
          case "es":
            return "#directrices-e-interpretaciones";
          case "fr":
            return "#directives-et-interprétations";
          default:
            return "#guidelines-and-interpretations";
        }
    }
  }

  const matchSAR = rule.match(/^Substitution Area Regulations/);
  if (matchSAR) {
    switch (language) {
      case "de":
        return "#auswechselraum-reglement";
      case "es":
        return "#reglamento-relativo-a-la-zona-de-cambios";
      case "fr":
        return "#règlement-des-zones-de-changement";
      default:
        return "#substitution-area-regulations";
    }
  }

  const matchHandSignals = rule.match(/^Hand signals/);
  if (matchHandSignals) {
    switch (language) {
      case "de":
        return "#handzeichen";
      case "es":
        return "#gestoforma";
      case "fr":
        return "#gestes";
      default:
        return "#hand-signals";
    }
  }

  const matchEquipment = rule.match(/^Regulations on Protective Equipment and Accessories/);
  if (matchEquipment) {
    switch (language) {
      case "de":
        return "#ausrüstungsreglement";
      case "es":
        return "#reglamento-sobre-equipos-de-protección-y-accesorios";
      case "fr":
        return "#règlement-pour-les-équipements-de-protection-et-accessoires";
      default:
        return "#regulations-on-protective-equipment-and-accessories";
    }
  }

  return "";
}
