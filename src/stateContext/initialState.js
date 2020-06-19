import { genresList } from '../workers/genresAndInstrumentsList'
import { descriptorsList } from '../workers/descriptorsList'
import { app } from '../index'
import { firstPlaylist } from '../index'

// const initalPlaylist = firstPlaylist

const genresFilterList = genresList.join(' ').split(' ')
    .filter(elem => elem !== "and")


export const getNewPlayList = async () => {
        const playlist = await app.functions.generatePlaylist({ bpm: 169, delta: 20 })
        console.log(playlist)
        return playlist
    }

export const initialState = {
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
    urlIdx:0,
    playlist:[
        {
          "artist": "Boz Scaggs",
          "titleName": "Last Tango On 16th Street",
          "bpm": 128,
          "url": "e9sjaVmnrMQ"
        },
        {
          "artist": "Rob Thomas",
          "titleName": "Early In The Morning",
          "bpm": 161,
          "url": "lzoEsD8fjnk"
        },
        {
          "artist": "Caro Emerald",
          "titleName": "Never Ever",
          "bpm": 148,
          "url": "ActtqOF5vck?list=TLPQMjUwNTIwMjBizNkZakWMJg"
        },
        {
          "artist": "Macy Gray",
          "titleName": "I Try",
          "bpm": 152,
          "url": "N2o30blVnpg"
        },
        {
          "artist": "DB Boulevard",
          "titleName": "Point of Dub (Sisco Lounge mix)",
          "bpm": 129,
          "url": "qhWYcgDk5lE"
        }
      ] 
   
}

// export default initialState


 // [
    //     {
    //         "artist": "Adele",
    //         "titleName": "Melt My Heart to Stone",
    //         "bpm": 162,
    //         "url": "_N-9Xbj7N1w?list=TLPQMjUwNTIwMjBizNkZakWMJg"
    //     },
    //     {
    //         "artist": "Caro Emerald",
    //         "titleName": "Never Ever",
    //         "bpm": 148,
    //         "url": "ActtqOF5vck?list=TLPQMjUwNTIwMjBizNkZakWMJg"
    //     },
    //     {
    //         "artist": "Melissa Etheridge",
    //         "titleName": "Rock Me Baby",
    //         "bpm": 172,
    //         "url": "ujaLElYJZBo?list=TLPQMjUwNTIwMjBizNkZakWMJg"
    //     },
    //     {
    //         "artist": "Buddy Guy",
    //         "titleName": "Messin' with the Kid",
    //         "bpm": 138,
    //         "url": "bJo0TtLJEpg"
    //     },
    //     {
    //         "artist": "Chris Cornell",
    //         "bpm": 153,
    //         "titleName": "Through the Window",
    //         "url": "JiowFZvz47k"
    //     },
    //     {
    //         "artist": "Victor Wainwright and The Train",
    //         "titleName": "Everything I Need",
    //         "bpm": 150,
    //         "url": "2ooTXv1fQDw"
    //     }
    // ]