#!/usr/bin/env node

/**
 * Simple test script to verify MCP servers can start correctly
 * Run this to test your MCP server setup before configuring Claude Code
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testMCPServer(serverName, serverFile) {
  console.log(`\n🔍 Testing ${serverName}...`);
  
  return new Promise((resolve) => {
    const serverPath = path.join(__dirname, serverFile);
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    let errorOutput = '';
    
    server.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    server.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    // Send a test message after a short delay
    setTimeout(() => {
      // Send a simple jsonrpc message to test
      const testMessage = {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list"
      };
      
      server.stdin.write(JSON.stringify(testMessage) + '\n');
      
      // Give it time to respond, then kill
      setTimeout(() => {
        server.kill();
      }, 1000);
    }, 500);
    
    server.on('close', (code) => {
      if (errorOutput.includes('running on stdio')) {
        console.log(`✅ ${serverName}: Started successfully`);
        resolve(true);
      } else if (errorOutput || code !== 0) {
        console.log(`❌ ${serverName}: Error - ${errorOutput || `Exit code ${code}`}`);
        resolve(false);
      } else {
        console.log(`✅ ${serverName}: Started successfully`);
        resolve(true);
      }
    });
    
    server.on('error', (error) => {
      console.log(`❌ ${serverName}: Failed to start - ${error.message}`);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('🧪 Testing MCP Server Configuration...\n');
  
  const servers = [
    { name: 'Certification Research', file: 'certification-research-mcp.js' },
    { name: 'Question Generator', file: 'question-generator-mcp.js' },
    { name: 'Quiz Engine', file: 'quiz-engine-mcp.js' }
  ];
  
  let allPassed = true;
  
  for (const server of servers) {
    const passed = await testMCPServer(server.name, server.file);
    if (!passed) allPassed = false;
  }
  
  console.log('\n📋 Test Summary:');
  console.log(`Overall Status: ${allPassed ? '✅ All servers working' : '❌ Some servers failed'}`);
  
  if (allPassed) {
    console.log('\n🎉 MCP servers are ready for Claude Code integration!');
    console.log('\n📝 Next steps:');
    console.log('1. Your .mcp.json file is configured');
    console.log('2. Your Claude Code settings have enableAllProjectMcpServers: true');
    console.log('3. Restart your Claude Code session to load the MCP servers');
    console.log('4. Look for tools prefixed with "mcp__" in the available tools');
  } else {
    console.log('\n⚠️  Fix the failing servers before proceeding with Claude Code integration.');
  }
}

runTests().catch(console.error);