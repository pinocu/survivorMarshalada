const LIGAS = {
  "LaLiga": {
    alta: ["Barcelona", "Real Madrid", "Villarreal", "Atlético de Madrid", "Real Betis"],
    media: ["Celta de Vigo", "Getafe", "Rayo Vallecano", "Valencia", "Real Sociedad",
            "Espanyol", "Athletic Club", "Sevilla", "Alavés"],
    baja: ["Elche", "Levante", "Osasuna", "Racing de Santander",
           "Deportivo de La Coruña", "Málaga"],
  },
  "Premier League": {
    alta: ["Arsenal", "Manchester City", "Manchester United", "Aston Villa", "Liverpool"],
    media: ["Bournemouth", "Sunderland", "Brighton", "Brentford", "Chelsea",
            "Fulham", "Newcastle United", "Everton", "Leeds United"],
    baja: ["Crystal Palace", "Nottingham Forest", "Tottenham Hotspur",
           "Coventry City", "Ipswich Town", "Hull City"],
  },
  "Serie A": {
    alta: ["Inter", "Napoli", "Roma", "Como", "Milan"],
    media: ["Juventus", "Atalanta", "Bologna", "Lazio", "Udinese",
            "Sassuolo", "Parma", "Torino", "Cagliari"],
    baja: ["Fiorentina", "Genoa", "Lecce", "Venezia", "Frosinone", "Monza"],
  },
  "Bundesliga": {
    alta: ["Bayern Múnich", "Borussia Dortmund", "RB Leipzig", "VfB Stuttgart"],
    media: ["Hoffenheim", "Bayer Leverkusen", "Freiburg", "Eintracht Frankfurt",
            "Augsburg", "Mainz 05", "Union Berlin", "Borussia Mönchengladbach"],
    baja: ["Hamburger SV", "1. FC Köln", "Werder Bremen",
           "Schalke 04", "Elversberg", "Paderborn"],
  },
};

const ASCENDIDOS = new Set([
  "Racing de Santander", "Deportivo de La Coruña", "Málaga",
  "Coventry City", "Ipswich Town", "Hull City",
  "Venezia", "Frosinone", "Monza",
  "Schalke 04", "Elversberg", "Paderborn",
]);

const CANTIDAD_POR_BOMBO = { alta: 1, media: 2, baja: 2 };
const ORDEN_BOMBOS = ["alta", "media", "baja"];
const NOMBRE_BOMBO = { alta: "ALTA", media: "MEDIA", baja: "BAJA" };
