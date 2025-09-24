import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  gender: parseAsString,
  categories: parseAsString,
  create: parseAsString,
  edit: parseAsString,
  detail: parseAsString,
  id: parseAsString,
  d: parseAsString,
  T: parseAsString,
  s: parseAsString,
  client: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
