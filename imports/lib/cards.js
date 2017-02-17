const blueTeam = 'BLUE TEAM'
const redTeam = 'RED TEAM'
const greyTeam = 'GREY TEAM'
const blueDark = '#0b438b'
const blueLight = '#5b8fd1'
const redDark = '#e50000'
const redLight = '#ff5f5f'
const greyDark = '#8c8c8c'
const greyLight = '#bbbbbb'


export default {
  0: {
    team: blueTeam,
    rol: 'PRESIDENT',
    description: 'AVOID THE BOMBER',
    image: '/../images/darth.svg',
    teamColorDark: blueDark,
    teamColorLight: blueLight,
  },
  1: {
    team: redTeam,
    rol: 'BOMBER',
    description: 'BE WITH THE PRESIDENT',
    image: '/../images/xwing.svg',
    teamColorDark: redDark,
    teamColorLight: redLight,
  },
  2: {
    team: blueTeam,
    rol: blueTeam,
    description: 'KEEP THE PRESIDENT AWAY FROM THE BOMBER',
    image: '/../images/empire.svg',
    teamColorDark: blueDark,
    teamColorLight: blueLight,
  },
  3: {
    team: redTeam,
    rol: redTeam,
    description: 'GET THE BOMBER TO BE WITH THE PRESIDENT',
    image: '/../images/rebelion.svg',
    teamColorDark: redDark,
    teamColorLight: redLight,
  },
  4: {
    team: greyTeam,
    rol: 'GAMBLER',
    description: 'AT THE END OF THE GAME, GUESS IF RED OR BLUE TEAM WON',
    image: '/../images/javaTheHutt.svg',
    teamColorDark: greyDark,
    teamColorLight: greyLight,
  },
  5: {
    team: blueTeam,
    rol: 'SPY',
    description: 'YOU ARE THE RED TEAM',
    image: '/../images/empire.svg',
    teamColorDark: blueDark,
    teamColorLight: blueLight,
  },
  6: {
    team: redTeam,
    rol: 'SPY',
    description: 'YOU ARE THE BLUE TEAM',
    image: '/../images/rebelion.svg',
    teamColorDark: redDark,
    teamColorLight: redLight,
  },

}
