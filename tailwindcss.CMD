@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\tailwindcss@3.4.10\node_modules\tailwindcss\lib\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\tailwindcss@3.4.10\node_modules\tailwindcss\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\tailwindcss@3.4.10\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\tailwindcss@3.4.10\node_modules\tailwindcss\lib\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\tailwindcss@3.4.10\node_modules\tailwindcss\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\tailwindcss@3.4.10\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\tailwindcss\lib\cli.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\tailwindcss\lib\cli.js" %*
)
