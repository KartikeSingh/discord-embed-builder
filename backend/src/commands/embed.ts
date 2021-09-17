import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import Args from '../class/args';

class embed {
    name = "embed";
    description = "An command to create embeds for your server.";
    permissions = ["ADMINISTRATOR"];
    options = [
        {
            name: "channel",
            required: true,
            type: 7,
            description: "The channel where you want to send the embed"
        },
        {
            name: "title",
            required: false,
            type: 3,
            description: "The title for the embed"
        },
        {
            name: "description",
            required: false,
            type: 3,
            description: "The description for the embed"
        },
        {
            name: "footer",
            required: false,
            type: 3,
            description: "The footer for the embed"
        },
        {
            name: "author",
            required: false,
            type: 6,
            description: "The author of the embed"
        },
        {
            name: "color",
            required: false,
            type: 3,
            description: "The color of the embed"
        },
        {
            name: "timestamps",
            required: false,
            type: 5,
            description: "Embed should have timestamps?"
        },
        {
            name: "image",
            required: false,
            type: 3,
            description: "The image on the embed"
        },
        {
            name: "url",
            required: false,
            type: 3,
            description: "The link to redirect on clicking on the title"
        },
    ];

    public async run(client: Client, interaction: CommandInteraction, args: Args) {
        const embed = new MessageEmbed();

        const title = args.get("title"),
            description = args.get("description"),
            footer = args.get("footer"),
            author = interaction.guild?.members.cache.get(args.get("author"))?.user,
            color = args.get("color"),
            timestamps = args.get("timestamps"),
            image = args.get("image"),
            url = args.get("url"),
            channel: any = interaction.guild?.channels.cache.get(args.get("channel"));

        if (!channel || (channel.type !== "GUILD_NEWS" && channel.type !== "GUILD_TEXT")) return interaction.reply({
            embeds: [{
                color: "DARK_RED",
                title: "Invalid Channel was provided",
            }]
        });

        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (footer) embed.setFooter(footer);
        if (author) embed.setAuthor(author.username, author.displayAvatarURL({ dynamic: true }), author.displayAvatarURL({ dynamic: true }));
        if (color) embed.setColor(color);
        if (timestamps) embed.setTimestamp();
        if (image) embed.setImage(image);
        if (url) embed.setURL(url);

        if (!title && !description && !footer && !image) return interaction.reply({
            embeds: [{
                title: "At least choose one text option or a image",
                color: "DARK_RED"
            }]
        })

        channel.send({ embeds: [embed] }).then(() => {
            interaction.reply({
                embeds: [{
                    color: "GREEN",
                    title: "Embed sent successfully"
                }]
            });
        }).catch(() => {
            interaction.reply({
                embeds: [{
                    color: "RED",
                    title: "I was unable to send the embed to that channel"
                }]
            });
        })
    }
}

export default new embed();