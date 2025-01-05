// import { type ClassValue, clsx } from 'clsx';
// import qs from 'qs';
// import { twMerge } from 'tailwind-merge';

// import { aspectRatioOptions } from '@/constants';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // ERROR HANDLER
// export const handleError = (error: unknown) => {
//   if (error instanceof Error) {
//     // This is a native JavaScript error (e.g., TypeError, RangeError)
//     console.error(error.message);
//     throw new Error(`Error: ${error.message}`);
//   } else if (typeof error === 'string') {
//     // This is a string error message
//     console.error(error);
//     throw new Error(`Error: ${error}`);
//   } else {
//     // This is an unknown type of error
//     console.error(error);
//     throw new Error(`Unknown error: ${JSON.stringify(error)}`);
//   }
// };

// // PLACEHOLDER LOADER - while image is transforming
// const shimmer = (w: number, h: number) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#7986AC" offset="20%" />
//       <stop stop-color="#68769e" offset="50%" />
//       <stop stop-color="#7986AC" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#7986AC" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`;

// const toBase64 = (str: string) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str);

// export const dataUrl = `data:image/svg+xml;base64,${toBase64(
//   shimmer(1000, 1000)
// )}`;
// // ==== End

// // FORM URL QUERY
// export const formUrlQuery = ({
//   searchParams,
//   key,
//   value,
// }: FormUrlQueryParams) => {
//   const params = { ...qs.parse(searchParams.toString()), [key]: value };

//   return `${window.location.pathname}?${qs.stringify(params, {
//     skipNulls: true,
//   })}`;
// };

// // REMOVE KEY FROM QUERY
// export function removeKeysFromQuery({
//   searchParams,
//   keysToRemove,
// }: RemoveUrlQueryParams) {
//   const currentUrl = qs.parse(searchParams);

//   keysToRemove.forEach((key) => {
//     delete currentUrl[key];
//   });

//   // Remove null or undefined values
//   Object.keys(currentUrl).forEach(
//     (key) => currentUrl[key] == null && delete currentUrl[key]
//   );

//   return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
// }

// // DEBOUNCE
// export const debounce = (func: (...args: any[]) => void, delay: number) => {
//   let timeoutId: NodeJS.Timeout | null;
//   return (...args: any[]) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(null, args), delay);
//   };
// };

// // GE IMAGE SIZE
// export type AspectRatioKey = keyof typeof aspectRatioOptions;
// export const getImageSize = (
//   type: string,
//   image: any,
//   dimension: 'width' | 'height'
// ): number => {
//   if (type === 'fill') {
//     return (
//       aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
//       1000
//     );
//   }
//   return image?.[dimension] || 1000;
// };

// // DOWNLOAD IMAGE
// export const download = (url: string, filename: string) => {
//   if (!url) {
//     throw new Error('Resource URL not provided! You need to provide one');
//   }

//   fetch(url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const blobURL = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = blobURL;

//       if (filename && filename.length)
//         a.download = `${filename.replace(' ', '_')}.png`;
//       document.body.appendChild(a);
//       a.click();
//     })
//     .catch((error) => console.log({ error }));
// };

// // DEEP MERGE OBJECTS
// export const deepMergeObjects = (obj1: any, obj2: any) => {
//   if (obj2 === null || obj2 === undefined) {
//     return obj1;
//   }

//   let output = { ...obj2 };

//   for (let key in obj1) {
//     if (obj1.hasOwnProperty(key)) {
//       if (
//         obj1[key] &&
//         typeof obj1[key] === 'object' &&
//         obj2[key] &&
//         typeof obj2[key] === 'object'
//       ) {
//         output[key] = deepMergeObjects(obj1[key], obj2[key]);
//       } else {
//         output[key] = obj1[key];
//       }
//     }
//   }

//   return output;
// };
import { type ClassValue, clsx } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

import { aspectRatioOptions } from '@/constants';

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Error handler
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === 'string') {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// Placeholder loader (shimmer effect for image loading)
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

// Generate URL with updated query parameters
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

// Remove specific keys from the query string
export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // Remove null or undefined values
  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key]
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

// Debounce function with improved type inference for arguments
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Get image size based on aspect ratio or fallback dimension
export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
  type: string,
  image: Record<string, unknown>,
  dimension: 'width' | 'height'
): number => {
  if (type === 'fill') {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return (image?.[dimension] as number) || 1000;
};

// Download an image from a URL
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error('Resource URL not provided! You need to provide one');
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(' ', '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
    .catch((error) => console.error({ error }));
};

// Deep merge two objects with correct typing
export const deepMergeObjects = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): T => {
  if (obj2 === null || obj2 === undefined) {
    return obj1;
  }

  const output: T = { ...obj2 };

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      if (
        typeof obj1[key] === 'object' &&
        obj1[key] !== null &&
        typeof obj2[key] === 'object' &&
        obj2[key] !== null
      ) {
        output[key] = deepMergeObjects(
          obj1[key] as Record<string, unknown>,
          obj2[key] as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};
