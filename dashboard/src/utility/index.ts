import Axios from 'axios';

const d_base = "https://cdn.discordapp.com"

export function getIcon(hash: string, id: string) {
    return `${d_base}/icons/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}?size=512`
}

export function createEmbed(guild: string, channel: string, embed: Embed) {
    return Axios.post(`http://localhost:3001/api/embed/${guild}/${channel}`, embed);
}

interface Embed {
    title: string | undefined
    description: string | undefined
    footer: string | undefined
    timestamps: boolean,
    color: string | undefined
    image: string | undefined
    thumbnail: string | undefined
    url: string | undefined
    author: {
        name: string | undefined
        iconURL: string | undefined
        url: string | undefined
    },
}