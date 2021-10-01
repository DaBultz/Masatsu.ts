import { DiscordEvent } from '../enums/discordEvent'
import { Intents } from 'discord.js'

// TODO: Look for a better way of doing this
export const getIntentFromEvent = (event: DiscordEvent): number[] => {
  switch (event) {
    // GUILDS (1 << 0)
    case DiscordEvent.GuildCreate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.GuildUpdate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.GuildDelete: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.GuildRoleCreate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.GuildRoleUpdate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.GuildRoleDelete: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ChannelCreate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ChannelUpdate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ChannelDelete: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ChannelPinsUpdate: return [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES]
    case DiscordEvent.ThreadCreate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ThreadUpdate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ThreadDelete: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ThreadListSync: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ThreadMemberUpdate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.ThreadMembersUpdate: return [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]
    case DiscordEvent.StageInstanceCreate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.StageInstanceUpdate: return [Intents.FLAGS.GUILDS]
    case DiscordEvent.StageInstanceDelete: return [Intents.FLAGS.GUILDS]

    // GUILD_MEMBERS (1 << 1)
    case DiscordEvent.GuildMemberAdd: return [Intents.FLAGS.GUILD_MEMBERS]
    case DiscordEvent.GuildMemberUpdate: return [Intents.FLAGS.GUILD_MEMBERS]
    case DiscordEvent.GuildMemberRemove: return [Intents.FLAGS.GUILD_MEMBERS]

    // GUILD_BANS (1 << 2)
    case DiscordEvent.GuildBanAdd: return [Intents.FLAGS.GUILD_BANS]
    case DiscordEvent.GuildBanRemove: return [Intents.FLAGS.GUILD_BANS]

    // GUILD_EMOJIS_AND_STICKERS(1 << 3) -
    case DiscordEvent.GuildEmojiUpdate: return [Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS]
    case DiscordEvent.GuildEmojiDelete: return [Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS]

    // GUILD_INTEGRATIONS (1 << 4)
    case DiscordEvent.GuildIntegrationsUpdate: return [Intents.FLAGS.GUILD_INTEGRATIONS]

    // GUILD_WEBHOOKS (1 << 5)
    case DiscordEvent.WebhooksUpdate: return [Intents.FLAGS.GUILD_WEBHOOKS]

    // GUILD_INVITES (1 << 6)
    case DiscordEvent.InviteCreate: return [Intents.FLAGS.GUILD_INVITES]
    case DiscordEvent.InviteDelete: return [Intents.FLAGS.GUILD_INVITES]

    // GUILD_VOICE_STATES (1 << 7)
    case DiscordEvent.VoiceStateUpdate: return [Intents.FLAGS.GUILD_VOICE_STATES]

    // GUILD_PRESENCES(1 << 8)
    case DiscordEvent.PresenceUpdate: return [Intents.FLAGS.GUILD_PRESENCES]

    // GUILD_MESSAGES (1 << 9) & DIRECT_MESSAGES (1 << 12)
    case DiscordEvent.MessageCreate: return [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
    case DiscordEvent.MessageUpdate: return [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
    case DiscordEvent.MessageDelete: return [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
    case DiscordEvent.MessageBulkDelete: return [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]

    // GUILD_MESSAGE_REACTIONS (1 << 10) & DIRECT_MESSAGE_REACTIONS (1 << 13)
    case DiscordEvent.MessageReactionAdd: return [Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]
    case DiscordEvent.MessageReactionRemove: return [Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]
    case DiscordEvent.MessageReactionRemoveAll: return [Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]
    case DiscordEvent.MessageReactionRemoveEmoji: return [Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]

    // GUILD_MESSAGE_TYPING (1 << 11) & DIRECT_MESSAGE_TYPING (1 << 14)
    case DiscordEvent.TypingStart: return [Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGE_TYPING]

    default:
      // Check if the event is in the DiscordEvent enum
      if (Object.values(DiscordEvent).includes(event)) {
        return []
      }

      throw new Error(`${event} was not recongized as an event`)
  }
}
