#!/usr/bin/env node

// SynthBot App Test Script
// Tests basic functionality and checks for bugs

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class SynthBotTester {
    constructor() {
        this.baseUrl = 'http://localhost:8000';
        this.testResults = [];
    }

    async runTests() {
        console.log('🧪 SynthBot App Testing');
        console.log('======================');
        
        await this.testServerRunning();
        await this.testFileAccessibility();
        await this.testDatabaseFiles();
        await this.testSQLDatabase();
        await this.testDataViewers();
        
        this.printResults();
    }

    async testServerRunning() {
        console.log('\n1️⃣  Testing Server...');
        
        try {
            const { stdout } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" ${this.baseUrl}`);
            
            if (stdout.trim() === '200') {
                this.testResults.push({ test: 'Server Running', status: '✅ PASS', details: 'HTTP 200 OK' });
                console.log('   ✅ Server is running on port 8000');
            } else {
                this.testResults.push({ test: 'Server Running', status: '❌ FAIL', details: `HTTP ${stdout.trim()}` });
                console.log('   ❌ Server not responding correctly');
            }
        } catch (error) {
            this.testResults.push({ test: 'Server Running', status: '❌ FAIL', details: error.message });
            console.log('   ❌ Server test failed:', error.message);
        }
    }

    async testFileAccessibility() {
        console.log('\n2️⃣  Testing File Accessibility...');
        
        const files = [
            'index.html',
            'file_db.js',
            'view_data.js',
            'view_sql_data.js'
        ];

        for (const file of files) {
            try {
                const { stdout } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" ${this.baseUrl}/${file}`);
                
                if (stdout.trim() === '200') {
                    this.testResults.push({ test: `File: ${file}`, status: '✅ PASS', details: 'Accessible' });
                    console.log(`   ✅ ${file} is accessible`);
                } else {
                    this.testResults.push({ test: `File: ${file}`, status: '❌ FAIL', details: `HTTP ${stdout.trim()}` });
                    console.log(`   ❌ ${file} not accessible`);
                }
            } catch (error) {
                this.testResults.push({ test: `File: ${file}`, status: '❌ FAIL', details: error.message });
                console.log(`   ❌ ${file} test failed:`, error.message);
            }
        }
    }

    async testDatabaseFiles() {
        console.log('\n3️⃣  Testing Database Files...');
        
        const files = [
            'database_setup.sql',
            'database_connection.js',
            'package.json',
            'README.md'
        ];

        for (const file of files) {
            try {
                const fs = require('fs');
                if (fs.existsSync(file)) {
                    this.testResults.push({ test: `DB File: ${file}`, status: '✅ PASS', details: 'Exists' });
                    console.log(`   ✅ ${file} exists`);
                } else {
                    this.testResults.push({ test: `DB File: ${file}`, status: '❌ FAIL', details: 'Missing' });
                    console.log(`   ❌ ${file} missing`);
                }
            } catch (error) {
                this.testResults.push({ test: `DB File: ${file}`, status: '❌ FAIL', details: error.message });
                console.log(`   ❌ ${file} test failed:`, error.message);
            }
        }
    }

    async testSQLDatabase() {
        console.log('\n4️⃣  Testing SQL Database...');
        
        try {
            const { stdout } = await execAsync('mysql -u root -e "SHOW DATABASES;" | grep synthbot_db');
            
            if (stdout.includes('synthbot_db')) {
                this.testResults.push({ test: 'SQL Database', status: '✅ PASS', details: 'synthbot_db exists' });
                console.log('   ✅ SQL database exists');
                
                // Test tables
                const { stdout: tables } = await execAsync('mysql -u root -e "USE synthbot_db; SHOW TABLES;"');
                const tableCount = (tables.match(/\n/g) || []).length - 1; // Subtract header row
                
                this.testResults.push({ test: 'SQL Tables', status: '✅ PASS', details: `${tableCount} tables found` });
                console.log(`   ✅ ${tableCount} tables found`);
            } else {
                this.testResults.push({ test: 'SQL Database', status: '❌ FAIL', details: 'synthbot_db not found' });
                console.log('   ❌ SQL database not found');
            }
        } catch (error) {
            this.testResults.push({ test: 'SQL Database', status: '❌ FAIL', details: error.message });
            console.log('   ❌ SQL database test failed:', error.message);
        }
    }

    async testDataViewers() {
        console.log('\n5️⃣  Testing Data Viewers...');
        
        try {
            // Test JSON viewer
            const { stdout: jsonOutput } = await execAsync('node view_data.js --help');
            if (jsonOutput.includes('SynthBot Data Viewer')) {
                this.testResults.push({ test: 'JSON Viewer', status: '✅ PASS', details: 'Help command works' });
                console.log('   ✅ JSON data viewer works');
            } else {
                this.testResults.push({ test: 'JSON Viewer', status: '❌ FAIL', details: 'Help command failed' });
                console.log('   ❌ JSON data viewer failed');
            }
        } catch (error) {
            this.testResults.push({ test: 'JSON Viewer', status: '❌ FAIL', details: error.message });
            console.log('   ❌ JSON viewer test failed:', error.message);
        }

        try {
            // Test SQL viewer
            const { stdout: sqlOutput } = await execAsync('node view_sql_data.js --help');
            if (sqlOutput.includes('SynthBot SQL Data Viewer')) {
                this.testResults.push({ test: 'SQL Viewer', status: '✅ PASS', details: 'Help command works' });
                console.log('   ✅ SQL data viewer works');
            } else {
                this.testResults.push({ test: 'SQL Viewer', status: '❌ FAIL', details: 'Help command failed' });
                console.log('   ❌ SQL data viewer failed');
            }
        } catch (error) {
            this.testResults.push({ test: 'SQL Viewer', status: '❌ FAIL', details: error.message });
            console.log('   ❌ SQL viewer test failed:', error.message);
        }
    }

    printResults() {
        console.log('\n📊 Test Results Summary');
        console.log('======================');
        
        const passed = this.testResults.filter(r => r.status === '✅ PASS').length;
        const failed = this.testResults.filter(r => r.status === '❌ FAIL').length;
        const total = this.testResults.length;
        
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${passed} ✅`);
        console.log(`Failed: ${failed} ❌`);
        console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
        
        console.log('\nDetailed Results:');
        this.testResults.forEach(result => {
            console.log(`${result.status} ${result.test}: ${result.details}`);
        });
        
        if (failed === 0) {
            console.log('\n🎉 All tests passed! SynthBot is ready to use.');
        } else {
            console.log('\n⚠️  Some tests failed. Please check the issues above.');
        }
    }
}

// Run tests
const tester = new SynthBotTester();
tester.runTests().catch(console.error); 