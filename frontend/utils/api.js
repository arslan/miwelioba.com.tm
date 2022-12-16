import qs from 'qs';

export function getStrapiUrl(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiUrl(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }

  const data = await response.json();
  return data;
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 */
export async function getPageData({ slug, locale, preview }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiUrl('/graphql');
  const pagesRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      fragment DecorFileParts on UploadFileRelationResponseCollection {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      
      fragment ButtonLinkParts on ComponentLinkButtonLink {
        id
        newTab
        text
        type
        url
      }
      
      fragment FeatureParts on ComponentElementsFeature {
        id
        title
        description
        link {
          id
          url
          newTab
          text
        }
        media {
          ...FileParts
        }
      }
      
      query GetPages($slug: String!, $locale: I18NLocaleCode) {
        pages(filters: { slug: { eq: $slug } }, locale: $locale) {
          data {
            id
            attributes {
              type {
                id
                type
              }
              locale
              localizations {
                data {
                  id
                  attributes {
                    locale
                  }
                }
              }
              slug
              metadata {
                metaTitle
                metaDescription
                shareImage {
                  ...FileParts
                }
              }
              contentSections {
                __typename
                ... on ComponentSectionsHero {
                  id
                  title
                  label
                  description
                  media {
                  ...DecorFileParts
                  }
                  smallTextWithLink
                  buttons {
                    ...ButtonLinkParts
                  }
                  decor {
                    decorationImages {
                      ...DecorFileParts
                    }
                  }
                }
                ... on ComponentSectionsFeatureColumns {
                  id
                  columnFeatures: features {
                    id
                    title
                    media {
                      ...FileParts
                    }
                  }
                }
                ... on ComponentSectionsFeatureRow {
                  id
      anchor
                  rowFeatures: features {
                    ...FeatureParts
                  }
                  featureButton {
                    ...ButtonLinkParts
                  }
                  exclamationText
                  decor {
                    decorationImages {
                      ...DecorFileParts
                    }
                  }
                }
                ... on ComponentSectionsCta {
                  id
                  ctaFeatures: features {
                    ...FeatureParts
                  }
                  ctaButton {
                    ...ButtonLinkParts
                  }
                  decor {
                    decorationImages {
                      ...DecorFileParts
                    }
                  }

                }
                ... on ComponentSectionsContactForm {
                  id
                  title
      anchor
                  firstNameTitle
                  firstNamePlaceholder
                  lastNameTitle
                  lastNamePlaceholder
                  addressTitle
                  addressPlaceholder
                  phoneNumberTitle
                  phoneNumberPlaceholder
                  emailTitle
                  emailPlaceholder
                  messageTitle
                  messagePlaceholder
                  submitButton {
                    id
                    text
                    type
                  }
                  decor {
                    decorationImages {
                      ...DecorFileParts
                    }
                  }
                }
                ... on ComponentSectionsProductGroups {
                  id
                  title
                  subtitle
                  description
                  type
                  decor {
                    decorationImages {
                      ...DecorFileParts
                    }
                  }
      anchor
                  brands {
                    data {
                      attributes {
                        brandName
                        products {
                          data {
                            id
                            attributes {
                              title
                              media {
                                ...FileParts
                              }
                              thumbnailPicture {
                                ...FileParts
                              }
                              slug
      
                              description
                              propertiesTitle
                              properties {
                                id
                                propertyName
                                propertyValue
                              }
                              button {
                                id
                                url
                                newTab
                                text
                                type
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        locale,
        slug,
      },
    }),
  });

  const pagesData = await pagesRes.json();
  // Make sure we found something, otherwise return null
  if (pagesData.data?.pages == null || pagesData.data.pages.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.pages.data[0];
}

// Get data for product pages from Strapi

export async function getProductData({ slug, locale }) {
  const gqlEndpoint = getStrapiUrl('/graphql');
  const productRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      
      query GetProducts($slug: String!, $locale: I18NLocaleCode) {
        products(filters: { slug: { eq: $slug } }, locale: $locale) {
          data {
            attributes {
              metadata {
                metaTitle
                metaDescription
                shareImage {
                  ...FileParts
                }
              }
              title
              media {
                ...FileParts
              }
              description
              propertiesTitle
              properties {
                id
                propertyName
                propertyValue
              }
              thumbnailPicture {
                ...FileParts
              }
              slug
              brand {
                data {
                  attributes {
                    brandName
                  }
                }
              }
              button {
                id
                url
                newTab
                text
                type
              }
            }
          }
        }
      }
      `,
      variables: {
        slug,
        locale,
      },
    }),
  });
  const products = await productRes.json();
  return products.data.products.data[0];
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale) {
  const gqlEndpoint = getStrapiUrl('/graphql');
  const globalRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
              fragment FileParts on UploadFileEntityResponse {
                  data {
                      id
                      attributes {
                          alternativeText
                          width
                          height
                          mime
                          url
                          formats
                      }
                  }
              }

              fragment DecorFileParts on UploadFileRelationResponseCollection {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    mime
                    url
                    formats
                  }
                }
              }
              
              query GetGlobal($locale: I18NLocaleCode) {
                  global(locale: $locale) {
                      data {
                          id
                          attributes {
                              metadata {
                                  id
                                  metaTitle
                                  metaDescription
                                  __typename
                              }
                              metaTitleSuffix
                              navbar {
                                  logo {
                                      ...FileParts
                                  }
                                  links {
                                      id
                                      url
                                      newTab
                                      text
                                  }
                                  cta {
                                      id
                                      text
                                      type
                                      newTab
                                      url
                                  }
                              }
                              decor {
                                decorationImages {
                                  ...DecorFileParts
                                }
                              }
                              footer {
                                  logo {
                                      ...FileParts
                                  }
                                  description
                                  columns {
                                      id
                                      title
                                      description
                                  }
                                  copyrightText
                                  copyrightCompany
                                  developer {
                                      id
                                      logo {
                                          ...FileParts
                                      }
                                      text
                                      url
                                  }
                              }
                          }
                      }
                  }
              }
              `,
      variables: {
        locale,
      },
    }),
  });

  const global = await globalRes.json();
  return global.data.global.data;
}

export async function getProductThumbnails() {
  const gqlEndpoint = getStrapiUrl('/graphql');
  const res = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      
      query GetProducts {
        products {
          data {
            attributes {
              slug
              thumbnailPicture {
                ...FileParts
              }
            }
          }
        }
      }
      
      `,
    }),
  });
  const productThumbnails = await res.json();
  return productThumbnails.data.products.data;
}
