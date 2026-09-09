import {
  getRestaurants,
  getSpendingSummary,
} from '@/lib/apiClient';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default async function HomePage() {
  const [restaurants, summary] = await Promise.all([
    getRestaurants(),
    getSpendingSummary(),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#B4532A]">
          Dining dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#3B241C]">
          Feeding Brennen
        </h1>

        <p className="mt-2 text-gray-600">
          A simple look at recent restaurants, visits, and spending.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-[#B4532A] p-6 text-white shadow-sm">
          <p className="text-sm font-medium text-orange-100">
            Total spent
          </p>

          <p className="mt-2 text-3xl font-bold">
            {currency.format(summary.totalSpent)}
          </p>
        </article>

        <article className="rounded-2xl bg-[#667A56] p-6 text-white shadow-sm">
          <p className="text-sm font-medium text-green-100">
            Total visits
          </p>

          <p className="mt-2 text-3xl font-bold">
            {summary.visitCount}
          </p>
        </article>

        <article className="rounded-2xl bg-[#3B241C] p-6 text-white shadow-sm">
          <p className="text-sm font-medium text-stone-200">
            Average visit
          </p>

          <p className="mt-2 text-3xl font-bold">
            {currency.format(summary.averageSpent)}
          </p>
        </article>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#B4532A]">
              Places
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#3B241C]">
              Restaurants
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            {restaurants.length}{' '}
            {restaurants.length === 1
              ? 'restaurant'
              : 'restaurants'}
          </p>
        </div>

        {restaurants.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white p-10 text-center">
            <p className="font-medium text-[#3B241C]">
              No restaurants yet
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Add a restaurant to begin tracking visits.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {restaurants.map((restaurant) => (
              <li
                key={restaurant.id}
                className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#3B241C]">
                      {restaurant.name}
                    </h3>

                    {restaurant.cuisine && (
                      <span className="mt-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#B4532A]">
                        {restaurant.cuisine}
                      </span>
                    )}
                  </div>

                  <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                    {restaurant.rating === null
                      ? 'Not rated'
                      : `${restaurant.rating} ★`}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  {restaurant.address ?? 'Address unavailable'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}