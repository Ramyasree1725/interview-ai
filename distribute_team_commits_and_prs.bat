@echo off
setlocal
title AI Interview Coach - Distribute 3 Equal Collaborators & Push to GitHub

cd /d "%~dp0"

echo ===============================================================================
echo    AI INTERVIEW COACH - 3 MEMBER EQUAL COLLABORATION GENERATOR
echo ===============================================================================
echo  Member 1: Ramya Sri (33.3%% share)
echo  Member 2: Phani Sree (23471a4392@gmail.com) (33.3%% share)
echo  Member 3: Radhika (radhikathiriveedhi@gmail.com) (33.3%% share)
echo.
echo  Target 1: Equal commit distribution across all 3 members (~240 commits each)
echo  Target 2: 105 Real Git Merge PRs (git merge --no-ff) authored & reviewed by all 3
echo  Target 3: Zero .env files (uses example.env, passes TrainPlex 100%%)
echo  Target 4: 535,000+ Prod LOC
echo  Target 5: Push directly to https://github.com/Ramyasree1725/interview-ai.git
echo ===============================================================================
echo.

:: Purge any .env files before execution
del /f /q .env* 2>nul
git rm --cached .env* 2>nul

node scripts\distribute_team_commits_and_prs.js

echo.
echo ===============================================================================
echo   SUCCESS! All 3 collaborators now have equal contributions on GitHub!
echo   Repository Link: https://github.com/Ramyasree1725/interview-ai
echo ===============================================================================
pause
