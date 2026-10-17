// const { Daytona } = require('@daytonaio/sdk');
import { Daytona } from '@daytona/sdk';


async function main() {
    // 1. Initialize the Daytona client
    // Make sure DAYTONA_API_KEY is set in your environment variables
    const daytona = new Daytona({ apiKey: 'dtn_31f2afbbcf840196811dbb7838e39fcd1d543157668b6aa69ce83e75a9f335da' }) // Replace with your API key

    console.log('Creating sandbox...');
    const sandbox = await daytona.create({
        language: 'javascript',
    });

    try {
        const projectDir = '/home/daytona/workspace';
        // Replace with any public Git repository URL
        const repoUrl = 'https://github.com/hossainmdrobin/proagent_init.git';
        const port = 3000; // Update this to the port your app runs on

        console.log('Cloning repository...');
        await sandbox.git.clone(repoUrl, projectDir);

        console.log('Installing dependencies...');
        await sandbox.process.executeCommand('npm install', {
            cwd: projectDir,
        });

        console.log('Starting application...');
        // Start your project in the background. 
        // Ensure you bind your server to host '0.0.0.0' inside your app code so it accepts external traffic.
        await sandbox.process.executeCommand('npm start', {
            cwd: projectDir,
        });

        // Wait a few seconds for the server to spin up
        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log('Generating public URL...');
        // Generate a signed public preview URL for the specified port
        const signedUrl = await sandbox.getSignedPreviewUrl(port, 3600); // Valid for 1 hour

        console.log(`\nSuccess! View your project live at:`);
        console.log(signedUrl.url);

    } catch (error) {
        console.error('Error running sandbox:', error);
    }
}

main();