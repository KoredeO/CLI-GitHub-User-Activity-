#!/usr/bin/env node

const helper = require("./helper");

const helpText = `
GitHub Activity CLI  

Usage:  
  fetch-activity [username]           Fetch recent GitHub activity for a specific username.  
  fetch-activity [username] [event]   Fetch recent activity for a specific username and event type.  

Available Events:  
  - push           View recent push events.  
  - pull_request   View recent pull request events.  
  - issues         View recent issue-related events.  
  - forks          View recent repository fork events.  
  - stars          View recent starred repository events.  

Examples:  
  1. fetch activity octocat             Fetch activity for the user "octocat".  
  3. fetch activity octocat stars       Fetch recent starred repository events for "octocat".  
  `
  const commands = ["push", "pull_request", "issues", "forks", "stars"];

if(process.argv[2]== "--help"|| process.argv.length== 2){
    console.log(helpText);
    return
}
if(process.argv.length== 3){
    helper.viewAllEvents(process.argv[2]);
    return 
}
if(process.argv.length== 4){
    let event
    if(!commands.includes(process.argv[3])){
        console.log("This event is not part of the git events catered for. For more information use the command fetch-activity --help");
        return
    }
    if(process.argv[3].endsWith("s") && process.argv[3] !== "issues"){
        event = process.argv[3].slice(0,-1);
    }
    event = process.argv[3] +"event";
    event = event.replace("_","");
    console.log(event);

    helper.viewEvent(process.argv[2], event);
    return
}
if(process.argv.length>3){
    console.log("Invalid command. You can use fetch-activity --help to understand the commands available");
    return
}