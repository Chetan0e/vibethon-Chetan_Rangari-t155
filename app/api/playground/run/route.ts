import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";

const MAX_CODE_LENGTH = 12000;
const EXEC_TIMEOUT_MS = 10000;

type RunResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
};

const runPythonScript = async (scriptPath: string): Promise<RunResult> => {
  return new Promise((resolve, reject) => {
    const child = spawn("python", [scriptPath], { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, EXEC_TIMEOUT_MS);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    child.on("close", (exitCode) => {
      clearTimeout(timer);
      resolve({
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode,
        timedOut,
      });
    });
  });
};

export async function POST(req: NextRequest) {
  let tempFilePath = "";

  try {
    const body = await req.json();
    const code = typeof body?.code === "string" ? body.code : "";

    if (!code.trim()) {
      return NextResponse.json({ error: "Code is required." }, { status: 400 });
    }

    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        { error: `Code is too long. Maximum ${MAX_CODE_LENGTH} characters allowed.` },
        { status: 400 },
      );
    }

    const fileName = `bloom-playground-${Date.now()}.py`;
    tempFilePath = path.join(os.tmpdir(), fileName);
    await fs.writeFile(tempFilePath, code, "utf-8");

    const result = await runPythonScript(tempFilePath);

    return NextResponse.json({
      ...result,
      command: `python ${fileName}`,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message.includes("ENOENT")
          ? "Python runtime not found. Install Python and ensure 'python' is available in PATH."
          : error.message
        : "Unknown execution error.";

    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch {
        // Ignore cleanup errors.
      }
    }
  }
}
