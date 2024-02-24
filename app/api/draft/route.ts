import { draftMode } from "next/headers";
import { getDraftEntry, readFragment } from "@/lib/api";
import { draftEntryFragment } from "@/lib/fragments";
import type { DraftEntry } from "@/lib/types";

function resolveURL(entry: DraftEntry) {
  const data = readFragment(draftEntryFragment, entry);

  switch (data?.__typename) {
    case "Project":
      return `/projects/${data.slug ?? ""}`;

    case "Page":
      return `/${data.slug}`;

    default:
      return "/";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const entryId = searchParams.get("entryId");

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !entryId) {
    return new Response("Invalid token", { status: 401 });
  }

  const entry = await getDraftEntry(entryId);

  if (!entry) {
    return new Response("Invalid entry ID", { status: 401 });
  }

  const url = resolveURL(entry);

  draftMode().enable();

  return new Response(null, {
    status: 307,
    headers: {
      Location: url,
    },
  });
}
