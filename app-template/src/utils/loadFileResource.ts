import type {
  FileContent,
  FilePath,
  RemoteUrl,
  FileResource,
} from "@/src/types/FileResource";

export async function loadFileResource(
  resource: FileResource
): Promise<string> {
  if (isFileContent(resource)) return resource;
  if (isFilePath(resource)) {
    const fs = await import("fs/promises");
    return await fs.readFile(resource, "utf-8");
  }
  if (isRemoteUrl(resource)) {
    const res = await fetch(resource);
    return await res.text();
  }
  throw new Error(`Unknown file resource: ${resource}`);
}

function isFileContent(resource: unknown): resource is FileContent {
  return typeof resource === "string";
}

function isFilePath(resource: unknown): resource is FilePath {
  return resource instanceof URL && resource.protocol === "file:";
}

function isRemoteUrl(resource: unknown): resource is RemoteUrl {
  return (
    resource instanceof URL &&
    (resource.protocol === "http:" || resource.protocol === "https:")
  );
}
