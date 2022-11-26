export type Filters = {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  type: {
    digital: boolean;
    film: boolean;
    snapshot: boolean;
    collection: boolean;
  };
  category: {
    photoCamera: boolean;
    videoCamera: boolean;
  },
  level: {
    zero: boolean;
    amateur: boolean;
    professional: boolean;
  },
}
