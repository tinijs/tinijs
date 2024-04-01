import {resolve} from 'pathe';
import typescript, {CompilerOptions} from 'typescript';
import {outputFile} from 'fs-extra/esm';

const {createCompilerHost, createProgram} = typescript;

export function transpileFiles(filePaths: string[], options: CompilerOptions) {
  const createdFiles: Record<string, string> = {};
  // create the host
  const host = createCompilerHost(options);
  host.writeFile = (filePath: string, content: string) =>
    (createdFiles[filePath] = content);
  // emit the files
  const program = createProgram(filePaths, options, host);
  program.emit();
  // result
  return filePaths.map(filePath => {
    const jsContent = createdFiles[filePath.replace('.ts', '.js')];
    const dtsContent = createdFiles[filePath.replace('.ts', '.d.ts')];
    const mapContent = createdFiles[filePath.replace('.ts', '.js.map')];
    return {
      filePath,
      jsContent,
      dtsContent,
      mapContent,
    };
  });
}

export async function transpileAndOutputFiles(
  filePaths: string[],
  options: CompilerOptions,
  outDir: string,
  transformFilePath?: (filePath: string) => string,
  transformContent?: (content: string, type: 'js' | 'dts' | 'map') => string
) {
  const transpiledResults = transpileFiles(filePaths, options);
  for (let i = 0; i < transpiledResults.length; i++) {
    const {
      filePath: originalFilePath,
      jsContent,
      dtsContent,
      mapContent,
    } = transpiledResults[i];
    const filePath = !transformFilePath
      ? originalFilePath
      : transformFilePath(originalFilePath);
    await outputFile(
      resolve(outDir, filePath.replace('.ts', '.js')),
      !transformContent ? jsContent : transformContent(jsContent, 'js')
    );
    await outputFile(
      resolve(outDir, filePath.replace('.ts', '.d.ts')),
      !transformContent ? dtsContent : transformContent(dtsContent, 'dts')
    );
    await outputFile(
      resolve(outDir, filePath.replace('.ts', '.js.map')),
      !transformContent ? mapContent : transformContent(mapContent, 'map')
    );
  }
}
