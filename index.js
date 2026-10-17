import { Daytona } from "@daytona/sdk";
async function main() {
  const daytona = new Daytona({apiKey:"dtn_31f2afbbcf840196811dbb7838e39fcd1d543157668b6aa69ce83e75a9f335da"});

  console.log('Creating sandbox...');
  const sandbox = await daytona.create({
    language: 'javascript',
  });

  try {
    const projectDir = '/home/daytona/workspace';
    
    // ১. আপনার React Vite প্রজেক্টের GitHub repository URL দিন
    const repoUrl = 'https://github.com/hossainmdrobin/proagent_init.git'; 
    
    // Vite-এর ডিফল্ট পোর্ট সাধারণত 5173 (package.json অনুযায়ী চেক করে নিন)
    const port = 5173; 

    console.log('Cloning repository...');
    await sandbox.git.clone(repoUrl, projectDir);

    console.log('Installing dependencies...');
    await sandbox.process.executeCommand('npm install', projectDir);

    console.log('Starting Vite dev server in background...');
    
    // ২. গুরুত্বপূর্ণ: Vite-কে 0.0.0.0 তে এক্সপোজ করার জন্য --host এবং নির্দিষ্ট পোর্ট নিশ্চিত করার জন্য --port ব্যবহার করা হয়েছে
    await sandbox.process.executeCommand(
      `nohup npm run dev -- --host 0.0.0.0 --port ${port} > server.log 2>&1 &`,
      projectDir
    );

    console.log('Waiting for Vite server to start...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log('Generating public URL...');
    // ৩. এক্সপোজড পোর্ট (5173)-এর জন্য Signed Preview URL তৈরি
    const signedUrl = await sandbox.getSignedPreviewUrl(port, 3600);

    console.log(`\nSuccess! View your React Vite project live at:`);
    console.log(signedUrl.url);

  } catch (error) {
    console.error('Error running sandbox:', error);
  }
}

main();