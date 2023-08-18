import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { i18n } from "../utils/i18n";
import { bot } from "../index";

export default {
  data: new SlashCommandBuilder().setName("help").setDescription(i18n.__("help.description")),
  async execute(interaction: CommandInteraction) {
    let commands = bot.slashCommandsMap;

    let helpEmbed = new EmbedBuilder()
      .setTitle(i18n.__mf("help.embedTitle", { botname: interaction.client.user!.username }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor("#78A4FA")
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .setAuthor({ name: interaction.user!.username, iconURL: interaction.user!.displayAvatarURL() })
      .setFooter({ text: i18n.__("help.embedFooter"), iconURL: interaction.client.user!.displayAvatarURL() });

    commands.forEach((cmd) => {
      helpEmbed.addFields({
        name: `**${cmd.data.name}**`,
        value: `${cmd.data.description}`,
        inline: true
      });
    });

    helpEmbed.setTimestamp();

    return interaction.reply({ embeds: [helpEmbed] }).catch(console.error);
  }
};
