import SpotifyAPI from "../SpotifyAPI";

export default class UserAPI {

    static getUserTopArtists() {
        return new Promise((resolve, reject) => {
            SpotifyAPI.url('/me/top/artists')
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
