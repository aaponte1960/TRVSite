import { fetchLatestYouTubeVideos } from "@/lib/youtube"
import { VideosPage } from "@/components/ui/videos-page"

export default async function Page() {
  const videos = await fetchLatestYouTubeVideos(15);
  return <VideosPage videos={videos} />
}
