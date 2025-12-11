export default function CloudflarePlayer({ videoId }: { videoId: string }) {
  return (
    <iframe
      src={`https://iframe.videodelivery.net/${videoId}`}
      style={{ width: "100%", height: "500px", border: "none" }}
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowFullScreen
    ></iframe>
  );
}
