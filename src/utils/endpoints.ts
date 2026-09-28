const endpoints = {
  product: {
    list: '/products',
  },
  contactForm: {
    id: '',
    unitTag: '',
  },
  auth: {
    login: 'okhub-jwt/v1/auth/login',
    register: 'okhub-jwt/v1/auth/register',
    refreshToken: 'okhub-jwt/v1/auth/refresh',
    logout: 'okhub-jwt/v1/auth/logout',
    info: 'okhub-jwt/v1/users/me',
    googleLogin: 'okhub-jwt/v1/auth/social/login',
    requestOTP: 'okhub-jwt/v1/auth/password/otp/request',
    verifyOTP: 'okhub-jwt/v1/auth/password/otp/verify',
    resetPassword: 'okhub-jwt/v1/auth/password/otp/reset',
    registerOTP: 'okhub-jwt/v1/auth/register/verify',
    resendRegisterOTP: 'okhub-jwt/v1/auth/register/resend-otp',
    updateInfo: 'okhub-jwt/v1/users/me/profile',
    changePassword: 'okhub-jwt/v1/users/me/password',
  },
  options: {
    list: 'api/v1/options',
  },
  apartment: {
    list: 'api/v1/apartments',
  },
  style: {
    list: 'api/v1/styles',
    detail: 'styles',
  },
  implementedBuilding: {
    contactForm: {
      id: '874',
      unitTag: 'aab9f52',
    },
    list: 'wp/v2/pages/863?_fields=acf&acf_format=standard',
  },
  contact: {
    contactForm: {
      id: '1081',
      unitTag: '0250b42',
    },
  },
  project: {
    building: {
      floor: {
        detail: (projectName: string, buildingName: string) =>
          `api/v1/projects/${projectName}/buildings/${buildingName}/floors`,
      },
    },
    detail: (slug: string) => `api/v1/projects/${slug}`,
    list: 'api/v1/projects',
  },
  favorite: {
    api: 'api/v1/wishlist',
  },
  downloadApi: {
    api: 'csi/v1/quotes',
    get: 'csi/v1/quotes/data',
  },
  search: {
    searchByKey: (key: string) => `api/v1/projects/search?s=${key}`,
    getRelated: 'api/v1/page-search',
  },
}

export default endpoints
