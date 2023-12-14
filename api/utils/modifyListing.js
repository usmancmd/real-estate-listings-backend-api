export const modifyListings = (listings) => {
  const modifiedListing = listings.map((listing) => {
    const { regularPrice, discountPrice, ...rest } = listing._doc;
    const modifiedListing = {
      ...rest,
      regularPrice: `$${regularPrice}`,
      discountPrice: `$${discountPrice}`,
    };
    return modifiedListing;
  });
  return modifiedListing;
};
