import { Daytona } from "@daytona/sdk";

async function main() {
  const daytona = new Daytona({
    apiKey: "dtn_31f2afbbcf840196811dbb7838e39fcd1d543157668b6aa69ce83e75a9f335da"
  });

  try {
    console.log("Fetching active sandboxes...");
    // ডেটোনা ক্লাউডে থাকা সব স্যান্ডবক্সের তালিকা আনা
    const sandboxes = await daytona.list();

    if (sandboxes.length === 0) {
      console.log("No active sandboxes found. They might already be deleted!");
      return;
    }

    console.log(`Found ${sandboxes.length} active sandbox(es):`);
    
    for (const sb of sandboxes) {
      console.log(`- ID: ${sb.id} | State: ${sb.state}`);
      
      // যদি সবগুলো এক্টিভ স্যান্ডবক্স ডিলিট করতে চান, নিচের লাইনটি আনকমেন্ট (// তুলে) দিন:
      // await sb.delete();
      // console.log(`Deleted sandbox: ${sb.id}`);
    }

  } catch (error) {
    console.error("Error listing/deleting sandboxes:", error);
  }
}

main();