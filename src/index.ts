import dotenv from "dotenv";
import { getYargs } from "./args";

dotenv.config();

const main = async () => {
  const argv = await getYargs();

  switch (argv._[0]) {
    case "configure":
      const { configure } = await import("./configure");
      await configure();
      break;
    case "review":
      const { review } = await import("./review");
      const { getFilesWithChanges } = await import(
        "./common/git/getFilesWithChanges"
      );
      const files = await getFilesWithChanges(argv.ci);
      await review(argv, files);
      break;
    case "test":
      const { test } = await import("./test");
      await test(argv);
      break;
    default:
      console.error("Unknown command");
      process.exit(1);
  }
};

main().catch((error) => {
  console.error(`Error: ${error}`);
  process.exit(1);
});
