const ProductDetailsSkeleton = () => {
  return (
    <main className="min-h-screen w-full animate-pulse bg-slate-100">
      <div className="mx-auto w-11/12 max-w-7xl py-6">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square w-full rounded-2xl bg-slate-300 shadow-sm" />
          </div>

          {/* Product Details */}
          <div className="flex w-full flex-col gap-4 lg:w-1/2">
            {/* Product Name */}
            <div className="h-8 w-4/5 rounded-full bg-slate-300" />

            {/* Brand */}
            <div className="h-5 w-1/3 rounded-full bg-slate-300" />

            {/* Price */}
            <div className="h-10 w-40 rounded-lg bg-slate-300" />

            {/* Short Description */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-300" />
              <div className="h-4 w-11/12 rounded bg-slate-300" />
              <div className="h-4 w-5/6 rounded bg-slate-300" />
            </div>

            <div className="my-2 h-px w-full bg-slate-300" />

            {/* Variation Section */}
            <div className="h-24 w-full rounded-xl bg-slate-300" />

            {/* Quantity */}
            <div className="h-10 w-32 rounded-lg bg-slate-300" />

            {/* Buttons */}
            <div className="mt-2 flex gap-4">
              <div className="h-12 flex-1 rounded-xl bg-slate-300" />
              <div className="h-12 flex-1 rounded-xl bg-slate-300" />
            </div>

            {/* Delivery / Extra Info */}
            <div className="mt-2 h-20 w-full rounded-xl bg-slate-300" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsSkeleton;
