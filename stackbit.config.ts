import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "0.6.0",
  nodeVersion: "18",
  contentSources: [
    new GitContentSource({
      rootPath: ".",
      contentDirs: ["content"],
      models: [
        {
          name: "page",
          type: "page",
          filePathPattern: "content/pages/*.md",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "body", type: "markdown", required: true }
          ]
        }
      ]
    })
  ]
});
