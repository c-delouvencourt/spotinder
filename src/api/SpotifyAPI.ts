import axios from 'axios';

export default class SpotifyAPI {
  _url: string;
  _headers: object = {};
  _parameters: object = {};
  _needAPIKey: boolean = false;
  _formData: FormData;

  /**
   * Create an request easily to the MeilleursBiens API
   *
   * @param url API Endpoint
   * @param needAPIKey
   * @param customUrl
   * @param curl
   */
  constructor(url: string, needAPIKey: boolean = false, customUrl: boolean = false, curl: string = '') {
    this._headers = {
      'Content-Type': 'application/json',
    };
    this._parameters = {};
    this._needAPIKey = false;
    this._formData = new FormData();

    if (url === '') throw new Error('Please specify an url to api endpoint.');
    this._url = "https://api.spotify.com/v1" + url;
    this._needAPIKey = needAPIKey;
  }

  /**
   * Create a Request staticly.
   *
   * @param url API endpoint
   * @param needAPIKey
   * @returns {SpotifyAPI}
   */
  static url(url: string, needAPIKey: boolean = false) {
    return new SpotifyAPI(url, needAPIKey);
  }

  static customUrl(url: string, needAPIKey: boolean = false) {
    return new SpotifyAPI(url, needAPIKey, true, url);
  }

  contentJson() {
    // @ts-ignore
    this._headers['Content-Type'] = 'application/json';
    return this;
  }

  contentURL() {
    // @ts-ignore
    this._headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return this;
  }

  contentFormData() {
    // @ts-ignore
    this._headers['Content-Type'] = 'multipart/form-data';
    return this;
  }

  /**
   * Add headers to the request.
   *
   * @param object Request headers in object format.
   */
  headers(object: object) {
    this._headers = { ...this._headers, ...object };
    return this;
  }

  _csrf(csrf: string) {
    this._headers = { ...this._headers, 'X-CSRF-Token': csrf };
    return this;
  }

  needAuth() {
    let jwt = localStorage.getItem("spotify_token");

    // @ts-ignore
    this._headers = { ...this._headers, "Authorization": 'Bearer ' + jwt.replaceAll('"', "") };

    return this;
  }

  /**
   * Add parameters to the request.
   *
   * @param object Request headers in object format.
   */
  parameters(object: object) {
    this._parameters = { ...this._parameters, ...object };
    return this;
  }

  formData(formData: FormData) {
    this._formData = formData;
    return this;
  }

  /**
   * Execute post request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  post() {
    return axios.post(this._url, JSON.stringify(this._parameters), {
      headers: { ...this._headers },
    });
  }

  postUpload() {
    return axios.post(this._url, this._formData, {
      headers: { ...this._headers },
    });
  }

  /**
   * Execute post request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  put() {
    return axios.put(this._url, JSON.stringify(this._parameters), {
      headers: { ...this._headers },
    });
  }

  putUpload() {
    return axios.put(this._url, this._formData, {
      headers: { ...this._headers },
    });
  }

  /**
   * Execute patch request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  patch() {
    return axios.patch(this._url, JSON.stringify(this._parameters), {
      headers: { ...this._headers },
    });
  }

  /**
   * Execute delete request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  delete() {
    return axios.delete(this._url, { headers: { ...this._headers } });
  }

  /**
   * Execute get request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  get() {
    const params = this._parameters;
    const headers = this._headers;

    let request: any = { params, headers };
    return axios.get(this._url, request);
  }
}
