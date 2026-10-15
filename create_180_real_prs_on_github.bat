@echo off
setlocal
title AI Interview Coach - Create 180 Real Pull Requests on GitHub

cd /d "%~dp0"

echo ===============================================================================
echo    OFFICIAL GITHUB 180 PULL REQUESTS CREATOR AND MERGER
echo    Target: https://github.com/Ramyasree1725/interview-ai/pulls
echo ===============================================================================
echo.

node scripts\create_real_github_prs.js

pause
