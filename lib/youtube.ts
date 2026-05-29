export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
  pubDate: string;
}

export async function fetchLatestYouTubeVideos(limit = 10): Promise<YouTubeVideo[]> {
  const channelId = 'UCAxTEuqvB5i18YldfuZaT4A'; // Dr. Alfonso Aponte
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  
  try {
    // Cache for 1 hour to avoid hitting API rate limits
    const response = await fetch(apiUrl, { 
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000)
    }); 
    if (!response.ok) {
      console.error("Failed to fetch YouTube videos", response.statusText);
      return [];
    }
    const data = await response.json();
    
    if (data.status === 'ok' && data.items) {
      return data.items.slice(0, limit).map((item: any) => {
        // Extract video ID from link (e.g. https://www.youtube.com/watch?v=...)
        const videoIdMatch = item.link.match(/v=([^&]+)/);
        const id = videoIdMatch ? videoIdMatch[1] : '';
        
        return {
          id,
          title: item.title,
          // Using mqdefault for a good balance of quality and availability
          thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
          link: item.link,
          pubDate: item.pubDate,
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
