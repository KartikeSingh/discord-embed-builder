import dotenv from 'dotenv';

dotenv.config();

import Express from "express";
import expressSession from 'express-session';
import Routes from "./routes";
import store from 'connect-mongo';
import mongoose from "mongoose";
import cors from 'cors';
import passport from 'passport';
import rootSchema from './graphql';
import './class/bot';
import { graphqlHTTP } from 'express-graphql';
import './strategy/discord';
import { MessageEmbed } from 'discord.js';

mongoose.connect(process.env.MONGO_URI || "no_uri");

const app = Express();

app.use(cors({
  origin: ["https://krazyboard.vercel.app", "http://localhost:3000"],
  credentials: true
}));

app.use(Express.json());

app.use(expressSession({
  secret: process.env.SECRET || "some secret",
  cookie: {
    maxAge: 3600000 * 24,
  },
  name: "discordOAuth2",
  resave: false,
  saveUninitialized: false,
  store: new store({ mongoUrl: process.env.MONGO_URI })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", Routes);

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: rootSchema
}))

app.use((req, res) => {
  res.status(404).send({
    error: true,
    message: "We are unable to find the requested route",
  });
});

app.listen(3001, () => console.log("gg"));