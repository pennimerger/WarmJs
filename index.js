require("dotenv").config();
const chalk = require("chalk");
const ProgressBar = require("progress");
const readline = require("readline");
const prompt = require("prompt-sync")();
const name = (chalk.blue(process.env.NAME))
const choice = (chalk.yellow(process.env.CHOICE))


function statement() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`Statement? `, (statement) => {
    console.log(chalk.red(`${statement} ..to the ${choice} ${name}.`));
    rl.close();
  });
}

const bar = new ProgressBar("downloading [:bar] :rate/bps :percent :etas", {
  total: 20,
});

const cond = prompt("Do you want to write a statement to the owner of this file? y/n ");
if (cond === 'y') {
  const timer = setInterval(() => {
    bar.tick();
    if (bar.complete) {
      statement();
      clearInterval(timer);
    }
  })
}
else {
  process.exit(0);
}