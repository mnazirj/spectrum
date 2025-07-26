import { computed } from "vue";

export default function productFilters(products, filters) {
  return computed(() => {
    let result = [...(products.value ?? [])];
    // Filter by company
    if (filters.value.brands?.length) {
      result = result.filter((p) => filters.value.brands.includes(p.brand.title));
    }

    // Filter by gender
    if (filters.value.genders?.length) {
      result = result.filter((p) => filters.value.genders.includes(p.gender));
    }

    // Filter by price range
    if (filters.value.priceRange) {
      result = result.filter((p) => (p.propreties.length > 0 ? p.propreties[0].price >= filters.value.priceRange[0] && p.propreties[0].price <= filters.value.priceRange[1] : p.price >= filters.value.priceRange[0] && p.price <= filters.value.priceRange[1]));
    }

    // Filter by rating (stars)
    if (filters.value.minStars?.length) {
      result = result.filter((p) => filters.value.minStars.includes(parseInt(p.stars)));
    }

    // Filter by size
    if (filters.value.sizes?.length) {
      result = result.filter((p) => p.propreties?.some((size) => filters.value.sizes.includes(size.value)));
    }
    return result;
  });
}
