import Crypto from 'crypto-js';
import bot from '../class/bot';
import Axios from 'axios';

const d_base = "http://discord.com/api/v8"

export function encrypt(string: string): string {
    return Crypto.AES.encrypt(string, process.env.SECRET_KEY || "very_secret_key").toString();
}

export function decrypt(string: string): string {
    return Crypto.AES.decrypt(string, process.env.SECRET_KEY || "very_secret_key").toString(Crypto.enc.Utf8);
}

export function getGuilds(user: user) {
    return new Promise(async res => {
        const botGuilds = bot.guilds.cache.toJSON();
        const userGuilds: Array<guild> = (await getUserGuilds(user))?.filter((guild) => (guild.permissions & 0x20) === 0x20);
        const guilds = userGuilds.filter(g => botGuilds.some(v => v.id === g.id));

        res(guilds);
    })
}

async function getUserGuilds(user: user): Promise<Array<guild>> {

    return new Promise((res) => {
        Axios.get(`${d_base}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${decrypt(user.access_token)}`
            }
        }).then(v => {
            res(v.data);
        }).catch((e) => {
            res([])
        })
    })
}

export async function getGuildChannels(id: string, user: user) {
    return new Promise(res => {
        Axios.get(`${d_base}/guilds/${id}/channels`, {
            headers: {
                Authorization: `Bot ${process.env.CLIENT_TOKEN}`
            }
        }).then(v => {
            const channels: Array<channel> = v.data;

            res(channels.filter(v => v.type === 0 || v.type === 5 || v.type === 10 || v.type === 11));
        }).catch((e) => {
            console.log(e.toJSON());

            res([])
        })
    })
}

export async function getGuild(id: string) {
    return new Promise(res => {
        Axios.get(`${d_base}/guilds/${id}`, {
            headers: {
                Authorization: `Bot ${process.env.CLIENT_TOKEN}`
            }
        }).then(v => {
            res(v.data);
        }).catch((e) => {
            res(null)
        })
    })
}

interface user {
    id: string,
    name: string,
    avatar: string,
    refresh_token: string,
    access_token: string,
}

interface guild {
    id: string,
    name: string,
    icon: string,
    owner: boolean,
    permissions: number,
}

interface channel {
    id: string,
    name: string,
    type: number,
}