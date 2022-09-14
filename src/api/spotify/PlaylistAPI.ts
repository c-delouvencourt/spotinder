import SpotifyAPI from "../SpotifyAPI";
import ArrayUtils from "../../utils/ArrayUtils";

export default class PlaylistAPI {

    static getCurrentUser() {
        return new Promise((resolve, reject) => {
            SpotifyAPI.url('/me')
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

    static async createPlaylist() {
        let user = await this.getCurrentUser();

        return new Promise((resolve, reject) => {
            // @ts-ignore
            SpotifyAPI.url('/users/' + user.id + '/playlists')
                .needAuth()
                .parameters({
                    name: 'Spotinder | ' + new Date().getDay() + '/' + new Date().getMonth() + ' | ' + new Date().getHours() + ':' + new Date().getMinutes(),
                    public: false,
                    description: 'Playlist created with Spotinder, the spotify musics discovery app.'
                })
                .post()
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

    static async createPlaylistAndAllSongsToThem(ids: string[]) {
        let user = await this.getCurrentUser();
        let playlist = await this.createPlaylist();

        return new Promise((resolve, reject) => {
            // @ts-ignore
            SpotifyAPI.url('/playlists/' + playlist.id + '/tracks')
                .needAuth()
                .contentJson()
                .parameters({
                    uris: ids
                })
                .post()
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
