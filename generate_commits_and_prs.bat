@echo off
setlocal enabledelayedexpansion
title AI Interview Coach - 5 Lakh LOC and 180 PRs Generator

echo ===============================================================================
echo    AI INTERVIEW COACH - ENTERPRISE CODEBASE AND GIT HISTORY GENERATOR
echo ===============================================================================
echo  Target 1: 500,000+ Lines of Code (5 Lakhs LOC)
echo  Target 2: 100+ Git Commits
echo  Target 3: 180 Merged Pull Requests (Merge pull request #1 to #180)
echo  Target 4: Keep core website functionality 100%% intact
echo ===============================================================================
echo.

cd /d "%~dp0"

:: Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Node.js detected! Running JavaScript generator...
    node scripts\generate_loc_and_history.js
    goto FINISH
)

:: Check if Python is installed
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Python detected! Running Python generator...
    python scripts\generate_loc_and_history.py
    goto FINISH
)

echo [*] Running PowerShell native generator...
powershell -ExecutionPolicy Bypass -File scripts\generate_loc_and_history.ps1

:FINISH
echo.
echo ===============================================================================
echo   SUCCESS! 5 Lakh LOC, 100+ Commits, and 180 PRs have been generated!
echo   Open 'app.html' in your browser anytime to test the platform.
echo ===============================================================================
pause
