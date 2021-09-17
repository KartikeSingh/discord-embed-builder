import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: String,
    name: String,
    avatar: String,
    refresh_token: String,
    access_token: String,
});

export default model("dashboard_user_data", userSchema);