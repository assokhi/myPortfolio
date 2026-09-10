import Image from "next/image";
import { certifications, codingProfiles, education } from "@/data/education";
import { getCodeforcesStats, getLeetCodeStats } from "@/lib/cp";

const linkClass =
  "font-bold text-slate-950 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-[#F5F5F5] dark:hover:text-blue-400";

export async function Education() {
  const [leetcode, codeforces] = await Promise.all([
    getLeetCodeStats(codingProfiles.leetcode),
    getCodeforcesStats(codingProfiles.codeforces),
  ]);

  return (
    <section className="font-nav py-12 dark:bg-[#0F0F10]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-base font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Education
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {education.map((item) => (
                <div key={item.institution} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-slate-900/10 bg-white dark:border-white/10">
                    <Image
                      src={item.logo}
                      alt={item.institution}
                      fill
                      sizes="56px"
                      placeholder="blur"
                      blurDataURL={item.blurDataURL}
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-950 dark:text-[#F5F5F5]">{item.institution}</p>
                    <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">{item.degree}</p>
                    <p className="text-xs text-slate-500 dark:text-[#71717A]">{item.years}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Certifications
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {certifications.map((cert) => (
                <div key={cert.title}>
                  <p className="font-bold text-slate-950 dark:text-[#F5F5F5]">{cert.title}</p>
                  <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">{cert.provider}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              CP Profiles
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <a href={`https://leetcode.com/u/${codingProfiles.leetcode}`} target="_blank" rel="noreferrer" className={linkClass}>
                  LeetCode
                </a>
                <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">
                  {leetcode ? `${leetcode.solved} problems solved` : "Profile unavailable"}
                </p>
                {leetcode?.rating != null && (
                  <p className="text-xs text-slate-500 dark:text-[#71717A]">
                    Contest rating: {leetcode.rating}
                  </p>
                )}
              </div>
              <div>
                <a href={`https://codeforces.com/profile/${codingProfiles.codeforces}`} target="_blank" rel="noreferrer" className={linkClass}>
                  Codeforces
                </a>
                <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">
                  {codeforces ? `${codeforces.solved} problems solved` : "Profile unavailable"}
                </p>
                {codeforces?.rating != null && (
                  <p className="text-xs text-slate-500 dark:text-[#71717A]">
                    Rating: {codeforces.rating}
                    {codeforces.rank ? ` (${codeforces.rank})` : ""}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
