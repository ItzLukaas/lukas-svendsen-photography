import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { InquiryInput } from "@/lib/inquiry-schema";
import type { StoredInquiry } from "@/types/inquiry";

const DATA_DIR = path.join(process.cwd(), ".data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(INQUIRIES_FILE, "utf-8");
  } catch {
    await writeFile(INQUIRIES_FILE, "[]", "utf-8");
  }
}

export async function saveInquiry(
  data: InquiryInput,
  ipHash?: string,
): Promise<StoredInquiry> {
  await ensureDataFile();

  const raw = await readFile(INQUIRIES_FILE, "utf-8");
  const inquiries = JSON.parse(raw) as StoredInquiry[];

  const record: StoredInquiry = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ipHash,
  };

  inquiries.unshift(record);
  await writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");

  return record;
}

export async function listInquiries(): Promise<StoredInquiry[]> {
  await ensureDataFile();
  const raw = await readFile(INQUIRIES_FILE, "utf-8");
  return JSON.parse(raw) as StoredInquiry[];
}
