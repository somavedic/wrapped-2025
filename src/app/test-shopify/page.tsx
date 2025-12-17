import { fetchShopifyProducts } from "@/lib/shopify";

export default async function TestShopify() {
  const products = await fetchShopifyProducts();

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Shopify API Test</h1>
      {!products ? (
        <p className="text-red-500">Failed to fetch products or credentials missing.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product: any) => (
            <li key={product.id} className="glass p-4 rounded-xl border border-white/10">
              <p className="font-bold text-somavedic-amber">{product.title}</p>
              <p className="text-sm text-white/50">{product.vendor}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <a href="/" className="text-somavedic-amber underline">Back to Dashboard</a>
      </div>
    </div>
  );
}
