import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

    // const pathname = request.nextUrl.pathname;

    if (!request.nextUrl.pathname.startsWith('/_next') && !request.nextUrl.pathname.startsWith('/api')) { // IS PAGE!!
        //is page
    }

    else if (request.nextUrl.pathname.startsWith('/api')) { // IS API!!

    } else { // подкапотные запросы
    }
}

export const config = {
    matcher: '/:path*',
}
