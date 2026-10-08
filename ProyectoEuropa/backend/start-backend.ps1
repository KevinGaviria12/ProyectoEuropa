$ErrorActionPreference = 'Stop'

$port = 3000
$javaHome = 'C:\Program Files\Java\jdk-21.0.12'

if (-not (Test-Path (Join-Path $javaHome 'bin\java.exe'))) {
    throw "No se encontró Java en $javaHome. Ajusta la variable `$javaHome en este script."
}

$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1

if ($listener) {
    $process = Get-Process -Id $listener.OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "El backend ya está ejecutándose en http://localhost:$port (PID $($process.Id))."
        exit 0
    }
}

$env:JAVA_HOME = $javaHome
Set-Location $PSScriptRoot
mvn spring-boot:run
