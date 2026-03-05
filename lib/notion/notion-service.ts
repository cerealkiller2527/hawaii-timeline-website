import { timelineNotionClient } from "./notion-client"
import { transformToTimelineEvent } from "./notion-transforms"
import type { TimelineEvent } from "@/lib/timeline-data"

export async function getAllTimelineEvents(): Promise<TimelineEvent[]> {
  try {
    if (!timelineNotionClient.isConfigured()) return []

    const pages = await timelineNotionClient.queryTimeline()
    return pages
      .map((page) => transformToTimelineEvent(page))
      .filter(Boolean) as TimelineEvent[]
  } catch (error) {
    console.error("Failed to fetch timeline events:", error)
    return []
  }
}
