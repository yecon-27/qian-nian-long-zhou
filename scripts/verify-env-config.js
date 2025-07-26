#!/usr/bin/env node

/**
 * Environment Configuration Verification Script
 * This script verifies that all required environment variables are properly configured
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Required environment variables for production
const REQUIRED_VARS = [
  'NODE_ENV',
  'VITE_APP_TITLE',
  'VITE_APP_VERSION',
  'VITE_APP_BASE_API',
  'VITE_API_BASE_URL',
  'VITE_RUOYI_API_BASE_URL',
  'VITE_RUOYI_UPLOAD_URL'
];

// Optional environment variables with defaults
const OPTIONAL_VARS = {
  'VITE_USE_MOCK': 'false',
  'VITE_ENABLE_MOCK': 'false',
  'VITE_ENABLE_AUTH': 'true',
  'VITE_ENABLE_FALLBACK': 'true'
};

// Expected production values
const PRODUCTION_VALUES = {
  'NODE_ENV': 'production',
  'VITE_APP_BASE_API': '/api',
  'VITE_API_BASE_URL': '/api',
  'VITE_RUOYI_API_BASE_URL': '/api',
  'VITE_RUOYI_UPLOAD_URL': '/api/common/upload',
  'VITE_USE_MOCK': 'false',
  'VITE_ENABLE_MOCK': 'false'
};

function loadEnvFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const env = {};
    
    content.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    return env;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return {};
  }
}

function verifyEnvironment(env, envName) {
  console.log(`\n🔍 Verifying ${envName} environment configuration...\n`);
  
  let hasErrors = false;
  let hasWarnings = false;
  
  // Check required variables
  console.log('📋 Required Variables:');
  REQUIRED_VARS.forEach(varName => {
    if (env[varName]) {
      console.log(`  ✅ ${varName}: ${env[varName]}`);
    } else {
      console.log(`  ❌ ${varName}: MISSING`);
      hasErrors = true;
    }
  });
  
  // Check optional variables
  console.log('\n📋 Optional Variables:');
  Object.entries(OPTIONAL_VARS).forEach(([varName, defaultValue]) => {
    const value = env[varName] || defaultValue;
    const status = env[varName] ? '✅' : '⚠️ ';
    console.log(`  ${status} ${varName}: ${value}${env[varName] ? '' : ' (default)'}`);
    if (!env[varName]) hasWarnings = true;
  });
  
  // Check production-specific values
  if (envName === 'Production') {
    console.log('\n📋 Production Value Validation:');
    Object.entries(PRODUCTION_VALUES).forEach(([varName, expectedValue]) => {
      const actualValue = env[varName];
      if (actualValue === expectedValue) {
        console.log(`  ✅ ${varName}: ${actualValue}`);
      } else {
        console.log(`  ⚠️  ${varName}: ${actualValue} (expected: ${expectedValue})`);
        hasWarnings = true;
      }
    });
  }
  
  // Summary
  console.log('\n📊 Summary:');
  if (hasErrors) {
    console.log('  ❌ Configuration has ERRORS - deployment may fail');
  } else if (hasWarnings) {
    console.log('  ⚠️  Configuration has warnings - review recommended');
  } else {
    console.log('  ✅ Configuration looks good!');
  }
  
  return { hasErrors, hasWarnings };
}

function main() {
  console.log('🚀 Environment Configuration Verification Tool');
  console.log('===============================================');
  
  const rootDir = join(__dirname, '..');
  
  // Load environment files
  const devEnv = loadEnvFile(join(rootDir, '.env.development'));
  const prodEnv = loadEnvFile(join(rootDir, '.env.production'));
  
  // Verify configurations
  const devResult = verifyEnvironment(devEnv, 'Development');
  const prodResult = verifyEnvironment(prodEnv, 'Production');
  
  // Overall summary
  console.log('\n🎯 Overall Assessment:');
  console.log('======================');
  
  if (prodResult.hasErrors) {
    console.log('❌ Production configuration has critical issues');
    process.exit(1);
  } else if (prodResult.hasWarnings || devResult.hasWarnings) {
    console.log('⚠️  Some configurations need attention');
    process.exit(0);
  } else {
    console.log('✅ All configurations are properly set up');
    process.exit(0);
  }
}

// Run verification
main();