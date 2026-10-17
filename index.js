import { Daytona } from "@daytona/sdk";

async function main() {
  const daytona = new Daytona({
    apiKey: "dtn_31f2afbbcf840196811dbb7838e39fcd1d543157668b6aa69ce83e75a9f335da"
  });

  console.log('Creating sandbox...');
  const sandbox = await daytona.create({
    language: 'javascript',
  });

  // 👇 এখানে আসল স্যান্ডবক্স আইডি প্রিন্ট হবে যা আপনি পরবর্তীতে ব্যবহার করতে পারবেন
  console.log(`Sandbox Created Successfully! ID: ${sandbox.id}`);

  try {
    const projectDir = '/home/daytona/workspace';
    const port = 5173;

    console.log('Cloning repository...');
    await sandbox.git.clone('https://github.com/hossainmdrobin/proagent_init.git', projectDir);

    console.log('Installing dependencies...');
    await sandbox.process.executeCommand('npm install', projectDir);

    console.log('Starting Vite dev server in background...');
    await sandbox.process.executeCommand(
      `nohup npm run dev -- --host 0.0.0.0 --port ${port} > server.log 2>&1 &`,
      projectDir
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const signedUrl = await sandbox.getSignedPreviewUrl(port, 3600);
    console.log(`\nSuccess! View your React Vite project live at:`);
    console.log(signedUrl.url);

    // স্যান্ডবক্স খোলা রাখার জন্য এখানে অপেক্ষা করতে পারেন, অথবা কাজ শেষে নিচে ডিলিট করতে পারেন।
  } catch (error) {
    console.error('Error in sandbox workflow:', error);
  } finally {
    // আপনি যদি চান স্ক্রিপ্ট শেষ হওয়ার সাথে সাথেই স্যান্ডবক্স ডিলিট হয়ে যাক, তবে নিচের কমেন্টটি তুলে দিন:
    // console.log('Cleaning up and deleting sandbox...');
    // await sandbox.delete();
    // console.log('Sandbox deleted.');
  }
}

main();