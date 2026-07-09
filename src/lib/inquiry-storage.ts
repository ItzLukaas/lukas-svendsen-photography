import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { InquiryInput } from "@/lib/inquiry-schema";
import type { StoredInquiry } from "@/types/inquiry";

const DATA_DIR = path.join(process.cwd(), ".data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

export function createInquiryRecord(
  data: InquiryInput,
  ipHash?: string,
): StoredInquiry {
  return {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ipHash,
  };
}

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(INQUIRIES_FILE, "utf-8");
  } catch {
    await writeFile(INQUIRIES_FILE, "[]", "utf-8");
  }
}

async function readInquiries(): Promise<StoredInquiry[]> {
  await ensureDataFile();
  const raw = await readFile(INQUIRIES_FILE, "utf-8");

  try {
    return JSON.parse(raw) as StoredInquiry[];
  } catch (error) {
    console.warn("[inquiry] Corrupt inquiries file, resetting:", error);
    await writeFile(INQUIRIES_FILE, "[]", "utf-8");
    return [];
  }
}

export async function persistInquiry(record: StoredInquiry): Promise<void> {
  const inquiries = await readInquiries();
  inquiries.unshift(record);
  await writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
}

export async function listInquiries(): Promise<StoredInquiry[]> {
  return readInquiries();
}
