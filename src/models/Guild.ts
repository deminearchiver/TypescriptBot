import { Schema, model } from "mongoose";

interface Guild {
    guildId: String
}

const guildSchema = new Schema<Guild>({
    guildId: {
        type: String,
        required: true,
        unique: true
    }
});

const Guild = model<Guild>("Guild", guildSchema);

export default Guild;
