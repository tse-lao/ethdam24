import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function fetchWithAuthorization(
  url: string,
  options: RequestInit,
  githubAccess: string,
  accessToken: string
) {
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("x-additional-token", `${githubAccess}`);
  headers.set("x-api-key", "API_KEY");

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Fetch error: ${errorData.message || response.statusText}`);
  }

  return response.json();
};

export function addURL(link: string) {
  return link.includes("http") ? link : `https://ipfs.io/ipfs/${link}`;
}


export function truncateMiddle(input: string, maxLength: number): string {
  // If the input string is shorter than or equal to the maxLength, return the original string
  if (input.length <= maxLength) {
    return input;
  }

  const charsToShow = maxLength - 3; // 3 for the ellipsis
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    input.substr(0, frontChars) + "..." + input.substr(input.length - backChars)
  );
}

export function formatDateToTimeAgo(inviteTimeStr: string) {
  const inviteTime = new Date(inviteTimeStr);
  const now = new Date();
  const timeDiff = Number(now) - Number(inviteTime);

  const minutes = Math.floor(timeDiff / 60000);
  const hours = Math.floor(timeDiff / 3600000);
  const days = Math.floor(timeDiff / 86400000);

  if (minutes < 1) {
    return "now";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  
  export function beginEndDates(
    beginDate: string | Date,
    endDate?: string | Date
  ): string {
    // const lang = useDictionary();
    // lang.beginEndDates.ongoing
    if (!beginDate) {
      return "No date";
    }
  
    return endDate
      ? `${formatDate(beginDate)} ~ ${formatDate(endDate)}`
      : `${formatDate(beginDate)} ~ present`;
  }
  
  export function formatDate(stringDate: string | Date): string {
    const date = new Date(stringDate);
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}.${month}.${day}`;
  }