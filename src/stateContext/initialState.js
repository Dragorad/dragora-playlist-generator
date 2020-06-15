import { genresList } from '../workers/genresAndInstrumentsList'
import { descriptorsList } from '../workers/descriptorsList'
// import { app } from '../index'
// import { firstPlaylist} from '../index'



const genresFilterList = genresList.join(' ').split(' ')
    .filter(elem => elem !== "and")


// export const getNewPlayList = async () => {
//         const playlist = await app.functions.generatePlaylist({ bpm: 169, delta: 20 })
//         console.log(playlist)
//         return playlist
//     }




// Brightness: 25,
//     Loudness: 45,
//     Tempo: 14,
//     Diversity: 30,
//     diversityStrings: [],

const initialState = {
    playListParams: {
        Brightness: 25,
        Loudness: 45,
        Tempo: 14,
        Diversity: 20,
        diversityStrings: [],
        bpm: 120
    },
    btnState: {
        genresArr: ['genres'],
        descriptorsArr: ['descr']

    },
    sliderFormValues: {
        genresList: genresFilterList,
        Brightness: 35,
        Loudness: 60,
        Tempo: 60
    },
    diversity: {
        value: 20,
        params: []
    },
    playlist: [
        {
            "artist": "Adele",
            "titleName": "Melt My Heart to Stone",
            "bpm": 162,
            "url": "_N-9Xbj7N1w?list=TLPQMjUwNTIwMjBizNkZakWMJg"
        },
        {
            "artist": "Caro Emerald",
            "titleName": "Never Ever",
            "bpm": 148,
            "url": "ActtqOF5vck?list=TLPQMjUwNTIwMjBizNkZakWMJg"
        },
        {
            "artist": "Melissa Etheridge",
            "titleName": "Rock Me Baby",
            "bpm": 172,
            "url": "ujaLElYJZBo?list=TLPQMjUwNTIwMjBizNkZakWMJg"
        },
        {
            "artist": "Buddy Guy",
            "titleName": "Messin' with the Kid",
            "bpm": 138,
            "url": "bJo0TtLJEpg"
        },
        {
            "artist": "Victor Wainwright and The Train",
            "titleName": "Healing",
            "bpm": 162,
            "url": "3kmLygbiQts?list=TLPQMjUwNTIwMjAl01UhABSPAg"
        },
        {
            "artist": "Chris Cornell",
            "bpm": 153,
            "titleName": "Through the Window",
            "url": "JiowFZvz47k"
        },
        {
            "artist": "Victor Wainwright and The Train",
            "titleName": "Everything I Need",
            "bpm": 150,
            "url": "2ooTXv1fQDw"
        }
    ]
}

export default initialState