"use client";
export default function MainPage() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center w-full relative">
      <iframe
        src="https://giphy.com/embed/xE2xnByqrmBzP9eyuE"
        width="480"
        height="480"
        frameBorder="0"
        className="giphy-embed z-10"
        allowFullScreen
      ></iframe>
      <div
        className="absolute top-0 left-0 w-full h-full z-20"
      ></div>
    </div>
  );
}
