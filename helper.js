#!/usr/bin/env node

const { use } = require("react")

const getActivity =async (username)=>{
    const response = await fetch(` https://api.github.com/users/${username}/events`)
    const activities =await  response.json()
    if(activities.status == 404){
        throw Error( "Invalid username. Check your username and try again")
    }
    if(activities.status){
        throw Error( activities.message, ". Something went wrong")
    }
    return activities
}

const processActivities = (activities) => {
    const formattedActivities = []
    activities.forEach(element => {
        if(element.type === "PushEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Pushed ${existingActivity.count} commits to ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Pushed  1 commit to ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "CommitCommentEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Added ${existingActivity.count} commit comments to ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Added  1 commit comment to ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "CreateEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Created ${existingActivity.count} branches in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Created  1 branch in ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "DeleteEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Deleted ${existingActivity.count} ${element.payload.ref_type==="tag"?"tags":"branches"} from ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    tag:element.payload.ref_type,
                    comment:`Deleted 1 ${element.payload.ref_type} from ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "ForkEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Forked ${existingActivity.count} repos from ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Forked a repo from ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "IssueCommentEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Created  ${existingActivity.count} new issue comments in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`created a new issue comment in ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "IssuesEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Opened ${existingActivity.count} new issues in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Opened 1 new issue in ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "ReleaseEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Created ${existingActivity.count} new releases in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Created 1 new release in ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "PullRequestEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Created ${existingActivity.count} new pull requests in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Created 1 new pull request in ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "PullRequestReviewEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Reviewed ${existingActivity.count} pull requests  in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Reviewed 1 pull request in ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "PullRequestReviewCommentEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Created ${existingActivity.count} new pull request comments in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Created 1 new pull request comment in ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "PushEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Pushed ${existingActivity.count} commits to ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Pushed 1 commit to ${element.repo.name}`,
                    count:1
                })
            }
        }
        else if(element.type === "WatchEvent"){
            const existingActivity = formattedActivities.find(
                activity => activity.repoName === element.repo.name && activity.type === element.type
            );
            if(existingActivity){
                existingActivity.count += 1
                existingActivity.comment = `Watched ${existingActivity.count} repos in ${element.repo.name}`
            }else{
                formattedActivities.push({
                    repoName:element.repo.name,
                    type:element.type,
                    comment:`Watched 1 repo in ${element.repo.name}`,
                    count:1
                })
            }
        }


    });
    return formattedActivities
}

 const viewAllEvents = async (username)=>{
    try{
    const data = await getActivity(username)
   
    if(data.length == 0){
        console.log("No data found for this user")
        return 
    }
    
    const processedData = processActivities(data)
    if(processedData.length==0){
        console.log("The data found was not part of the git events catered for")
        return
    }
    // console.log(processedData)
    processedData.forEach((element) =>{
        console.log("-> ", element.comment)
    })}
    catch(err){
        console.log(err.message)
    }
}                                                               

const viewEvent = async (username, event)=>{
    try{
    const data = await getActivity(username)
    if(data.length == 0){
        console.log("No data found for this user")
        return
    }
    const filteredData = data.filter((element) => element.type.toLowerCase() === event)
    const processedData = processActivities(filteredData)
    if(processedData.length==0){
        console.log("Theres no data for this event")
        return
    }
    processedData.forEach((element) =>{
        console.log("-> ", element.comment)
    })}
    catch(err){
        console.log(err.message)
}
}
module.exports = {viewAllEvents,viewEvent}