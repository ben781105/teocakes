import { useState, useEffect, useRef, memo } from "react";
import { Play } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import Section from "./layout/section";
import { getTikTokPosts } from "../services/tiktokService";

const MIN_POSTS = 3;

const PROFILE_URL = "https://www.tiktok.com/@teocakes";

const VideoCard = memo(function VideoCard({ post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-9/16 rounded-xl overflow-hidden bg-cream-dark"
    >
      <img
        src={post.cover}
        alt={post.caption || "TikTok video from TeoCakes"}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-espresso/15 group-hover:bg-espresso/25 transition-colors duration-300" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Play
          className="w-5 h-5 text-brick ml-0.5"
          fill="currentColor"
          aria-hidden="true"
        />
      </div>

      {post.caption && (
        <p className="absolute inset-x-0 bottom-0 p-2.5 text-xs text-cream bg-espresso/60 leading-snug">
          {post.caption}
        </p>
      )}

      <span className="sr-only">(opens TikTok in a new tab)</span>
    </a>
  );
});

function CardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="aspect-9/16 rounded-xl bg-cream-dark animate-pulse"
    />
  );
}

function TikTokSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    getTikTokPosts()
      .then(setPosts)
      .catch((err) => {
        console.error("error fetching tiktok posts", err);
        setFailed(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // Nothing worth showing: hide the section rather than leave a gap.
  if (failed || (!loading && posts.length < MIN_POSTS)) return null;

  return (
    <Section id="tiktok" className="bg-cream">
      <div className="text-center mb-8">
        <p className="font-script text-brick text-2xl lg:text-3xl mb-1">
          Fresh from the kitchen
        </p>
        <h2>
          See What We're <span className="text-brick">Baking</span>
        </h2>
        <p className="mt-2">Recent cakes, straight from our TikTok.</p>
      </div>

      {/* Mobile: horizontal snap scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 pb-2"
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="snap-center shrink-0 w-[62%]">
                <CardSkeleton />
              </div>
            ))
          : posts.map((post) => (
              <div key={post.id} className="snap-center shrink-0 w-[62%]">
                <VideoCard post={post} />
              </div>
            ))}
      </div>

      {!loading && posts.length > 1 && (
        <div className="md:hidden flex justify-center gap-1 mt-3">
          {posts.map((post, i) => (
            <button
              key={post.id}
              onClick={() => goTo(i)}
              aria-label={`Go to video ${i + 1}`}
              className="p-3 flex items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  active === i ? "w-6 bg-brick" : "w-2 bg-brown/30"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : posts
              .slice(0, 4)
              .map((post) => <VideoCard key={post.id} post={post} />)}
      </div>

      {!loading && (
        <div className="text-center mt-8">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brick text-cream px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-xl hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaTiktok className="w-4 h-4" aria-hidden="true" />
            Follow us on TikTok
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      )}
    </Section>
  );
}

export default TikTokSection;
