import { Daytona } from "@daytona/sdk";

async function main() {
  const daytona = new Daytona({apiKey:"dtn_31f2afbbcf840196811dbb7838e39fcd1d543157668b6aa69ce83e75a9f335da"});

  // স্যান্ডবক্স তৈরি করার সময় যে ID পেয়েছিলেন সেটি এখানে দিন
  const sandboxId = '9cb1bcd6-dca0-4372-a87c-a84eda04d104'; 

  try {
    console.log(`Stopping and deleting sandbox: ${sandboxId}...`);
    
    // স্যান্ডবক্স অবজেক্ট নিয়ে ডিলিট মেথড কল করা
    const sandbox = await daytona.get(sandboxId);
    await sandbox.delete();

    console.log('Sandbox successfully stopped and deleted.');
  } catch (error) {
    console.error('Error stopping sandbox:', error);
  }
}

main();