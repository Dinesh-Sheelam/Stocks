#!/bin/bash

# Start backend
echo "Starting Backend..."
python -m uvicorn backend.main:app --reload --port 8000 &
BACKEND_PID=$!

# Start frontend
echo "Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

wait