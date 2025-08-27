const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("taskManager");
    const users = db.collection("users");
    const tasks = db.collection("tasks");

    // Drop collections if they exist to avoid duplicate key errors
    await users.drop().catch(() => {});
    await tasks.drop().catch(() => {});

    // Insert users
    await users.insertMany([
       { name: "sema", email: "Sema@gmail.com", _id: "u1" },
       { name: "bitela", email: "Bitela@gmail.com", _id: "u2" }
    ]);

    // Insert tasks
    await tasks.insertMany([
      { title: "Fix bug", assignedTo: "u1", status: "pending", tags: ["bug", "urgent"] },
      { title: "Write docs", assignedTo: "u2", status: "done", tags: ["documentation"] },
      { title: "Deploy app", assignedTo: "u1", status: "in progress", tags: ["deployment", "backend"] }
    ]);

    // Read operations
    const allUsers = await users.find().toArray();
    console.log("\n--- All Users ---", allUsers);

    const userTasks = await tasks.find({ assignedTo: "u1" }).toArray();
    console.log("\n--- Tasks for u1 ---", userTasks);

    const completed = await tasks.find({ status: "done" }).toArray();
    console.log("\n--- Completed Tasks ---", completed);

    const titles = await tasks.find({}, { projection: { title: 1, _id: 0 } }).toArray();
    console.log("\n--- Task Titles ---", titles);

    // Update operations
    const updateEmail = await users.updateOne(
       { _id: "u1" },
       { $set: { email: "Sema.new@gmail.com" } }
    );
    console.log("\n--- Email updated:", updateEmail.modifiedCount);

    const result = await tasks.updateMany(
      { status: "pending" },
      { $set: { status: "in progress" } }
    );
    console.log("\n--- Tasks updated:", result.modifiedCount);

    const addTag = await tasks.updateOne(
      { title: "Fix bug" },
      { $addToSet: { tags: "frontend" } }
    );
    console.log("\n--- Tag added:", addTag.modifiedCount);

    // Delete operations
    const deleteUser = await users.deleteOne({ name: "bitela" });
    console.log("\n--- User deleted:", deleteUser.deletedCount);

    const deleteTasks = await tasks.deleteMany({ status: "done" });
    console.log("\n--- Completed tasks deleted:", deleteTasks.deletedCount);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
