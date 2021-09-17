import { Client, ClientOptions, Collection, Intents } from "discord.js";
import embedCommand from '../commands/embed';
import { REST } from '@discordjs/rest';
import Args from "./args";

class bot extends Client {
    commands: Collection<String, any> = new Collection();

    constructor(options: ClientOptions) {
        super(options);

        this.login(process.env.CLIENT_TOKEN).then(async () => {
            await this.setCommands()
            this.handleCommands();
        })
    }

    setCommands() {
        return new Promise((res, rej) => {
            this.commands.set(embedCommand.name, embedCommand);

            const rest = new REST({ version: '9' }).setToken(this.token || "no_token");

            rest.put(`/applications/${this.user?.id}/guilds/732883841395720213/commands`, {
                body: this.commands.toJSON()
            })
                .then(v => res(v))
                .catch(e => rej(e));
        });
    }


    handleCommands() {
        this.on('interactionCreate', (interaction) => {
            if (!interaction.isCommand() || !this.commands.get(interaction.commandName)) return;

            const command = this.commands.get(interaction.commandName);

            // @ts-ignore
            const args = new Args(interaction.options._hoistedOptions);

            command.run(this, interaction, args);
        })
    }
}

const client = new bot({ intents: new Intents() });

client.on('ready', () => console.log("client is up and running!"));

export default client;