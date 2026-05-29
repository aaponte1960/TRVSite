import { DesignAgency } from "@/components/ui/landing-page"
import { YouTubeVideo } from "@/lib/youtube"

export function Design({ latestVideo }: { latestVideo?: YouTubeVideo | null }) {
  return <DesignAgency latestVideo={latestVideo} />
}
