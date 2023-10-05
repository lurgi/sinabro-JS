#!/usr/bin/env node

import { Command } from "commander";
import fetch from "node-fetch";
import os from "os";
import fs from "fs";

const program = new Command();

program.name("My CLI").description("A little CLI to help my computer life");

const filename = `${os.homedir()}/.cli-config.json`;
const CONFIG = JSON.parse(fs.readFileSync(filename).toString());

program
  .command("todo")
  .description("Add a new todo Things app")
  .argument("<todo>", "todo text to add")
  .option("-t, --today", "is this for today?")
  .action((todo, options) => {
    console.log("todo!", { todo, options });
  });

program.command("setup");

program
  .command("discord")
  .description("Send a message to my personal discord")
  .argument("<message>", "message to send")
  .action(async (message, options) => {
    console.log("sending message to discord", message);

    await fetch(CONFIG.discord_webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });
  });

program.parse();
