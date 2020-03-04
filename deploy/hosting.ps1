param(
    [string]$ci_token,
    [string]$project_id,
    [string]$release_message
)

$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

npm i -g firebase-tools
write-host "Starting hosting deployment.";
write-host "Firebase version:";
firebase --version;
write-host "firebase use $project_id --token $ci_token"
firebase use $project_id --token $ci_token
write-host "firebase target:apply hosting $env:ENVIRONMENT $env:APP_ID"
firebase target:apply hosting $env:ENVIRONMENT $env:APP_ID
write-host "firebase deploy --only hosting:$env:ENVIRONMENT --token $ci_token --message Release/$release_message";
firebase deploy --only hosting:$env:ENVIRONMENT --token "$ci_token" --message "Release/$release_message";
write-host "Hosting deployment finished.";