call npm ci || call npm install
call npm run build
mkdir "C:\ProgramData\Jenkins\.jenkins\userContent\freestyle\"
xcopy /E /I /Y "C:\ProgramData\Jenkins\.jenkins\workspace\freestyle\dist\*" "C:\ProgramData\Jenkins\.jenkins\userContent\freestyle\"


