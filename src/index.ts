/*
import GoTrue, { User, Settings } from 'gotrue-js';

type authChangeParam = (user?: User) => string | void;

export type Settings = Settings;
export type User = User;

const defaultSettings = {
    autoconfirm: false,
    disable_signup: false,
    external: {
        bitbucket: false,
        email: true,
        facebook: false,
        github: false,
        gitlab: false,
        google: false,
    },
};

export type SvelteNetlifyIdentityAPI = {
    user: User | undefined;
    /!** not meant for normal use! you should mostly use one of the other exported methods to update the user instance *!/
    // setUser:todo some store method
    isConfirmedUser: boolean;
    isLoggedIn: boolean;
    signupUser: (
        email: string,
        password: string,
        data: Object
    ) => Promise<User | undefined>;
    loginUser: (
        email: string,
        password: string,
        remember?: boolean
    ) => Promise<User | undefined>;
    logoutUser: () => Promise<User | undefined>;
    requestPasswordRecovery: (email: string) => Promise<void>;
    recoverAccount: (
        token: string,
        remember?: boolean | undefined
    ) => Promise<User>;
    updateUser: (fields: { data: object }) => Promise<User | undefined>;
    getFreshJWT: () => Promise<string>;
    authedFetch: {
        get: (endpoint: string, obj?: {}) => Promise<any>;
        post: (endpoint: string, obj?: {}) => Promise<any>;
        put: (endpoint: string, obj?: {}) => Promise<any>;
        delete: (endpoint: string, obj?: {}) => Promise<any>;
    };
    _goTrueInstance: GoTrue;
    _url: string;
    loginProvider: (
        provider: 'bitbucket' | 'github' | 'gitlab' | 'google'
    ) => void;
    acceptInviteExternalUrl: (
        provider: 'bitbucket' | 'github' | 'gitlab' | 'google',
        token: string
    ) => string;
    settings: Settings;
};

const url = ''
const goTrueInstance =
    new GoTrue({
        APIUrl: `${url}/.netlify/identity`,
        setCookie: true,
    })
const user = goTrueInstance.currentUser() || undefined

/!******* external oauth *!/
type Provider = 'bitbucket' | 'github' | 'gitlab' | 'google';

const loginProvider = (provider: Provider) => {
    const url = goTrueInstance.loginExternalUrl(provider);
    window.location.href = url;
};
const acceptInviteExternalUrl = (provider: Provider, token: string) =>
    goTrueInstance.acceptInviteExternalUrl(provider, token);
const _settings = goTrueInstance.settings.bind(goTrueInstance);

function _setUser () {
//todo
}

/!******* email auth *!/
const signupUser = (email: string, password: string, data: Object) =>
    goTrueInstance.signup(email, password, data).then(_setUser); // TODO: make setUser optional?
const loginUser = (
    email: string,
    password: string,
    remember: boolean = true
) => goTrueInstance.login(email, password, remember).then(_setUser);
const requestPasswordRecovery = (email: string) =>
    goTrueInstance.requestPasswordRecovery(email);
const recoverAccount = (token: string, remember?: boolean | undefined) =>
    goTrueInstance.recover(token, remember);
const updateUser = (fields: { data: object }) => {
    if (user == null) {
        throw new Error('No current user found - are you logged in?');
    } else {
        return user!.update(fields) // e.g. { data: { email: "example@example.com", password: "password" } }
            .then(_setUser);
    }
};
const getFreshJWT = () => {
    if (!user) throw new Error('No current user found - are you logged in?');
    return user.jwt();
};
const logoutUser = () => {
    if (!user) throw new Error('No current user found - are you logged in?');
    return user.logout().then(() => _setUser());
};

const genericAuthedFetch = (method: string) => (
    endpoint: string,
    obj = {}
) => {
    if (!user || !user.token || !user.token.access_token)
        throw new Error('no user token found');
    const defaultObj = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token.access_token,
        },
    };
    const finalObj = Object.assign(defaultObj, { method }, obj);
    return fetch(endpoint, finalObj).then(res =>
        finalObj.headers['Content-Type'] === 'application/json' ? res.json() : res
    );
};
const authedFetch = {
    get: genericAuthedFetch('GET'),
    post: genericAuthedFetch('POST'),
    put: genericAuthedFetch('PUT'),
    delete: genericAuthedFetch('DELETE'),
};



/!**
 *
 *
 * Utils
 *
 *!/

function validateUrl (value: string) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value
    );
}
*/
