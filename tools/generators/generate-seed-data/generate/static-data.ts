import { copyFile, readdir } from 'fs/promises';
import { resolve } from 'path';
import { dstDirectory, staticFilesDirectory } from '../constants';

export async function generateStaticData() {
  const staticFiles = await readdir(staticFilesDirectory);
  await Promise.all(
    staticFiles.map(async (fileName) => {
      const srcFile = resolve(staticFilesDirectory, fileName);
      const dstFile = resolve(dstDirectory, fileName);
      await copyFile(srcFile, dstFile);
    })
  );
}
