export default function BlogSkeleton() {
  return (
    <div role="status" className="animate-pulse">
      <div className="mt-4 flex items-center gap-x-1.5 min-w-full px-8 md:px-0 md:min-w-xl">
        <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-1 w-1 bg-slate-400 rounded-full"></div>
        <div className="text-gray-500 font-light text-sm">
          <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
        </div>
      </div>
      <div className="text-2xl font-semibold mt-2">
        <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
      </div>
      <div className="mt-1 mb-4 font-light">
        <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
      </div>
      <div className="mb-8 text-slate-400 text-sm font-light">
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
