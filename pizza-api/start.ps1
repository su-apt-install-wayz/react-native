# Script start.ps1

# Start Docker Compose
Write-Output "Starting Docker Compose..."
docker-compose up -d

# Wait for containers to be ready
Write-Output "Waiting for containers to be ready..."
Start-Sleep -Seconds 10

# Determine the exact container name for the PostgreSQL service
$container_name = docker-compose ps -q db

# Check if PostgreSQL is ready
$pg_ready = $false
while (-not $pg_ready) {
    try {
        $pg_ready = docker exec $container_name pg_isready -U user -d pizza_db
        Write-Output "PostgreSQL is ready."
    } catch {
        Write-Output "Waiting for PostgreSQL to be ready..."
        Start-Sleep -Seconds 5
    }
}

# Install npm dependencies
Write-Output "Installing npm dependencies..."
npm install

# Run the Node.js server
Write-Output "Starting Node.js server..."
node index.js
