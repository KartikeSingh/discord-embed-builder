import { Router } from 'express';
import { Message, MessageEmbed } from 'discord.js';
import bot from '../../class/bot';

const router = Router();
const client = bot;

router.post('/:guild/:channel', async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guild);

    if (!guild) return res.status(404).send({ message: "Guild Not Found", error: true });

    const channel: any = (await guild.channels.fetch()).filter(v => v.type === "GUILD_TEXT" || v.type === "GUILD_NEWS").get(req.params.channel);

    if (!channel) return res.status(404).send({ message: "Channel Not Found or provided channel is not a Text Channel", error: true });

    let embed = new MessageEmbed(req.body);
    if (req.body.footer) embed.setFooter(req.body.footer);
    if (req.body.image) embed.setImage(req.body.image);
    if (req.body.thumbnail) embed.setThumbnail(req.body.thumbnail);
    if(req.body.timestamps)embed.setTimestamp();

    channel.send({ embeds: [embed] }).then((v: Message) => {
        res.send(v);
    }).catch(() => {
        res.status(400).send({ error: true, message: "I was unable to send embed, Either the embed is invalid or I do not have permissions to send message in that channel." })
    })
})

export default router;