import { Design } from "@/components/demo"
import { fetchLatestYouTubeVideos } from "@/lib/youtube"

export default async function HomePage() {
  const videos: any[] = [];
  return <Design latestVideo={videos[0] || null} />
}
