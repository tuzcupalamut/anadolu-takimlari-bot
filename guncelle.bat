@echo off
title Anadolu Takimlari Guncelle

cd /d "%~dp0"

echo.
echo GitHub guncellemesi basliyor...
echo.

git status

echo.
set /p msg=Commit mesaji: 

git add .

git commit -m "%msg%"

git push

echo.
echo ======================
echo GUNCELLEME BITTI
echo Railway deploy edecek
echo ======================

pause