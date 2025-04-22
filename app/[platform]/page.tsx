"use client";

import { useParams } from 'next/navigation';
import LandingPage from '../page';

export default function PlatformPage() {
  const params = useParams();
  const platform = params.platform as string;

  // Validate platform
  const validPlatforms = ['meta', 'snapchat', 'tiktok', 'google'];
  if (!validPlatforms.includes(platform)) {
    return null; // Or redirect to 404
  }

  // Define welcome messages for each platform
  const welcomeMessages = {
    snapchat: "السلام عليكم ورحمة الله، ارغب بالاستفسار عن المشروع",
    tiktok: "مرحباً ، السلام عليكم ورحمة الله، ارغب بالاستفسار عن المشروع",
    meta: "مرحباً، أرغب بالاستفسار عن المشروع",
    google: "السلام عليكم ورحمة الله وبركاته، ارغب بالاستفسار عن المشروع"
  };

  return <LandingPage platform={platform} defaultMessage={welcomeMessages[platform as keyof typeof welcomeMessages]} />;
}