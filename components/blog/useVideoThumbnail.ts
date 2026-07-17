// File: components/blog/useVideoThumbnail.ts
"use client";

import { useEffect, useState } from "react";

const thumbnailCache = new Map<string, string>();
const inFlight = new Map<string, Promise<string>>();

function proxiedUrl(videoUrl: string): string {
  return `/api/video-proxy?url=${encodeURIComponent(videoUrl)}`;
}

function captureFrame(videoUrl: string, seekTime: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    // No crossOrigin needed -- the proxy route makes this same-origin.
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = proxiedUrl(videoUrl);

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Timed out loading video"));
    }, 15000);

    const onLoadedMetadata = () => {
      const target = Math.min(seekTime, Math.max(video.duration - 0.1, 0));
      video.currentTime = isFinite(target) ? target : 0;
    };

    const onSeeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        cleanup();
        resolve(dataUrl);
      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    const onError = () => {
      cleanup();
      reject(new Error(`Video load error (readyState=${video.readyState})`));
    };

    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
  });
}

export function useVideoThumbnail(
  videoUrl: string | null | undefined,
  seekTime = 1,
) {
  const [thumbnail, setThumbnail] = useState<string | null>(
    videoUrl ? (thumbnailCache.get(videoUrl) ?? null) : null,
  );
  const [loading, setLoading] = useState(Boolean(videoUrl) && !thumbnail);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoUrl) return;

    const cached = thumbnailCache.get(videoUrl);
    if (cached) {
      setThumbnail(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const promise =
      inFlight.get(videoUrl) ??
      captureFrame(videoUrl, seekTime).then((dataUrl) => {
        thumbnailCache.set(videoUrl, dataUrl);
        inFlight.delete(videoUrl);
        return dataUrl;
      });
    inFlight.set(videoUrl, promise);

    promise
      .then((dataUrl) => {
        if (!cancelled) {
          setThumbnail(dataUrl);
          setLoading(false);
        }
      })
      .catch((err) => {
        inFlight.delete(videoUrl);
        console.error(`[useVideoThumbnail] failed for ${videoUrl}:`, err);
        if (!cancelled) {
          setError(err?.message ?? "Thumbnail generation failed");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [videoUrl, seekTime]);

  return { thumbnail, loading, error };
}
