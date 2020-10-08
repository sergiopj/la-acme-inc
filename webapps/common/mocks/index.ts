import { Screen, Intent, HomeScreenData } from '../../../dialogs/src/models';

const START = 'intent.internal.living-app.start';

const script = {
    [START]: () => screen(Screen.SPLASH),
    [Intent.HOME]: () => screen(Screen.HOME, home),
    [Intent.ADVENTURE]: () => screen(Screen.ADVENTURE, adventure),
    [Intent.ACTION]: () => screen(Screen.ACTION, action),
    [Intent.SIMULATION]: () => screen(Screen.SIMULATION, simulation),
    [Intent.SPORTS]: () => screen(Screen.SPORTS, sports),
    [Intent.BACK]: () => screen(Screen.HOME, home),
};

const screen = (screen: Screen, msg: Record<string, any> = {}) => {
    return {
        activeChannels: ['movistar-home', 'set-top-box'],
        screen,
        ...msg,
    };
};

const home: HomeScreenData = {
    title: 'VIDEOGAMES CATEGORIES',
    "categories": [
        {
            "id": "cat01",
            "name": "adventure",
            "img": "https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80"
        },
        {
            "id": "cat02",
            "name": "action",
            "img": "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80"
        },
        {
            "id": "cat03",
            "name": "simulation",
            "img": "https://images.unsplash.com/photo-1581090016743-0791caf50d31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80"
        },
        {
            "id": "cat04",
            "name": "sports",
            "img": "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80"
        }
    ]
};

const action = {
    title: 'ACTION',
    "games": [
        {
            "id": "ac01",
            "cat": "action",
            "img": "streetfighter4.png",
            "title": "Street Fighter IV",
            "platform": "Playstation 4",
            "year": "2018",
            "description": "Street Fighter IV is a 2008 fighting game published by Capcom, who also co-developed the game with Dimps."
        },
        {
            "id": "ac02",
            "cat": "action",
            "img": "callofduty.jpg",
            "title": "Call of Duty: operations",
            "platform": "Windows 10",
            "year": "2020",
            "description": "Call of Duty is a first-person shooter video game franchise published by Activision."
        },
        {
            "id": "ac03",
            "cat": "action",
            "img": "quake2.jpg",
            "title": "Quake 2",
            "platform": "Windows 98",
            "year": "1997",
            "description": "Quake II is a first-person shooter video game released in December 1997."
        }
    ]
};

const sports = {
    title: 'SPORTS',
    "games": [
        {
            "id": "sp01",
            "cat": "sports",
            "title": "Fifa 2020",
            "platform": "Xbox One x",
            "year": "2020",
            "description": "Age of Empires is a series of historical real-time strategy video games, originally developed by Ensemble Studios and published by Xbox Game Studios. The first game was Age of Empires, released in 1997. Eight total games within the series have been released."
        },
        {
            "id": "sp02",
            "cat": "sports",
            "title": "NBA 2K 2020",
            "platform": "Playstation 4",
            "year": "2020",
            "description": "NBA 2k is a basket simulation game developed by Bullfrog Productions and published by Electronic Arts in 1997 for the PC in which players design and operate a privately owned hospital with the goal of curing patients of fictitious comical ailments."
        },
        {
            "id": "sp03",
            "cat": "sports",
            "title": "Super tennis",
            "platform": "Super Nintendo",
            "year": "1990",
            "description": "Super tennis is a sport simulation video game developed by the Redwood Shores studio of Maxis and published by Electronic Arts. It is the fourth major title in The Sims series and was originally announced on May 6, 2013, and was released in North America on September 2, 2014 for Microsoft Windows."
        }
    ]
};

const adventure = {
    title: 'ADVENTURE',
    "games": [
        {
            "id": "ad01",
            "cat": "adventure",
            "img": "zelda.png",
            "title": "The legend of Zelda",
            "platform": "Nintendo 64",
            "year": "1998",
            "description": "The Legend of Zelda is a high fantasy action-adventure video game franchise created by Japanese game designers."
        },
        {
            "id": "ad02",
            "cat": "adventure",
            "img": "tombraider.jpg",
            "title": "Tomb Raider",
            "platform": "PlayStation",
            "year": "1996",
            "description": "Development of Tomb Raider, the first video game, began in 1994; it was released in October 1996."
        },
        {
            "id": "ad03",
            "cat": "adventure",
            "img": "darksouls3.jpg",
            "title": "Dark Souls 3",
            "platform": "Xbox One",
            "year": "1998",
            "description": "Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco Entertainment."
        }
    ]
};

const simulation = {
    title: 'SIMULATION',
    "games": [
        {
            "id": "si01",
            "cat": "simulation",
            "title": "Age of empires",
            "platform": "Windows 98",
            "year": "1997",
            "description": "Age of Empires is a series of historical real-time strategy video games, originally developed by Ensemble Studios and published by Xbox Game Studios. The first game was Age of Empires, released in 1997. Eight total games within the series have been released."
        },
        {
            "id": "si02",
            "cat": "simulation",
            "title": "Theme Hospital",
            "platform": "Playstation",
            "year": "1996",
            "description": "Theme Hospital is a business simulation game developed by Bullfrog Productions and published by Electronic Arts in 1997 for the PC in which players design and operate a privately owned hospital with the goal of curing patients of fictitious comical ailments."
        },
        {
            "id": "si03",
            "cat": "simulation",
            "title": "The sims 4",
            "platform": "Windows 10",
            "year": "2018",
            "description": "The Sims 4 is a 2014 life simulation video game developed by the Redwood Shores studio of Maxis and published by Electronic Arts. It is the fourth major title in The Sims series and was originally announced on May 6, 2013, and was released in North America on September 2, 2014 for Microsoft Windows."
        }
    ]
};

export default script;
