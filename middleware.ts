import { authMiddleware, redirectToHome, redirectToLogin } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";
import { clientConfig } from "./config/client-config";
import { serverConfig } from "./config/server-config";
import { redirect } from "next/navigation";

const PUBLIC_PATHS = ['/login'];

export async function middleware(req: NextRequest) {
    return authMiddleware(req, {
        loginPath: '/api/login',
        logoutPath: '/api/logout',
        apiKey: clientConfig.apiKey,
        cookieName: serverConfig.cookieName,
        cookieSignatureKeys: serverConfig.cookieSignatureKeys,
        cookieSerializeOptions: serverConfig.cookieSerializeOptions,
        serviceAccount: serverConfig.serviceAccount,
        handleValidToken: async({token, decodedToken}, headers) => {
            if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
                return redirect(`/${decodedToken.uid}`);
            }
            return NextResponse.next({
                request: {
                  headers
                }
            });
        },
        handleInvalidToken: async (reason) => {
            console.info('Missing or malformed credentials', {reason});
       
            return redirectToLogin(req, {
              path: '/login',
              publicPaths: PUBLIC_PATHS
            });
        },
        handleError: async (error) => {
            console.error('Unhandled authentication error', {error});
       
            return redirectToLogin(req, {
              path: '/login',
              publicPaths: PUBLIC_PATHS
            });
        }
    });
}

export const config = {
    matcher: [
      '/api/login',
      '/api/logout',
      '/',
      '/((?!_next|favicon.ico|api|.*\\.).*)'
    ]
  };