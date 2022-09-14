import SpotifyAPI from "../SpotifyAPI";
import ArrayUtils from "../../utils/ArrayUtils";

export default class ArtistAPI {

    static getRelatedArtists(id: string) {
        return new Promise((resolve, reject) => {
            SpotifyAPI.url('/artists/' + id + '/related-artists')
                .needAuth()
                .get()
                .then((r) => {
                    if (r.data.error) {
                        reject(r.data);
                    } else {
                        resolve(r.data);
                    }
                })
                .catch((e) => {
                    reject(e.message);
                });
        });
    }

    static getRecommendations(ids: string[]) {
        let shuffleIds = ArrayUtils.shuffle(ids);

        return new Promise((resolve, reject) => {
            SpotifyAPI.url('/recommendations?limit=100&seed_artists=' + shuffleIds.slice(0, 4).join(','))
                .needAuth()
                .get()
                .then((r) => {
                    if (r.data.error) {
                        reject(r.data);
                    } else {
                        resolve(r.data);
                    }
                })
                .catch((e) => {
                    reject(e.message);
                });
        });
    }
}
