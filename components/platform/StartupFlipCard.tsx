type StartupFlipCardData = {
  id: number;
  name: string;
  description: string;
  stage: string;
  category: string;
  teamSize: string;
  location: string;
  logo: string;
  founder: string;
  founded: string;
};

export type { StartupFlipCardData };

export function StartupFlipCard({ startup }: { startup: StartupFlipCardData }) {
  return (
    <div className="group w-full [perspective:1500px]">
      <div className="relative min-h-[32rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl transition duration-500 hover:bg-white/[0.06]">
        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div
            className="absolute inset-0 flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl shadow-lg shadow-indigo-500/20">
                  {startup.logo}
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-300">
                  {startup.category}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-semibold text-white leading-tight">
                  {startup.name}
                </h3>
                <p className="text-sm leading-6 text-zinc-400">
                  {startup.description}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                Founded
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {startup.founded}
              </p>
            </div>
          </div>

          <div
            className="absolute inset-0 flex flex-col justify-between"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Founder
                </p>
                <p className="mt-2 text-2xl font-semibold text-white leading-tight">
                  {startup.founder}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200">
                {startup.stage}
              </span>
            </div>

            <div className="space-y-4 text-sm text-zinc-300">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Location
                </p>
                <p className="mt-2 text-white text-base">{startup.location}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Team
                </p>
                <p className="mt-2 text-white text-base">{startup.teamSize} members</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Category
                </p>
                <p className="mt-2 text-white text-base">{startup.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
