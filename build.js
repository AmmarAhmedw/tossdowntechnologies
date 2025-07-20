#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if we're on Vercel
const isVercel = process.env.VERCEL === '1';

if (isVercel) {
  console.log('Running on Vercel - handling optional dependencies...');
  
  // Try to install the missing Rollup binary
  try {
    execSync('npm install @rollup/rollup-linux-x64-gnu', { stdio: 'inherit' });
  } catch (error) {
    console.log('Failed to install specific Rollup binary, continuing...');
  }
}

// Run the actual build
try {
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 